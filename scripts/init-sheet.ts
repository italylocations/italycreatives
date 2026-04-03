/**
 * scripts/init-sheet.ts
 *
 * Creates a fresh "ItalyCreatives Database" Google Sheet with all tabs,
 * headers, and formatting defined in the master doc.
 *
 * Usage:
 *   npx tsx scripts/init-sheet.ts
 *   npx tsx scripts/init-sheet.ts user@gmail.com   ← also shares with that email
 *
 * After running, copy the printed spreadsheetId into your .env.local:
 *   GOOGLE_SHEET_ID=<printed id>
 * and redeploy on Vercel.
 */

import * as fs from 'fs'
import * as path from 'path'

// ── Load .env.local before importing lib code ─────────────────────────────────
const envFile = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envFile)) {
  const lines = fs.readFileSync(envFile, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const val = trimmed.slice(eq + 1).trim()
    if (!(key in process.env)) {
      process.env[key] = val
    }
  }
  console.log('[init-sheet] Loaded .env.local')
} else {
  console.warn('[init-sheet] .env.local not found — relying on existing env vars')
}

import { initializeSheet } from '../lib/sheets'

async function main() {
  const shareWithEmail = process.argv[2] // optional: npx tsx scripts/init-sheet.ts me@gmail.com

  console.log('[init-sheet] Creating ItalyCreatives Database spreadsheet…')

  const result = await initializeSheet(shareWithEmail)

  console.log('\n✓ Spreadsheet created successfully\n')
  console.log(`  Spreadsheet ID : ${result.spreadsheetId}`)
  console.log(`  URL            : ${result.url}`)
  console.log(`  Service account: ${result.serviceAccountEmail}`)
  if (shareWithEmail) {
    console.log(`  Shared with    : ${shareWithEmail} (editor)`)
  }
  console.log('\n  → Copy the Spreadsheet ID into your environment:')
  console.log(`     GOOGLE_SHEET_ID=${result.spreadsheetId}`)
  console.log('\n  → The sheet is owned by the service account above.')
  console.log('     Share it manually from Google Drive if you need personal access.\n')
}

main().catch((err) => {
  console.error('[init-sheet] Fatal error:', err)
  process.exit(1)
})
