import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Application Received — ItalyCreatives',
  robots: { index: false, follow: false },
}

const serif: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, Cormorant Garamond, Georgia, serif)',
}
const sans: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://italycreatives.com'

export default function ThankYouPage() {
  return (
    <div
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
      className="flex flex-col items-center justify-center px-6 py-24"
    >
      <div className="max-w-xl w-full text-center">
        {/* Decorative line */}
        <div
          style={{
            width: '2rem',
            height: '1px',
            background: 'var(--accent-red)',
            margin: '0 auto 3rem',
          }}
        />

        <h1
          style={{
            ...serif,
            color: '#F8F5F0',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 300,
            lineHeight: 1.1,
          }}
          className="italic mb-8"
        >
          Thank you for applying.
        </h1>

        <p
          style={{
            ...sans,
            color: 'rgba(248,245,240,0.65)',
            lineHeight: 1.9,
            fontSize: '0.95rem',
            marginBottom: '1.2rem',
          }}
        >
          Your application has been received and will be reviewed personally.
          If your profile meets our standards, we will be in touch within
          15 business days.
        </p>

        <p
          style={{
            ...sans,
            color: 'rgba(248,245,240,0.65)',
            lineHeight: 1.9,
            fontSize: '0.95rem',
            marginBottom: '3rem',
          }}
        >
          We review every application carefully — quality over speed.
        </p>

        <p
          style={{
            ...sans,
            color: 'rgba(255,255,255,0.35)',
            fontSize: '0.85rem',
            fontStyle: 'italic',
            marginBottom: '3.5rem',
          }}
        >
          — The ItalyCreatives Team
        </p>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(255,255,255,0.08)',
            marginBottom: '2.5rem',
          }}
        />

        <a
          href={APP_URL}
          style={{
            ...sans,
            color: 'rgba(255,255,255,0.35)',
            fontSize: '0.72rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
          className="hover:text-white"
        >
          italycreatives.com
        </a>
      </div>
    </div>
  )
}
