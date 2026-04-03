import { google } from 'googleapis'

type CellValue = string | number | null

// ─── credential helpers ───────────────────────────────────────────────────────

function parseCredentials(): Record<string, unknown> {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not set')

  let credentials: Record<string, unknown>
  try {
    credentials = JSON.parse(raw) as Record<string, unknown>
  } catch (err) {
    console.error('[sheets] JSON.parse failed on GOOGLE_SERVICE_ACCOUNT_JSON:', err)
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON')
  }

  // Vercel stores env vars with escaped newlines — fix private_key so auth works
  if (typeof credentials.private_key === 'string') {
    credentials.private_key = (credentials.private_key as string).replace(/\\n/g, '\n')
  }

  return credentials
}

function getAuthClient(extraScopes: string[] = []) {
  return new google.auth.GoogleAuth({
    credentials: parseCredentials(),
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      ...extraScopes,
    ],
  })
}

function getSheetId(): string {
  const id = process.env.GOOGLE_SHEET_ID
  if (!id) throw new Error('GOOGLE_SHEET_ID is not set')
  return id
}

// ─── sheet definitions ────────────────────────────────────────────────────────

const SHEET_HEADERS: Record<string, string[]> = {
  Applications: [
    'Submission Date', 'Full Name', 'Specialization', 'Email', 'Phone',
    'Based In', 'Rome Based', 'Portfolio URL', 'Instagram',
    'Credit 1', 'Credit 2', 'Credit 3', 'Editorials Last 12 Months',
    'Worked Internationally', 'International Clients', 'Day Rate Min',
    'Monthly Availability', 'Partita IVA', 'Insurance', 'English Level',
    'English Self-Description', 'Challenge Response', 'Why ItalyCreatives',
    'Referral Source', 'SCORE', 'TIER', 'STATUS', 'NICOLAS NOTES',
  ],
  Roster: [
    'Name', 'Specialization', 'Profile Slug', 'Portfolio URL', 'Instagram',
    'Day Rate', 'Bio', 'Credits', 'Languages', 'Based In',
    'Profile Image URL', 'Active', 'Date Joined',
  ],
  'Extended Network': [
    'Name', 'Specialization', 'Profile Slug', 'Portfolio URL', 'Instagram',
    'Day Rate', 'Bio', 'Credits', 'Languages', 'Based In',
    'Profile Image URL', 'Active', 'Date Joined', 'Source', 'Last Contacted',
  ],
  Bookings: [
    'Date', 'Client', 'Project Type', 'Crew Assigned', 'Days Booked',
    'Total Value', 'Commission Earned', 'Status',
  ],
}

// ─── setupSheet ──────────────────────────────────────────────────────────────

const TAB_TITLES = ['Applications', 'Roster', 'Extended Network', 'Bookings']

/**
 * Set up an existing spreadsheet as the ItalyCreatives Database.
 * - Renames the first tab to "Applications" if it has a different name
 * - Adds any missing tabs
 * - Writes headers to every tab
 * - Formats row 1: bg #0D0D0D, white bold text, frozen
 */
export async function setupSheet(spreadsheetId: string, shareWithEmail?: string): Promise<void> {
  const auth = getAuthClient(
    shareWithEmail ? ['https://www.googleapis.com/auth/drive'] : []
  )
  const sheets = google.sheets({ version: 'v4', auth })

  // 1. Read existing sheet metadata
  const meta = await sheets.spreadsheets.get({ spreadsheetId })
  const existingSheets = meta.data.sheets ?? []

  // Build title→sheetId map for existing tabs
  const sheetIdByTitle: Record<string, number> = {}
  for (const s of existingSheets) {
    const title = s.properties?.title ?? ''
    const id = s.properties?.sheetId ?? 0
    sheetIdByTitle[title] = id
  }

  const batchRequests: object[] = []

  // 2. Rename first tab to "Applications" if needed
  if (!sheetIdByTitle['Applications'] && existingSheets.length > 0) {
    const firstSheet = existingSheets[0]
    const firstTitle = firstSheet.properties?.title ?? ''
    const firstId = firstSheet.properties?.sheetId ?? 0
    console.log(`[sheets] Renaming "${firstTitle}" → "Applications"`)
    batchRequests.push({
      updateSheetProperties: {
        properties: { sheetId: firstId, title: 'Applications' },
        fields: 'title',
      },
    })
    // Update local map
    delete sheetIdByTitle[firstTitle]
    sheetIdByTitle['Applications'] = firstId
  }

  // 3. Add missing tabs
  for (const title of TAB_TITLES) {
    if (!(title in sheetIdByTitle)) {
      console.log(`[sheets] Adding tab "${title}"`)
      batchRequests.push({ addSheet: { properties: { title } } })
    }
  }

  // Apply rename + addSheet requests
  if (batchRequests.length > 0) {
    const res = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: batchRequests },
    })
    // Capture sheetIds for newly added tabs
    for (const reply of res.data.replies ?? []) {
      const props = reply.addSheet?.properties
      if (props?.title && props.sheetId != null) {
        sheetIdByTitle[props.title] = props.sheetId
      }
    }
  }

  // 4. Write headers
  console.log('[sheets] Writing headers…')
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: 'RAW',
      data: TAB_TITLES.map((title) => ({
        range: `${title}!A1`,
        values: [SHEET_HEADERS[title]],
      })),
    },
  })

  // 5. Format + freeze header row
  const darkBg = { red: 13 / 255, green: 13 / 255, blue: 13 / 255 }
  const white  = { red: 1, green: 1, blue: 1 }

  console.log('[sheets] Formatting headers…')
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: TAB_TITLES.flatMap((title) => [
        {
          repeatCell: {
            range: {
              sheetId: sheetIdByTitle[title],
              startRowIndex: 0,
              endRowIndex: 1,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: darkBg,
                textFormat: { foregroundColor: white, bold: true },
              },
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat)',
          },
        },
        {
          updateSheetProperties: {
            properties: {
              sheetId: sheetIdByTitle[title],
              gridProperties: { frozenRowCount: 1 },
            },
            fields: 'gridProperties.frozenRowCount',
          },
        },
      ]),
    },
  })

  // 6. Share with personal email if provided (requires Drive scope)
  if (shareWithEmail) {
    console.log(`[sheets] Sharing with ${shareWithEmail}…`)
    const drive = google.drive({ version: 'v3', auth })
    await drive.permissions.create({
      fileId: spreadsheetId,
      requestBody: { type: 'user', role: 'writer', emailAddress: shareWithEmail },
      sendNotificationEmail: false,
    })
  }
}

// ─── appendRow ────────────────────────────────────────────────────────────────

/**
 * Append a single row to the named sheet tab.
 */
export async function appendRow(
  sheetName: string,
  values: CellValue[]
): Promise<void> {
  const spreadsheetId = getSheetId()
  const auth = getAuthClient()
  const sheets = google.sheets({ version: 'v4', auth })

  console.log(`[sheets] appendRow → sheet="${sheetName}" spreadsheetId="${spreadsheetId}" cols=${values.length}`)

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: sheetName,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] },
  })

  console.log(`[sheets] appendRow OK`)
}

// ─── readSheet ────────────────────────────────────────────────────────────────

/**
 * Read a range from the named sheet tab.
 * Returns a 2D array of strings (empty array if no data).
 */
export async function readSheet(
  sheetName: string,
  range: string
): Promise<string[][]> {
  const auth = getAuthClient()
  const sheets = google.sheets({ version: 'v4', auth })

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: getSheetId(),
    range: `${sheetName}!${range}`,
  })

  return (response.data.values as string[][] | undefined) ?? []
}
