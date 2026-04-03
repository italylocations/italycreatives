import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const APPLY_URL = process.env.NEXT_PUBLIC_APPLY_URL ?? 'https://apply.italycreatives.com'

const serif: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, Cormorant Garamond, Georgia, serif)',
}
const sans: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
}
const colLabel: React.CSSProperties = {
  ...sans,
  color: 'rgba(255,255,255,0.25)',
  fontSize: '0.62rem',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '1.1rem',
}
const fLink: React.CSSProperties = {
  ...sans,
  color: 'rgba(255,255,255,0.6)',
  textDecoration: 'none',
  fontSize: '0.85rem',
  display: 'flex',
  alignItems: 'center',
  minHeight: '44px',
  marginBottom: '0',
}

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0D0D0D',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Brand row */}
        <div
          className="mb-14 pb-14"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <Link
            href="/"
            style={{
              ...serif,
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: '#F8F5F0',
              textDecoration: 'none',
              display: 'inline-block',
              marginBottom: '0.6rem',
            }}
            className="hover:opacity-70 transition-opacity"
          >
            <span style={{ color: '#8B0000' }}>I</span>taly
            <span style={{ color: '#8B0000' }}>C</span>reatives
          </Link>
          <p
            style={{
              ...sans,
              color: 'rgba(255,255,255,0.35)',
              fontSize: '0.85rem',
              lineHeight: 1.7,
            }}
          >
            Rome&rsquo;s creative crew agency for international productions.
          </p>
        </div>

        {/* 3-column grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-14 pb-14"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Col 1 — Navigate */}
          <div>
            <span style={colLabel}>Navigate</span>
            {[
              { label: 'Services', href: '/services' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
              { label: 'Blog', href: '/blog' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={fLink}
                className="hover:!text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 2 — Join */}
          <div>
            <span style={colLabel}>Join</span>
            <a
              href={APPLY_URL}
              style={{ ...fLink, color: '#C4A882', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              className="hover:opacity-75 transition-opacity"
            >
              Apply to join our roster
              <ExternalLink size={11} strokeWidth={1.5} color="#C4A882" />
            </a>
            <Link
              href="/privacy-policy"
              style={fLink}
              className="hover:!text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Col 3 — The Network */}
          <div>
            <span style={colLabel}>The Network</span>
            {[
              { name: 'NREAL', url: 'https://nreal.it' },
              { name: 'ItalyLocations', url: 'https://italylocations.com' },
            ].map((node) => (
              <a
                key={node.name}
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...fLink,
                  color: '#C4A882',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
                className="hover:opacity-75 transition-opacity"
              >
                {node.name}
                <ExternalLink size={11} strokeWidth={1.5} color="#C4A882" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <p
          style={{
            ...sans,
            color: '#9A9590',
            fontSize: '0.72rem',
          }}
        >
          &copy; 2026 ItalyCreatives. Rome, Italy.
        </p>
        <p
          style={{
            ...sans,
            color: '#9A9590',
            fontSize: '0.68rem',
            marginTop: '4px',
          }}
        >
          P.IVA 14296561005 &mdash; Rome, Italy
        </p>

      </div>
    </footer>
  )
}
