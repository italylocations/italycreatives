import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const APPLY_URL = process.env.NEXT_PUBLIC_APPLY_URL ?? 'https://apply.italycreatives.com'
const YEAR = new Date().getFullYear()

const serif: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, Cormorant Garamond, Georgia, serif)',
}
const sans: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
}
const lbl: React.CSSProperties = {
  ...sans,
  color: 'rgba(255,255,255,0.25)',
  fontSize: '0.65rem',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  marginBottom: '1rem',
  display: 'block',
}
const footerLink: React.CSSProperties = {
  ...sans,
  color: 'rgba(248,245,240,0.5)',
  textDecoration: 'none',
  fontSize: '0.85rem',
  display: 'block',
  lineHeight: 1,
  marginBottom: '0.75rem',
  transition: 'color 0.15s',
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-dark)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 pb-16"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              style={{ ...serif, fontSize: '1.1rem', fontStyle: 'italic', color: '#F8F5F0', textDecoration: 'none', display: 'block', marginBottom: '0.75rem' }}
              className="hover:opacity-70 transition-opacity"
            >
              <span style={{ color: 'var(--accent-red)' }}>I</span>taly
              <span style={{ color: 'var(--accent-red)' }}>C</span>reatives
            </Link>
            <p style={{ ...sans, color: 'rgba(248,245,240,0.35)', fontSize: '0.82rem', lineHeight: 1.7 }}>
              Rome&rsquo;s creative crew agency
              <br />for international productions.
            </p>
          </div>

          {/* Services */}
          <div>
            <span style={lbl}>Services</span>
            {[
              { label: 'Full Crew Management', href: '/services#full-crew-management' },
              { label: 'Individual Booking', href: '/services#individual-artist-booking' },
              { label: 'Extended Network', href: '/services#extended-network' },
              { label: 'Bilingual Crew', href: '/services#bilingual-communication' },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={footerLink} className="hover:!text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Crew */}
          <div>
            <span style={lbl}>Crew</span>
            {[
              { label: 'Makeup Artists', href: '/crew#makeup-artists' },
              { label: 'Hair Stylists', href: '/crew#hair-stylists' },
              { label: 'Fashion Stylists', href: '/crew#fashion-stylists' },
              { label: 'Filmmakers', href: '/crew#filmmakers' },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={footerLink} className="hover:!text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <span style={lbl}>Company</span>
            {[
              { label: 'About', href: '/about' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contact', href: '/contact' },
              { label: 'Privacy Policy', href: '/privacy-policy' },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={footerLink} className="hover:!text-white transition-colors">
                {l.label}
              </Link>
            ))}

            {/* Apply */}
            <a
              href={APPLY_URL}
              style={{ ...footerLink, color: 'var(--accent-gold)', marginTop: '1rem' }}
              className="hover:opacity-80 transition-opacity flex items-center gap-1.5"
            >
              Join the Roster
              <ExternalLink size={11} strokeWidth={1.5} color="var(--accent-gold)" />
            </a>
          </div>
        </div>

        {/* Ecosystem */}
        <div className="mb-12 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={lbl}>The Italy Production Ecosystem</span>
          <div className="flex flex-wrap gap-8">
            {[
              { name: 'NREAL', url: 'https://nreal.it', desc: 'Production & Direction' },
              { name: 'ItalyLocations', url: 'https://italylocations.com', desc: 'Location Scouting' },
              { name: 'ItalyCreatives', url: 'https://italycreatives.com', desc: 'Creative Crew Agency', self: true },
            ].map((node) => (
              <a
                key={node.name}
                href={node.url}
                target={node.self ? undefined : '_blank'}
                rel={node.self ? undefined : 'noopener noreferrer'}
                style={{ textDecoration: 'none' }}
                className="hover:opacity-70 transition-opacity flex items-center gap-2"
              >
                <span style={{ ...serif, color: '#F8F5F0', fontSize: '0.95rem', fontStyle: 'italic' }}>
                  {node.name}
                </span>
                <span style={{ ...sans, color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem' }}>
                  {node.desc}
                </span>
                {!node.self && (
                  <ExternalLink size={11} strokeWidth={1.5} color="rgba(255,255,255,0.2)" />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p style={{ ...sans, color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
            © {YEAR} ItalyCreatives. Rome, Italy.
          </p>
          <Link
            href="/privacy-policy"
            style={{ ...sans, color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', textDecoration: 'none' }}
            className="hover:opacity-60 transition-opacity"
          >
            Privacy Policy
          </Link>
        </div>

      </div>
    </footer>
  )
}
