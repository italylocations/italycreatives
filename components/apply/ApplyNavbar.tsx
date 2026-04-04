import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://italycreatives.com'

const sans: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
}

export default function ApplyNavbar() {
  return (
    <nav
      style={{
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--card-border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="max-w-2xl mx-auto px-6 flex items-center justify-between"
        style={{ height: '60px' }}
      >
        {/* Back to main site */}
        <a
          href={APP_URL}
          style={{
            ...sans,
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
          className="hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={13} strokeWidth={1.5} color="var(--text-muted)" />
          italycreatives.com
        </a>

        {/* Logo — centred */}
        <Link
          href="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          className="hover:opacity-70 transition-opacity"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="ItalyCreatives" style={{ height: '28px', width: 'auto' }} className="h-7 w-auto" />
        </Link>

        {/* Spacer to balance the back link */}
        <div style={{ width: '120px' }} />
      </div>
    </nav>
  )
}
