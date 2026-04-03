import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply — ItalyCreatives',
  robots: { index: false, follow: false },
}

const serif: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, Cormorant Garamond, Georgia, serif)',
}
const sans: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
}
const lbl: React.CSSProperties = {
  ...sans,
  color: 'rgba(255,255,255,0.35)',
  letterSpacing: '0.3em',
  fontSize: '0.7rem',
  textTransform: 'uppercase',
}

export default function ApplyLandingPage() {
  return (
    <div
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
      className="flex flex-col"
    >
      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="max-w-2xl w-full">
          <p style={lbl} className="mb-8">
            Rome · Italy · Est. 2026
          </p>

          <h1
            style={{
              ...serif,
              color: '#F8F5F0',
              fontSize: 'clamp(2.6rem, 6vw, 4.4rem)',
              fontWeight: 300,
              lineHeight: 1.05,
            }}
            className="italic mb-10"
          >
            We&rsquo;re building Rome&rsquo;s
            <br />
            finest creative crew
            <br />
            roster.
          </h1>

          <p
            style={{
              ...sans,
              color: 'rgba(248,245,240,0.6)',
              lineHeight: 1.9,
              fontSize: '1rem',
              maxWidth: '36rem',
              margin: '0 auto 3rem',
            }}
          >
            ItalyCreatives represents makeup artists, hair stylists, fashion stylists
            and filmmakers for international editorial and fashion productions.
            We are selective by design. If your work speaks for itself,
            we want to hear from you.
          </p>

          {/* CTA — href="/apply" → on apply.* subdomain goes to /apply path
              which middleware rewrites to /apply/apply (the form) */}
          <a
            href="/apply"
            style={{
              ...sans,
              background: 'var(--accent-red)',
              color: '#fff',
              letterSpacing: '0.14em',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              padding: '1.1rem 3.5rem',
              display: 'inline-block',
              textDecoration: 'none',
              transition: 'opacity 0.15s',
            }}
            className="hover:opacity-80"
          >
            Apply Now
          </a>
        </div>
      </main>

      {/* Footer note */}
      <footer
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        className="px-6 py-8 text-center"
      >
        <p
          style={{
            ...sans,
            color: 'rgba(255,255,255,0.25)',
            fontSize: '0.78rem',
            lineHeight: 1.7,
          }}
        >
          Every application is reviewed personally.
          <br />
          We respond to every qualified application within 5 business days.
        </p>
      </footer>
    </div>
  )
}
