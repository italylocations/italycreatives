import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Apply — ItalyCreatives',
}

export default function ApplyLandingPage() {
  return (
    <main
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      <div className="max-w-2xl w-full text-center">
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
          className="text-5xl md:text-6xl font-light italic leading-tight mb-8"
        >
          We&rsquo;re building Rome&rsquo;s
          <br />
          finest creative crew roster.
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
            color: 'var(--text-secondary)',
          }}
          className="text-lg leading-relaxed max-w-lg mx-auto mb-12"
        >
          ItalyCreatives represents makeup artists, hair stylists, fashion
          stylists and filmmakers for international editorial and fashion
          productions. We are selective by design. If your work speaks for
          itself, we want to hear from you.
        </p>

        <Link
          href="/apply/apply"
          style={{
            background: 'var(--accent-red)',
            color: '#fff',
            fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
            letterSpacing: '0.1em',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
          }}
          className="inline-block px-10 py-4 transition-opacity hover:opacity-80"
        >
          Apply Now
        </Link>

        <p
          style={{
            fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
          }}
          className="mt-12"
        >
          Applications are reviewed personally by Nicolas Vanegas Sanchez.
          <br />
          We respond to every qualified application within 5 business days.
        </p>
      </div>
    </main>
  )
}
