import { Resend } from 'resend'

const FROM = process.env.EMAIL_FROM ?? 'noreply@italycreatives.com'
const TO_NICOLAS = process.env.EMAIL_NICOLAS ?? 'nicolas@nreal.it'
const SHEET_URL = process.env.GOOGLE_SHEET_ID
  ? `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}`
  : 'https://docs.google.com/spreadsheets'

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

// ─── shared HTML helpers ──────────────────────────────────────────────────────

function htmlWrap(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>ItalyCreatives</title>
</head>
<body style="margin:0;padding:0;background:#0D0D0D;font-family:system-ui,-apple-system,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D0D;padding:48px 24px;">
  <tr><td>
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">

      <!-- Logo -->
      <tr>
        <td style="padding-bottom:40px;border-bottom:1px solid rgba(255,255,255,0.08);">
          <span style="font-family:Georgia,serif;font-size:1.1rem;font-style:italic;color:#F8F5F0;">
            <span style="color:#8B0000;">I</span>taly<span style="color:#8B0000;">C</span>reatives
          </span>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding-top:40px;">
          ${content}
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding-top:40px;border-top:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0;font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.2);">
            ItalyCreatives &nbsp;·&nbsp; Rome, Italy &nbsp;·&nbsp;
            <a href="https://italycreatives.com" style="color:rgba(255,255,255,0.2);text-decoration:none;">italycreatives.com</a>
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

function tdRow(label: string, value: string): string {
  return `
  <tr>
    <td style="padding:5px 0;vertical-align:top;width:150px;">
      <span style="font-size:0.68rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.3);">${label}</span>
    </td>
    <td style="padding:5px 0;vertical-align:top;">
      <span style="font-size:0.88rem;color:#F8F5F0;">${value || '—'}</span>
    </td>
  </tr>`
}

// ─── contact confirmation → sender ────────────────────────────────────────────

export async function sendContactConfirmation(
  to: string,
  name: string
): Promise<boolean> {
  const client = getClient()
  if (!client) {
    console.log('[resend] RESEND_API_KEY not set — contact confirmation not sent')
    return false
  }

  try {
    const html = htmlWrap(`
      <p style="margin:0 0 24px;font-size:0.68rem;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Inquiry Received</p>
      <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:1.7rem;font-style:italic;font-weight:300;color:#F8F5F0;line-height:1.15;">
        Thank you for reaching out.
      </h1>
      <p style="margin:0 0 14px;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);">Hi ${name},</p>
      <p style="margin:0 0 14px;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);">
        We have received your production brief and will respond within 24 hours
        with crew availability and next steps.
      </p>
      <p style="margin:0 0 32px;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);">
        For urgent requests, you can also reach us directly:
        <a href="mailto:info@italycreatives.com" style="color:#8B0000;text-decoration:none;">info@italycreatives.com</a>
      </p>
      <p style="margin:0;font-size:0.85rem;color:rgba(255,255,255,0.3);font-style:italic;">— ItalyCreatives</p>
    `)

    const { error } = await client.emails.send({
      from: FROM,
      to,
      subject: 'Your inquiry — ItalyCreatives',
      html,
    })

    if (error) {
      console.error('[resend] Contact confirmation error:', error.message)
      return false
    }
    return true
  } catch (err) {
    console.error('[resend] Contact confirmation exception:', err)
    return false
  }
}

// ─── contact admin brief → Nicolas ────────────────────────────────────────────

export interface ContactAdminData {
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
}

export async function sendContactAdmin(data: ContactAdminData): Promise<boolean> {
  const client = getClient()
  if (!client) {
    console.log('[resend] RESEND_API_KEY not set — contact admin not sent')
    return false
  }

  try {
    const html = htmlWrap(`
      <p style="margin:0 0 8px;font-size:0.68rem;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.3);">New Production Inquiry</p>
      <h1 style="margin:0 0 28px;font-family:Georgia,serif;font-size:1.5rem;font-style:italic;font-weight:300;color:#F8F5F0;line-height:1.15;">
        ${data.companyName}
      </h1>
      <table cellpadding="0" cellspacing="0" style="width:100%;">
        ${tdRow('Contact', data.contactName)}
        ${tdRow('Email', `<a href="mailto:${data.email}" style="color:#8B0000;text-decoration:none;">${data.email}</a>`)}
        ${tdRow('Phone', data.phone ?? '—')}
        ${tdRow('Project type', data.projectType)}
        ${tdRow('Crew needed', data.crewNeeded.join(', '))}
        ${tdRow('People', data.numberOfPeople)}
        ${tdRow('Dates', data.shootingDates)}
        ${tdRow('Location', data.locationItaly)}
        ${tdRow('Budget / day', data.budgetRange ?? '—')}
        ${tdRow('Referral', data.referral ?? '—')}
      </table>
      ${data.notes ? `
      <div style="margin-top:20px;padding:14px;border:1px solid rgba(255,255,255,0.08);">
        <p style="margin:0 0 6px;font-size:0.68rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Notes</p>
        <p style="margin:0;font-size:0.88rem;line-height:1.75;color:rgba(248,245,240,0.6);">${data.notes}</p>
      </div>` : ''}
      <div style="margin-top:28px;">
        <a href="mailto:${data.email}" style="display:inline-block;background:#8B0000;color:#fff;text-decoration:none;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;padding:11px 24px;">
          Reply to ${data.contactName}
        </a>
      </div>
    `)

    const { error } = await client.emails.send({
      from: FROM,
      to: TO_NICOLAS,
      subject: `New production inquiry — ${data.companyName} — ${data.projectType}`,
      html,
    })

    if (error) {
      console.error('[resend] Contact admin error:', error.message)
      return false
    }
    return true
  } catch (err) {
    console.error('[resend] Contact admin exception:', err)
    return false
  }
}

