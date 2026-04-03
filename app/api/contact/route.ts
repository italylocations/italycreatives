import { NextResponse } from 'next/server'

interface ContactPayload {
  companyName: string
  contactName: string
  email: string
  phone?: string
  projectType: string
  crewNeeded: string[]
  numberOfPeople: string
  shootingDates: string
  locationItaly: string
  budgetRange?: string
  notes?: string
  referral?: string
  honeypot?: string
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const payload = body as ContactPayload

  // Honeypot check — bots fill hidden fields, humans don't
  if (payload.honeypot) {
    // Return 200 to not reveal detection to bots
    return NextResponse.json({ ok: true })
  }

  // Basic required field validation
  const required: (keyof ContactPayload)[] = [
    'companyName',
    'contactName',
    'email',
    'projectType',
    'crewNeeded',
    'numberOfPeople',
    'shootingDates',
    'locationItaly',
  ]

  for (const field of required) {
    const val = payload[field]
    if (!val || (Array.isArray(val) && val.length === 0)) {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
    }
  }

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(payload.email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  // Log submission (Resend integration to be added)
  console.log('[contact] New inquiry:', {
    company: payload.companyName,
    contact: payload.contactName,
    email: payload.email,
    projectType: payload.projectType,
    crew: payload.crewNeeded,
    people: payload.numberOfPeople,
    dates: payload.shootingDates,
    location: payload.locationItaly,
    budget: payload.budgetRange,
    referral: payload.referral,
  })

  // TODO: integrate Resend
  // - Send admin email to EMAIL_NICOLAS with full brief
  // - Send auto-confirm to payload.email

  return NextResponse.json({ ok: true })
}
