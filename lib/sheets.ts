import { google } from 'googleapis'

type CellValue = string | number | null

function getAuthClient() {
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

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

function getSheetId(): string {
  const id = process.env.GOOGLE_SHEET_ID
  if (!id) throw new Error('GOOGLE_SHEET_ID is not set')
  return id
}

/**
 * Append a single row to the named sheet tab.
 * Values are written starting from column A.
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
    range: `${sheetName}!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] },
  })

  console.log(`[sheets] appendRow OK`)
}

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
