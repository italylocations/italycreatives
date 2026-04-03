/**
 * scripts/init-sheet.ts
 *
 * Sets up an existing Google Sheet as the "ItalyCreatives Database":
 * renames the first tab to "Applications" (if needed), adds missing tabs,
 * writes headers, and formats row 1 on every tab.
 *
 * Usage:
 *   npx tsx scripts/init-sheet.ts                        ← uses GOOGLE_SHEET_ID from env
 *   npx tsx scripts/init-sheet.ts <SPREADSHEET_ID>       ← overrides env
 *   npx tsx scripts/init-sheet.ts <SPREADSHEET_ID> <email>  ← also shares with email
 *
 * Requires: Google Sheets API enabled for the service account's project.
 * Does NOT require Google Drive API.
 */

import * as fs from 'fs'
import * as path from 'path'

// ── Load .env.local before importing lib code ─────────────────────────────────

function parseVercelEnvValue(raw: string): string {
  if (!raw.startsWith('"') || !raw.endsWith('"')) return raw
  const inner = raw.slice(1, -1)
  let result = ''
  let inString = false
  let i = 0
  while (i < inner.length) {
    const c = inner[i]
    if (c === '\\') {
      if (inString) {
        result += c + (inner[i + 1] ?? '')
        i += 2
      } else {
        if (inner[i + 1] === 'n') {
          result += '\n'
          i += 2
        } else {
          result += c
          i++
        }
      }
    } else {
      if (c === '"') inString = !inString
      result += c
      i++
    }
  }
  return result
}

const envFile = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envFile)) {
  const lines = fs.readFileSync(envFile, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const val = parseVercelEnvValue(trimmed.slice(eq + 1))
    if (!(key in process.env)) {
      process.env[key] = val
    }
  }
  console.log('[init-sheet] Loaded .env.local')
} else {
  console.warn('[init-sheet] .env.local not found — relying on existing env vars')
}

import { setupSheet } from '../lib/sheets'

async function main() {
  const arg1 = process.argv[2]
  const arg2 = process.argv[3]

  // First arg is spreadsheet ID if it looks like one (not an email)
  let spreadsheetId: string | undefined
  let shareWithEmail: string | undefined

  if (arg1 && !arg1.includes('@')) {
    spreadsheetId = arg1
    shareWithEmail = arg2
  } else {
    shareWithEmail = arg1
  }

  // Fall back to env
  if (!spreadsheetId) {
    spreadsheetId = process.env.GOOGLE_SHEET_ID
  }
  if (!spreadsheetId) {
    console.error('[init-sheet] No spreadsheet ID: pass as first argument or set GOOGLE_SHEET_ID')
    process.exit(1)
  }

  console.log(`[init-sheet] Setting up spreadsheet ${spreadsheetId} …`)

  await setupSheet(spreadsheetId, shareWithEmail)

  console.log('\n✓ Spreadsheet ready\n')
  console.log(`  URL: https://docs.google.com/spreadsheets/d/${spreadsheetId}`)
  if (shareWithEmail) {
    console.log(`  Shared with: ${shareWithEmail} (editor)`)
  }
  console.log(`\n  → If not already set, add to your environment:\n     GOOGLE_SHEET_ID=${spreadsheetId}\n`)
}

main().catch((err) => {
  console.error('[init-sheet] Fatal error:', err)
  process.exit(1)
})
