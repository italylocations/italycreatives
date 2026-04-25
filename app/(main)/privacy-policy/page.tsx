import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for ItalyCreatives.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://italycreatives.com/privacy-policy' },
}

const sans: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
}
const serif: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, Cormorant Garamond, Georgia, serif)',
}
const body: React.CSSProperties = {
  ...sans,
  color: 'var(--text-secondary)',
  lineHeight: 1.85,
  fontSize: '0.92rem',
}
const h2Style: React.CSSProperties = {
  ...serif,
  fontSize: '1.25rem',
  fontWeight: 300,
  fontStyle: 'italic',
  color: 'var(--text-primary)',
  marginBottom: '0.75rem',
  marginTop: '2.5rem',
}

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      <section className="px-6 py-24">
        <div className="max-w-2xl mx-auto">

          <p
            style={{
              ...sans,
              color: 'var(--text-muted)',
              letterSpacing: '0.3em',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            Legal
          </p>

          <h1
            style={{ ...serif, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--text-primary)' }}
            className="italic leading-tight mb-4"
          >
            Privacy Policy
          </h1>

          <p style={{ ...body, color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '2.5rem' }}>
            Last updated: April 2026 &nbsp;·&nbsp; ItalyCreatives — P.IVA 14296561005 — Rome, Italy
          </p>

          {/* 1 */}
          <h2 style={h2Style}>1. Who we are</h2>
          <p style={body}>
            ItalyCreatives operates the websites <strong>italycreatives.com</strong> and{' '}
            <strong>apply.italycreatives.com</strong>. We are a creative crew agency based in
            Rome, Italy. Our VAT number is P.IVA 14296561005. You can contact us at{' '}
            <a href="mailto:info@italycreatives.com" style={{ color: 'var(--accent-red)', textDecoration: 'none' }}>
              info@italycreatives.com
            </a>
            .
          </p>

          {/* 2 */}
          <h2 style={h2Style}>2. What data we collect</h2>
          <p style={body}>
            We collect personal data only when you actively submit it through our forms:
          </p>
          <ul style={{ ...body, paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Contact form</strong> — company name, contact name, email address,
              phone number (optional), project details, and budget information.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Crew application form</strong> — full name, email, phone, professional
              specialisation, location, portfolio URL, editorial credits, rate information,
              and written responses to application questions.
            </li>
          </ul>
          <p style={{ ...body, marginTop: '0.75rem' }}>
            We also collect standard server logs (IP address, browser type, pages visited)
            through our hosting infrastructure. This data is not linked to any personal
            profile and is retained for no more than 30 days.
          </p>

          {/* 3 */}
          <h2 style={h2Style}>3. How we use your data</h2>
          <p style={body}>
            Data submitted through the contact form is used solely to respond to your
            production inquiry. Application data is used to evaluate your candidacy for
            representation. We do not use your data for advertising, automated decision-making,
            or profiling.
          </p>
          <p style={{ ...body, marginTop: '0.75rem' }}>
            We store application data in Google Sheets (Google LLC, USA) under a service
            account accessible only to the agency. We send transactional emails via Resend
            (Resend Inc., USA). Both services process data under standard contractual clauses
            with the European Commission.
          </p>

          {/* 4 */}
          <h2 style={h2Style}>4. Legal basis</h2>
          <p style={body}>
            We process contact inquiry data under <strong>Article 6(1)(b) GDPR</strong> (steps
            necessary to enter into a contract at your request). We process application data
            under <strong>Article 6(1)(a) GDPR</strong> (your explicit consent given at
            submission). You may withdraw consent at any time by contacting us.
          </p>

          {/* 5 */}
          <h2 style={h2Style}>5. Retention</h2>
          <p style={body}>
            Contact inquiry data is retained for up to 12 months after the last communication.
            Application data is retained for up to 24 months from the date of submission, or
            until you request deletion. Data no longer required is permanently deleted from
            all systems.
          </p>

          {/* 6 */}
          <h2 style={h2Style}>6. Your rights</h2>
          <p style={body}>
            Under GDPR, you have the right to access, correct, or delete your personal data.
            You also have the right to restrict or object to processing, and the right to
            data portability. To exercise any of these rights, contact us at{' '}
            <a href="mailto:info@italycreatives.com" style={{ color: 'var(--accent-red)', textDecoration: 'none' }}>
              info@italycreatives.com
            </a>
            . We will respond within 30 days. You also have the right to lodge a complaint
            with the Italian data protection authority (Garante per la protezione dei dati
            personali) at <strong>www.garanteprivacy.it</strong>.
          </p>

          {/* 7 */}
          <h2 style={h2Style}>7. Cookies</h2>
          <p style={body}>
            Our website uses a single functional cookie to remember your cookie consent
            preference (stored in your browser&rsquo;s localStorage). We do not use tracking
            cookies, advertising cookies, or third-party analytics cookies without your
            explicit consent. If you accept analytics cookies, we may use Google Analytics 4
            to understand how visitors use our site. You can withdraw consent at any time by
            clearing your browser&rsquo;s localStorage for this domain.
          </p>

        </div>
      </section>
    </div>
  )
}
