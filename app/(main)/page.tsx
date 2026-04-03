import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ItalyCreatives — Creative Crew Agency Rome Italy',
  description:
    'Rome-based creative crew agency representing makeup artists, hair stylists, fashion stylists and filmmakers for international editorial and fashion productions in Italy.',
}

const APPLY_URL = process.env.NEXT_PUBLIC_APPLY_URL || 'https://apply.italycreatives.com'

export default function HomePage() {
  return (
    <main
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      <div className="max-w-3xl w-full text-center">
        <p
          style={{
            fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
            color: 'var(--text-muted)',
            letterSpacing: '0.3em',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
          }}
          className="mb-8"
        >
          Rome · Italy · Est. 2026
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-cormorant, Cormorant Garamond, Georgia, serif)',
            color: 'var(--text-primary)',
          }}
          className="text-6xl md:text-7xl lg:text-8xl font-light italic leading-tight mb-8"
        >
          Creative Crew
          <br />
          for International
          <br />
          Productions.
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
            color: 'var(--text-secondary)',
          }}
          className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-12"
        >
          We represent carefully selected makeup artists, hair stylists,
          fashion stylists and filmmakers based in Rome, Italy.
          Available for editorial, advertising and fashion productions worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            style={{
              background: 'var(--accent-red)',
              color: '#fff',
              fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
              letterSpacing: '0.1em',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
            }}
            className="px-8 py-4 transition-opacity hover:opacity-80"
          >
            Book Our Crew
          </Link>
          <a
            href={APPLY_URL}
            style={{
              border: '1px solid var(--accent-red)',
              color: 'var(--accent-red)',
              fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
              letterSpacing: '0.1em',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
            }}
            className="px-8 py-4 transition-opacity hover:opacity-70"
          >
            Join the Roster
          </a>
        </div>
      </div>
    </main>
  )
}
