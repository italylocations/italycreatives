import { NextResponse } from 'next/server'
import { calculateScore, classifyScore, getTierLetter } from '@/lib/scoring'
import { appendRow } from '@/lib/sheets'
import {
  sendApplicationConfirmation,
  sendApplicationAlertNicolas,
} from '@/lib/resend'

interface Credit {
  magazine: string
  issue: string
  link: string
}

interface ApplyPayload {
  fullName: string
  specialization: string
  basedIn: string
  romeBasedOption: string
  phone: string
  email: string
  portfolioUrl: string
  instagram: string
  credit1: Credit
  credit2: Credit
  credit3: Credit
  editorialsLast12Months: string
  workedInternationally: string
  internationalClients: string
  dayRateMin: string
  availabilityPerMonth: string
  partitaIva: string
  insurance: string
  englishLevel: string
  englishSelfDescription: string
  challengeResponse: string
  whyItalyCreatives: string
  referralSource: string
  referralName: string
  accuracyConfirmed: boolean
  honeypot: string
}

const required: (keyof ApplyPayload)[] = [
  'fullName',
  'specialization',
  'basedIn',
  'romeBasedOption',
  'phone',
  'email',
  'portfolioUrl',
  'editorialsLast12Months',
  'workedInternationally',
  'dayRateMin',
  'availabilityPerMonth',
  'partitaIva',
  'insurance',
  'englishLevel',
  'englishSelfDescription',
  'challengeResponse',
  'whyItalyCreatives',
  'referralSource',
]

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const p = body as ApplyPayload

  // Honeypot — silent 200 to bots
  if (p.honeypot) {
    return NextResponse.json({ ok: true })
  }

  // Required field validation
  for (const field of required) {
    const val = p[field]
    if (val === undefined || val === null || val === '') {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      )
    }
  }

  if (!p.accuracyConfirmed) {
    return NextResponse.json(
      { error: 'You must confirm the accuracy of your information' },
      { status: 400 }
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(p.email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  // ── Derive scoring fields ──────────────────────────────────────────────────

  // Portfolio site = not empty and not instagram-only
  const hasPortfolioSite =
    Boolean(p.portfolioUrl) && !p.portfolioUrl.toLowerCase().includes('instagram')

  // Count credits with a real http link
  const credits: Credit[] = [p.credit1, p.credit2, p.credit3]
  const verifiedCredits = credits.filter(
    (c) => c && c.link && c.link.startsWith('http')
  ).length

  // Normalise option values for scoring
  const romeMap: Record<string, string> = {
    Yes: 'yes',
    No: 'no',
    'Available to travel to Rome regularly': 'available',
  }
  const basedInRome = romeMap[p.romeBasedOption] ?? 'no'

  // Normalise editorials selector (form uses "1–2" with en-dash, scoring uses "1-2")
  const editorialsNorm = p.editorialsLast12Months.replace('–', '-')

  // Availability (form uses "1–5 days", scoring uses "1-5")
  const availabilityNorm = p.availabilityPerMonth
    .replace('–', '-')
    .replace(' days', '')
    .replace('+', '+')

  const hasPartitaIva = p.partitaIva === 'Yes'
  const canProvideInsurance = p.insurance === 'Yes' || p.insurance === 'Can arrange'

  const score = calculateScore({
    basedInRome,
    editorialsLast12Months: editorialsNorm,
    hasPortfolioSite,
    credits: credits.map((c) => `${c.magazine} — ${c.issue} — ${c.link}`),
    verifiedCredits,
    workedInternationally: p.workedInternationally === 'Yes',
    dayRateMin: p.dayRateMin,
    availabilityPerMonth: availabilityNorm,
    hasPartitaIva,
    canProvideInsurance,
    englishLevel: p.englishLevel.toLowerCase(),
    englishSelfDescription: p.englishSelfDescription,
    challengeResponse: p.challengeResponse,
    specialization: p.specialization,
  })

  const tier = classifyScore(score)
  const tierLetter = getTierLetter(score)

  // ── Prepare Sheets row (columns A → Z per master doc section 7) ───────────
  const creditStr = (c: Credit) =>
    [c.magazine, c.issue, c.link].filter(Boolean).join(' — ')

  const row: (string | number | null)[] = [
    new Date().toISOString(),             // A: Submission Date
    p.fullName,                           // B: Full Name
    p.specialization,                     // C: Specialization
    p.email,                              // D: Email
    p.phone,                              // E: Phone
    p.basedIn,                            // F: Based In
    p.romeBasedOption,                    // G: Rome Based?
    p.portfolioUrl,                       // H: Portfolio URL
    p.instagram || '',                    // I: Instagram
    creditStr(p.credit1),                 // J: Credit 1
    creditStr(p.credit2),                 // K: Credit 2
    creditStr(p.credit3),                 // L: Credit 3
    p.editorialsLast12Months,             // M: Editorials Last 12 Months
    p.workedInternationally,              // N: Worked Internationally?
    p.internationalClients || '',         // O: International Clients
    p.dayRateMin,                         // P: Day Rate Min
    p.availabilityPerMonth,               // Q: Monthly Availability
    p.partitaIva,                         // R: Partita IVA
    p.insurance,                          // S: Insurance
    p.englishLevel,                       // T: English Level
    p.englishSelfDescription,             // U: English Self-Description
    p.challengeResponse,                  // V: Challenge Response
    p.whyItalyCreatives,                  // W: Why ItalyCreatives
    p.referralSource + (p.referralName ? ` — ${p.referralName}` : ''), // X: Referral
    score,                                // Y: SCORE
    tier,                                 // Z: TIER
    '',                                   // AA: STATUS (Nicolas fills)
    '',                                   // AB: NICOLAS NOTES (Nicolas fills)
  ]

  // ── Persist to Google Sheets ───────────────────────────────────────────────
  try {
    await appendRow('Applications', row)
  } catch (err) {
    // Log but don't fail the request — Sheets may not be configured yet
    console.error('[apply] Google Sheets error:', err)
    console.log('[apply] Row data (not saved):', row)
  }

  console.log(`[apply] New application — ${p.fullName} (${p.specialization}) — Score: ${score}/100 — ${tier}`)

  // Send confirmation to applicant — always
  try {
    await sendApplicationConfirmation(p.email, p.fullName)
  } catch (err) {
    console.error('[apply] Confirmation email failed:', err)
  }

  // Send priority alert to Nicolas — Tier A only (score >= 80)
  if (tierLetter === 'A') {
    try {
      await sendApplicationAlertNicolas(
        {
          fullName: p.fullName,
          specialization: p.specialization,
          romeBasedOption: p.romeBasedOption,
          portfolioUrl: p.portfolioUrl,
          englishLevel: p.englishLevel,
          editorialsLast12Months: p.editorialsLast12Months,
          credit1: p.credit1,
          credit2: p.credit2,
          credit3: p.credit3,
          englishSelfDescription: p.englishSelfDescription,
        },
        score,
        tierLetter
      )
    } catch (err) {
      console.error('[apply] Alert email failed:', err)
    }
  }

  return NextResponse.json({ ok: true, tier: tierLetter, score })
}
