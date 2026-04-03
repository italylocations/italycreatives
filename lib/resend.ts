import { Resend } from 'resend'

// Lazy init — avoids build-time crash when RESEND_API_KEY is empty
function getClient(): Resend {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')
  return new Resend(key)
}

const FROM = process.env.EMAIL_FROM ?? 'noreply@italycreatives.com'
const TO_NICOLAS = process.env.EMAIL_NICOLAS ?? 'nicolas@nreal.it'
const SHEET_URL = process.env.GOOGLE_SHEET_ID
  ? `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}`
  : 'https://docs.google.com/spreadsheets'

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

      <!-- Logo row -->
      <tr>
        <td style="padding-bottom:40px;border-bottom:1px solid rgba(255,255,255,0.08);">
          <span style="font-family:Georgia,serif;font-size:1.1rem;font-style:italic;color:#F8F5F0;letter-spacing:0.02em;">
            <span style="color:#8B0000;">I</span>taly<span style="color:#8B0000;">C</span>reatives
          </span>
        </td>
      </tr>

      <!-- Content -->
      <tr>
        <td style="padding-top:40px;">
          ${content}
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding-top:40px;border-top:1px solid rgba(255,255,255,0.08);margin-top:40px;">
          <p style="margin:0;font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.25);">
            ItalyCreatives &nbsp;·&nbsp; Rome, Italy &nbsp;·&nbsp;
            <a href="https://italycreatives.com" style="color:rgba(255,255,255,0.25);text-decoration:none;">italycreatives.com</a>
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

function row(label: string, value: string): string {
  return `
  <tr>
    <td style="padding:6px 0;vertical-align:top;width:160px;">
      <span style="font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.35);">${label}</span>
    </td>
    <td style="padding:6px 0;vertical-align:top;">
      <span style="font-size:0.9rem;color:#F8F5F0;">${value || '—'}</span>
    </td>
  </tr>`
}

// ─── contact confirmation → sender ────────────────────────────────────────────

export async function sendContactConfirmation(
  to: string,
  name: string
): Promise<void> {
  const html = htmlWrap(`
    <p style="margin:0 0 24px;font-size:0.7rem;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.35);">
      Inquiry Received
    </p>
    <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:1.8rem;font-style:italic;font-weight:300;color:#F8F5F0;line-height:1.2;">
      Thank you for reaching out.
    </h1>
    <p style="margin:0 0 16px;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);">
      Hi ${name},
    </p>
    <p style="margin:0 0 16px;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);">
      We have received your production brief and will respond within 24 hours
      with crew availability and next steps.
    </p>
    <p style="margin:0 0 32px;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);">
      For urgent requests, you can also reach us directly at
      <a href="mailto:info@italycreatives.com" style="color:#8B0000;text-decoration:none;">info@italycreatives.com</a>
    </p>
    <p style="margin:0;font-size:0.85rem;color:rgba(255,255,255,0.35);font-style:italic;">
      — ItalyCreatives
    </p>
  `)

  const { error } = await getClient().emails.send({
    from: FROM,
    to,
    subject: 'Your inquiry — ItalyCreatives',
    html,
  })

  if (error) throw new Error(`Resend error (contact confirm): ${error.message}`)
}

// ─── contact admin → Nicolas ──────────────────────────────────────────────────

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

export async function sendContactAdmin(data: ContactAdminData): Promise<void> {
  const html = htmlWrap(`
    <p style="margin:0 0 24px;font-size:0.7rem;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.35);">
      New Production Inquiry
    </p>
    <h1 style="margin:0 0 32px;font-family:Georgia,serif;font-size:1.6rem;font-style:italic;font-weight:300;color:#F8F5F0;line-height:1.2;">
      ${data.companyName}
    </h1>
    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
      ${row('Contact', data.contactName)}
      ${row('Email', `<a href="mailto:${data.email}" style="color:#8B0000;text-decoration:none;">${data.email}</a>`)}
      ${row('Phone', data.phone ?? '—')}
      ${row('Project type', data.projectType)}
      ${row('Crew needed', data.crewNeeded.join(', '))}
      ${row('People', data.numberOfPeople)}
      ${row('Dates', data.shootingDates)}
      ${row('Location', data.locationItaly)}
      ${row('Budget / day', data.budgetRange ?? '—')}
      ${row('Referral', data.referral ?? '—')}
    </table>
    ${data.notes ? `
    <div style="margin-top:24px;padding:16px;border:1px solid rgba(255,255,255,0.08);">
      <p style="margin:0 0 8px;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.35);">Additional Notes</p>
      <p style="margin:0;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);">${data.notes}</p>
    </div>` : ''}
    <div style="margin-top:32px;">
      <a href="mailto:${data.email}" style="display:inline-block;background:#8B0000;color:#fff;text-decoration:none;font-size:0.72rem;letter-spacing:0.15em;text-transform:uppercase;padding:12px 28px;">
        Reply to ${data.contactName}
      </a>
    </div>
  `)

  const { error } = await getClient().emails.send({
    from: FROM,
    to: TO_NICOLAS,
    subject: `New inquiry — ${data.companyName} (${data.projectType})`,
    html,
  })

  if (error) throw new Error(`Resend error (contact admin): ${error.message}`)
}

