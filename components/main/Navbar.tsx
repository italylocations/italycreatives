'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const APPLY_URL = process.env.NEXT_PUBLIC_APPLY_URL ?? 'https://apply.italycreatives.com'

const sans: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
}
const serif: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, Cormorant Garamond, Georgia, serif)',
}

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const solid = !isHome || scrolled

  const navStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: solid ? 'var(--bg-primary)' : 'transparent',
    borderBottom: solid ? '1px solid var(--card-border)' : '1px solid transparent',
    transition: 'background 0.25s ease, border-color 0.25s ease',
  }

  return (
    <nav style={navStyle}>
      <div
        className="max-w-6xl mx-auto px-6 flex items-center justify-between"
        style={{ height: '64px' }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ ...serif, textDecoration: 'none', fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--text-primary)' }}
          className="hover:opacity-70 transition-opacity"
        >
          <span style={{ color: 'var(--accent-red)' }}>I</span>taly
          <span style={{ color: 'var(--accent-red)' }}>C</span>reatives
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                ...sans,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: pathname === l.href ? 'var(--accent-red)' : 'var(--text-secondary)',
                textDecoration: 'none',
              }}
              className="hover:opacity-60 transition-opacity"
            >
              {l.label}
            </Link>
          ))}

          <a
            href={APPLY_URL}
            style={{
              ...sans,
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              textDecoration: 'none',
            }}
            className="hover:opacity-70 transition-opacity"
          >
            Join Roster
          </a>

          <Link
            href="/contact"
            style={{
              ...sans,
              background: 'var(--accent-red)',
              color: '#fff',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '0.55rem 1.3rem',
              textDecoration: 'none',
            }}
            className="hover:opacity-80 transition-opacity"
          >
            Book Crew
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
        >
          {open
            ? <X size={22} strokeWidth={1.5} color="var(--text-primary)" />
            : <Menu size={22} strokeWidth={1.5} color="var(--text-primary)" />
          }
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: 'var(--bg-primary)',
            borderTop: '1px solid var(--card-border)',
            borderBottom: '1px solid var(--card-border)',
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  ...sans,
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: pathname === l.href ? 'var(--accent-red)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={APPLY_URL}
              style={{
                ...sans,
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                textDecoration: 'none',
              }}
            >
              Join Roster
            </a>
            <Link
              href="/contact"
              style={{
                ...sans,
                background: 'var(--accent-red)',
                color: '#fff',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0.7rem 1.4rem',
                textDecoration: 'none',
                display: 'inline-block',
                alignSelf: 'flex-start',
              }}
            >
              Book Crew
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
