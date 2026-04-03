'use client'

import { MessageCircle } from 'lucide-react'

const WA = process.env.NEXT_PUBLIC_WHATSAPP

export default function WhatsAppButton() {
  if (!WA) return null

  const href = `https://wa.me/${WA.replace(/\D/g, '')}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '1.75rem',
        right: '1.75rem',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        background: '#25D366',
        boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
        textDecoration: 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'scale(1.08)'
        el.style.boxShadow = '0 6px 22px rgba(0,0,0,0.25)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'scale(1)'
        el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)'
      }}
    >
      <MessageCircle size={24} strokeWidth={1.5} color="#fff" />
    </a>
  )
}