// ─── application confirmation → applicant ─────────────────────────────────────

export async function sendApplicationConfirmation(
  to: string,
  name: string
): Promise<boolean> {
  const client = getClient()
  if (!client) {
    console.log('[resend] RESEND_API_KEY not set — application confirmation not sent')
    return false
  }

  try {
    const html = htmlWrap(`
      <p style="margin:0 0 24px;font-size:0.68rem;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Application Received</p>
      <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:1.7rem;font-style:italic;font-weight:300;color:#F8F5F0;line-height:1.15;">
        Thank you for applying.
      </h1>
      <p style="margin:0 0 14px;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);">Hi ${name},</p>
      <p style="margin:0 0 14px;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);">
        Your application has been received and will be reviewed personally.
      </p>
      <p style="margin:0 0 14px;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);">
        We carefully evaluate every submission. If your profile meets our standards,
        you will hear from us within 5 business days.
      </p>
      <p style="margin:0 0 32px;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);">
        We look forward to reviewing your work.
      </p>
      <p style="margin:0;font-size:0.85rem;color:rgba(255,255,255,0.3);font-style:italic;">— ItalyCreatives<br/>Rome, Italy<br/>italycreatives.com</p>
    `)

    const { error } = await client.emails.send({
      from: FROM,
      to,
      subject: 'Application received — ItalyCreatives',
      html,
    })

    if (error) {
      console.error('[resend] Apply confirmation error:', error.message)
      return false
    }
    return true
  } catch (err) {
    console.error('[resend] Apply confirmation exception:', err)
    return false
  }
}

// ─── priority alert → Nicolas (Tier A only) ───────────────────────────────────

export interface ApplicationAlertData {
  fullName: string
  specialization: string
  romeBasedOption: string
  portfolioUrl: string
  englishLevel: string
  editorialsLast12Months: string
  credit1: { magazine: string; issue: string; link: string }
  credit2: { magazine: string; issue: string; link: string }
  credit3: { magazine: string; issue: string; link: string }
  englishSelfDescription: string
}

export async function sendApplicationAlertNicolas(
  data: ApplicationAlertData,
  score: number,
  tier: string
): Promise<boolean> {
  if (tier !== 'A') return false

  const client = getClient()
  if (!client) {
    console.log('[resend] RESEND_API_KEY not set — priority alert not sent')
    return false
  }

  try {
    const creditLine = (
      c: { magazine: string; issue: string; link: string },
      n: number
    ): string => {
      if (!c.magazine) return ''
      const linkPart = c.link
        ? ` — <a href="${c.link}" style="color:#8B0000;text-decoration:none;">${c.link}</a>`
        : ''
      return `<p style="margin:0 0 6px;font-size:0.88rem;color:#F8F5F0;">${n}. ${c.magazine}${c.issue ? ' · ' + c.issue : ''}${linkPart}</p>`
    }

    const html = htmlWrap(`
      <p style="margin:0 0 6px;font-size:0.68rem;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.3);">⭐ Priority Application — Tier A</p>
      <h1 style="margin:0 0 28px;font-family:Georgia,serif;font-size:1.5rem;font-style:italic;font-weight:300;color:#F8F5F0;line-height:1.15;">
        ${data.fullName}
      </h1>
      <table cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:28px;">
        ${tdRow('Specialization', data.specialization)}
        ${tdRow('Score', `<strong style="color:#8B0000;">${score}/100</strong>`)}
        ${tdRow('Rome-based', data.romeBasedOption)}
        ${tdRow('Portfolio', `<a href="${data.portfolioUrl}" style="color:#8B0000;text-decoration:none;">${data.portfolioUrl}</a>`)}
        ${tdRow('English', data.englishLevel)}
        ${tdRow('Editorials (12m)', data.editorialsLast12Months)}
      </table>

      <p style="margin:0 0 10px;font-size:0.68rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Top Credits</p>
      ${creditLine(data.credit1, 1)}
      ${creditLine(data.credit2, 2)}
      ${creditLine(data.credit3, 3)}

      <div style="margin-top:20px;padding:14px;border-left:2px solid #8B0000;">
        <p style="margin:0 0 6px;font-size:0.68rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Their words</p>
        <p style="margin:0;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);font-style:italic;">
          &ldquo;${data.englishSelfDescription}&rdquo;
        </p>
      </div>

      <div style="margin-top:28px;">
        <a href="${SHEET_URL}" style="display:inline-block;background:#8B0000;color:#fff;text-decoration:none;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;padding:11px 24px;">
          Open Google Sheet
        </a>
      </div>
    `)

    const { error } = await client.emails.send({
      from: FROM,
      to: TO_NICOLAS,
      subject: `⭐ Priority application — ${data.fullName} (${data.specialization}) — Score: ${score}/100`,
      html,
    })

    if (error) {
      console.error('[resend] Priority alert error:', error.message)
      return false
    }
    return true
  } catch (err) {
    console.error('[resend] Priority alert exception:', err)
    return false
  }
}
