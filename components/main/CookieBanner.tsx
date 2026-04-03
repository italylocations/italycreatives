'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true)
      }
    } catch {
      // localStorage unavailable
    }
  }, [])

  function respond(accepted: boolean) {
    try {
      localStorage.setItem(STORAGE_KEY, accepted ? 'accepted' : 'declined')
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: '#1A1A1A',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '1rem',
        animation: 'slideUp 0.3s ease',
      }}
    >
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

      <p
        style={{
          flex: 1,
          minWidth: '200px',
          fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
          fontSize: '0.8rem',
          color: 'rgba(248,245,240,0.6)',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        We use cookies to improve your experience. By continuing, you agree to our{' '}
        <Link
          href="/privacy-policy"
          style={{ color: 'var(--accent-gold, #C4A882)', textDecoration: 'none' }}
        >
          Privacy Policy
        </Link>
        .
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
        <button
          onClick={() => respond(false)}
          style={{
            fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
            fontSize: '0.68rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(248,245,240,0.45)',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
          }}
        >
          Decline
        </button>
        <button
          onClick={() => respond(true)}
          style={{
            fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
            fontSize: '0.68rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            background: '#8B0000',
            border: 'none',
            color: '#fff',
            padding: '0.5rem 1.25rem',
            cursor: 'pointer',
          }}
        >
          Accept
        </button>
      </div>
    </div>
  )
}
