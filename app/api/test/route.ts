import { NextResponse } from 'next/server'
import { appendRow } from '@/lib/sheets'
import { Resend } from 'resend'

/**
 * GET /api/test
 * Diagnostic endpoint — checks env vars, Sheets connectivity, and Resend.
 * Remove or protect this route before going fully public.
 */
export async function GET() {
  const results: Record<string, unknown> = {}

  // ── 1. Env var presence (never log actual values) ──────────────────────────
  results.env = {
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM ?? '(not set — will use noreply@italycreatives.com)',
    EMAIL_NICOLAS: process.env.EMAIL_NICOLAS ?? '(not set)',
    GOOGLE_SHEET_ID: !!process.env.GOOGLE_SHEET_ID,
    GOOGLE_SERVICE_ACCOUNT_JSON: !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    TURNSTILE_SECRET_KEY: !!process.env.TURNSTILE_SECRET_KEY,
    NODE_ENV: process.env.NODE_ENV,
  }

  // ── 2. Google Sheets — write a test row ────────────────────────────────────
  try {
    await appendRow('Applications', [
      new Date().toISOString(),
      '__TEST__',
      'test',
      'test@test.com',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      0,
      'TEST',
      '',
      '',
    ])
    results.sheets = 'ok — test row written to Applications tab'
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[api/test] Sheets error:', err)
    results.sheets = `error: ${msg}`
  }

  // ── 3. Resend — send a test email to EMAIL_NICOLAS ─────────────────────────
  const resendKey = process.env.RESEND_API_KEY
  const toNicolas = process.env.EMAIL_NICOLAS ?? 'agency@italycreatives.com'
  const fromAddr = process.env.EMAIL_FROM ?? 'noreply@italycreatives.com'

  if (!resendKey) {
    results.resend = 'skipped — RESEND_API_KEY not set'
  } else {
    try {
      const client = new Resend(resendKey)
      const { error } = await client.emails.send({
        from: fromAddr,
        to: toNicolas,
        subject: '[ItalyCreatives] /api/test — Resend connectivity check',
        html: `<p>This is an automated test from <code>/api/test</code> at ${new Date().toISOString()}. If you received this, Resend is working.</p>`,
      })
      if (error) {
        console.error('[api/test] Resend error:', error)
        results.resend = `error: ${error.message}`
      } else {
        results.resend = `ok — test email sent to ${toNicolas}`
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[api/test] Resend exception:', err)
      results.resend = `exception: ${msg}`
    }
  }

  return NextResponse.json(results, { status: 200 })
}
