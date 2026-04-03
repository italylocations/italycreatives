import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Creative Crew Services — ItalyCreatives',
  description:
    'ItalyCreatives is a creative crew agency Italy productions rely on for makeup artists, hair stylists, fashion stylists and filmmakers. Rome-based, English-speaking, vetted professionals.',
}

const serif: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, Cormorant Garamond, Georgia, serif)',
}
const sans: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
}
const lbl: React.CSSProperties = {
  ...sans,
  color: 'var(--text-muted)',
  letterSpacing: '0.3em',
  fontSize: '0.7rem',
  textTransform: 'uppercase',
}

const services = [
  {
    number: '01',
    title: 'Full Crew Management',
    keywords: 'creative crew agency Italy · HMU agency Italy international production',
    body: [
      'For productions that need a complete creative team assembled and managed, ItalyCreatives handles everything from artist selection to contracts, scheduling, logistics and payments.',
      'You brief us once. We deliver a fully coordinated crew — makeup artists, hair stylists, fashion stylists and filmmakers — ready on set, on time, within budget.',
      'This service is designed for international advertising campaigns, fashion productions and editorial projects where the creative team is large and coordination complexity is high.',
    ],
    highlights: [
      'Single point of contact for the entire creative team',
      'Contracts and invoicing handled centrally',
      'Italian and international insurance documentation provided',
      'On-set coordination included',
    ],
  },
  {
    number: '02',
    title: 'Individual Artist Booking',
    keywords: 'makeup artist agency Italy · hair stylist agency Italy editorial',
    body: [
      'Book a single artist from our represented roster for your production. Every professional we represent has been personally vetted — minimum published editorial credits verified, English level assessed, on-set professionalism confirmed.',
      'Whether you need a key makeup artist for a luxury campaign, a hair stylist for a fashion editorial or a DOP for a branded content production, we match your brief to the right artist.',
    ],
    highlights: [
      'Access to our full represented roster',
      'Rate negotiation and booking confirmation handled by us',
      'Portfolio and verified credits provided on request',
      'Same-day availability checks',
    ],
  },
  {
    number: '03',
    title: 'Extended Network',
    keywords: 'fashion stylist agency Rome · creative talent agency Rome',
    body: [
      'When production scale or specific requirements exceed our core represented roster, we draw from our extended vetted network — professionals we know personally and have either worked with or thoroughly assessed.',
      'This overflow capacity means ItalyCreatives can staff large-scale productions requiring six or more creative professionals simultaneously without compromising on standards.',
    ],
    highlights: [
      'Overflow crew for large-scale productions',
      'Same vetting standards as represented roster',
      '20–25% coordination fee on extended network bookings',
      'Available across major Italian cities',
    ],
  },
  {
    number: '04',
    title: 'Bilingual Communication',
    keywords: 'English speaking makeup artist Italy · bilingual creative crew Italy',
    body: [
      'Every artist in our represented roster communicates fluently in English. This is a baseline requirement, not a bonus feature. International productions cannot afford on-set miscommunication.',
      'We also bridge the cultural gap: our artists understand the pace, standards and visual language of international editorial and advertising productions — from Condé Nast to luxury brand campaigns.',
    ],
    highlights: [
      'English fluency required for all represented artists',
      'Conversational minimum for extended network',
      'On-set direction in both English and Italian',
      'Familiar with international production standards',
    ],
  },
  {
    number: '05',
    title: 'Vetted Professionals Only',
    keywords: 'makeup artist agency Rome editorial · key hair stylist Italy',
    body: [
      'Representation at ItalyCreatives requires a minimum of five published editorial credits in verifiable international publications, a direct interview with our director, and a portfolio review.',
      'We do not represent artists based on follower counts or self-reported experience. Every credit on every portfolio we represent has been verified against the publication. Every rate reflects genuine market experience.',
    ],
    highlights: [
      'Minimum 5 published editorials, all verified',
      'Direct interview with production director',
      'Portfolio review before representation',
      'Annual re-evaluation for active roster status',
    ],
  },
  {
    number: '06',
    title: 'Insurance-Ready',
    keywords: 'professional crew insurance Italy · production crew beauty Italy',
    body: [
      'All represented professionals can provide documentation of professional liability insurance or can arrange it quickly for production requirements. For international productions with strict compliance requirements, this removes a common friction point.',
      'We maintain records of insurance status for every represented artist and flag documentation requirements at the time of booking.',
    ],
    highlights: [
      'Professional liability insurance available',
      'Documentation provided on request at booking',
      'Compliance with international production requirements',
      'Partita IVA (VAT registration) confirmed for all represented artists',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div style={{ background: 'var(--bg-primary)' }}>

      {/* Header */}
      <section
        style={{ borderBottom: '1px solid var(--card-border)' }}
        className="px-6 py-28 max-w-5xl mx-auto"
      >
        <p style={lbl} className="mb-6">Services</p>
        <h1
          style={{ ...serif, fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--text-primary)' }}
          className="italic leading-tight mb-8 max-w-3xl"
        >
          Everything a production needs
          <br />
          from one point of contact.
        </h1>
        <p
          style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, maxWidth: '42rem' }}
          className="text-base"
        >
          ItalyCreatives is the creative crew agency Italy&rsquo;s international productions
          turn to for makeup artists, hair stylists, fashion stylists and filmmakers.
          Rome-based. English-speaking. Fully vetted. We handle the creative team so you
          focus on the production.
        </p>
      </section>

      {/* Services */}
      {services.map((s, i) => (
        <section
          key={s.number}
          style={{
            borderBottom: '1px solid var(--card-border)',
            background: i % 2 === 1 ? 'var(--bg-secondary)' : 'var(--bg-primary)',
          }}
          className="px-6 py-20"
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left col */}
            <div className="md:col-span-4">
              <p style={{ ...sans, color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }} className="mb-3">
                {s.number}
              </p>
              <h2
                style={{ ...serif, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, color: 'var(--text-primary)' }}
                className="italic leading-tight mb-4"
              >
                {s.title}
              </h2>
              <p style={{ ...sans, color: 'var(--text-muted)', fontSize: '0.7rem', lineHeight: 1.6 }}>
                {s.keywords}
              </p>
            </div>

            {/* Right col */}
            <div className="md:col-span-8">
              {s.body.map((para, j) => (
                <p
                  key={j}
                  style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}
                  className="mb-4 last:mb-0"
                >
                  {para}
                </p>
              ))}

              <ul className="mt-8 space-y-3">
                {s.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      size={16}
                      strokeWidth={1.5}
                      color="var(--accent-red)"
                      style={{ flexShrink: 0, marginTop: '0.2rem' }}
                    />
                    <span style={{ ...sans, color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section
        style={{ background: 'var(--bg-dark)' }}
        className="px-6 py-24 text-center"
      >
        <div className="max-w-xl mx-auto">
          <p style={{ ...lbl, color: 'rgba(255,255,255,0.35)' }} className="mb-6">
            Ready to book
          </p>
          <h2
            style={{ ...serif, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300, color: '#F8F5F0' }}
            className="italic leading-tight mb-8"
          >
            Tell us about your production.
          </h2>
          <p
            style={{ ...sans, color: 'rgba(248,245,240,0.6)', lineHeight: 1.8, fontSize: '0.95rem' }}
            className="mb-10"
          >
            We respond within 24 hours with crew availability,
            rates and next steps.
          </p>
          <Link
            href="/contact"
            style={{
              ...sans,
              background: 'var(--accent-red)',
              color: '#fff',
              letterSpacing: '0.12em',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
            }}
            className="inline-block px-12 py-4 transition-opacity hover:opacity-80"
          >
            Get in Touch
          </Link>
        </div>
      </section>

    </div>
  )
}