// ─── application confirmation → applicant ─────────────────────────────────────

export async function sendApplicationConfirmation(
  to: string,
  name: string
): Promise<void> {
  const html = htmlWrap(`
    <p style="margin:0 0 24px;font-size:0.7rem;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.35);">
      Application Received
    </p>
    <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:1.8rem;font-style:italic;font-weight:300;color:#F8F5F0;line-height:1.2;">
      Thank you for applying.
    </h1>
    <p style="margin:0 0 16px;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);">
      Hi ${name},
    </p>
    <p style="margin:0 0 16px;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);">
      Your application has been received and will be reviewed personally.
    </p>
    <p style="margin:0 0 16px;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);">
      We carefully evaluate every submission. If your profile meets our standards,
      you will hear from us within 5 business days.
    </p>
    <p style="margin:0 0 32px;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);">
      We look forward to reviewing your work.
    </p>
    <p style="margin:0;font-size:0.85rem;color:rgba(255,255,255,0.35);font-style:italic;">
      — ItalyCreatives
    </p>
  `)

  const { error } = await getClient().emails.send({
    from: FROM,
    to,
    subject: 'Application received — ItalyCreatives',
    html,
  })

  if (error) throw new Error(`Resend error (apply confirm): ${error.message}`)
}

// ─── application alert → Nicolas (Tier A only) ────────────────────────────────

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
): Promise<void> {
  if (tier !== 'A') return

  const creditLine = (
    c: { magazine: string; issue: string; link: string },
    n: number
  ) => {
    if (!c.magazine) return ''
    const linkPart = c.link
      ? ` — <a href="${c.link}" style="color:#8B0000;text-decoration:none;">${c.link}</a>`
      : ''
    return `<p style="margin:0 0 8px;font-size:0.9rem;color:#F8F5F0;">${n}. ${c.magazine}${c.issue ? ' · ' + c.issue : ''}${linkPart}</p>`
  }

  const html = htmlWrap(`
    <p style="margin:0 0 8px;font-size:0.7rem;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.35);">
      ⭐ Priority Application — Tier A
    </p>
    <h1 style="margin:0 0 32px;font-family:Georgia,serif;font-size:1.6rem;font-style:italic;font-weight:300;color:#F8F5F0;line-height:1.2;">
      ${data.fullName}
    </h1>

    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:32px;">
      ${row('Specialization', data.specialization)}
      ${row('Score', `<strong style="color:#8B0000;">${score}/100</strong>`)}
      ${row('Rome-based', data.romeBasedOption)}
      ${row('Portfolio', `<a href="${data.portfolioUrl}" style="color:#8B0000;text-decoration:none;">${data.portfolioUrl}</a>`)}
      ${row('English', data.englishLevel)}
      ${row('Editorials (12m)', data.editorialsLast12Months)}
    </table>

    <p style="margin:0 0 12px;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.35);">
      Top Credits
    </p>
    ${creditLine(data.credit1, 1)}
    ${creditLine(data.credit2, 2)}
    ${creditLine(data.credit3, 3)}

    <div style="margin-top:24px;padding:16px;border-left:2px solid #8B0000;">
      <p style="margin:0 0 8px;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.35);">Their words</p>
      <p style="margin:0;font-size:0.9rem;line-height:1.8;color:rgba(248,245,240,0.65);font-style:italic;">
        &ldquo;${data.englishSelfDescription}&rdquo;
      </p>
    </div>

    <div style="margin-top:32px;">
      <a href="${SHEET_URL}" style="display:inline-block;background:#8B0000;color:#fff;text-decoration:none;font-size:0.72rem;letter-spacing:0.15em;text-transform:uppercase;padding:12px 28px;">
        Open Google Sheet
      </a>
    </div>
  `)

  const { error } = await getClient().emails.send({
    from: FROM,
    to: TO_NICOLAS,
    subject: `⭐ Priority application — ${data.fullName} (${data.specialization}) — Score: ${score}/100`,
    html,
  })

  if (error) throw new Error(`Resend error (apply alert): ${error.message}`)
}
