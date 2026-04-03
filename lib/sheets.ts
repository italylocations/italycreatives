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

// ─── initializeSheet ─────────────────────────────────────────────────────────

export interface InitResult {
  spreadsheetId: string
  url: string
  serviceAccountEmail: string
}

/**
 * Create a fresh "ItalyCreatives Database" spreadsheet with all tabs,
 * headers, and dark header formatting.
 * Pass shareWithEmail to grant editor access to a personal Google account.
 */
export async function initializeSheet(shareWithEmail?: string): Promise<InitResult> {
  const credentials = parseCredentials()
  const serviceAccountEmail = (credentials.client_email as string | undefined) ?? ''

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive',
    ],
  })

  const sheets = google.sheets({ version: 'v4', auth })
  const drive = google.drive({ version: 'v3', auth })

  // 1. Create spreadsheet with all tabs in one request
  const tabTitles = ['Applications', 'Roster', 'Extended Network', 'Bookings']
  const createRes = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title: 'ItalyCreatives Database' },
      sheets: tabTitles.map((title) => ({ properties: { title } })),
    },
  })

  const spreadsheetId = createRes.data.spreadsheetId!
  const createdSheets = createRes.data.sheets ?? []

  // Build sheetId map by title
  const sheetIdByTitle: Record<string, number> = {}
  for (const s of createdSheets) {
    const title = s.properties?.title ?? ''
    const id = s.properties?.sheetId ?? 0
    sheetIdByTitle[title] = id
  }

  // 2. Write headers to every tab
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: 'RAW',
      data: tabTitles.map((title) => ({
        range: `${title}!A1`,
        values: [SHEET_HEADERS[title]],
      })),
    },
  })

  // 3. Format header row: bg #0D0D0D, white bold text
  const darkBg = { red: 13 / 255, green: 13 / 255, blue: 13 / 255 }
  const white  = { red: 1, green: 1, blue: 1 }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: tabTitles.map((title) => ({
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
      })),
    },
  })

  // 4. Freeze header row on every tab
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: tabTitles.map((title) => ({
        updateSheetProperties: {
          properties: {
            sheetId: sheetIdByTitle[title],
            gridProperties: { frozenRowCount: 1 },
          },
          fields: 'gridProperties.frozenRowCount',
        },
      })),
    },
  })

  // 5. Share with personal email if provided
  if (shareWithEmail) {
    await drive.permissions.create({
      fileId: spreadsheetId,
      requestBody: { type: 'user', role: 'writer', emailAddress: shareWithEmail },
      sendNotificationEmail: false,
    })
  }

  return {
    spreadsheetId,
    url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
    serviceAccountEmail,
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
