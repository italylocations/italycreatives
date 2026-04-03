import { NextResponse } from 'next/server'
import { sendContactConfirmation, sendContactAdmin } from '@/lib/resend'

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

  // Honeypot — silent 200 to bots
  if (payload.honeypot) {
    return NextResponse.json({ ok: true })
  }

  // Required field validation
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
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      )
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(payload.email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  console.log('[contact] New inquiry:', payload.companyName, payload.email)

  // Send admin email — if this fails the request still succeeds
  try {
    await sendContactAdmin({
      companyName: payload.companyName,
      contactName: payload.contactName,
      email: payload.email,
      phone: payload.phone,
      projectType: payload.projectType,
      crewNeeded: payload.crewNeeded,
      numberOfPeople: payload.numberOfPeople,
      shootingDates: payload.shootingDates,
      locationItaly: payload.locationItaly,
      budgetRange: payload.budgetRange,
      notes: payload.notes,
      referral: payload.referral,
    })
  } catch (err) {
    console.error('[contact] Admin email failed:', err)
  }

  // Send confirmation to sender — independent try/catch
  try {
    await sendContactConfirmation(payload.email, payload.contactName)
  } catch (err) {
    console.error('[contact] Confirmation email failed:', err)
  }

  return NextResponse.json({ ok: true })
}
