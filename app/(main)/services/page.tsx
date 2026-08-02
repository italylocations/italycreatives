import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import React from 'react'

export const metadata: Metadata = {
  title: 'Creative Crew Services',
  description:
    'Rome-based creative crew agency Italy productions rely on for makeup artists, hair stylists, fashion stylists, photographers, videographers, drone operators and filmmakers. Vetted, English-speaking.',
  alternates: { canonical: 'https://italycreatives.com/services' },
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
      'When your international production lands in Italy, the last thing you want is to negotiate separately with a makeup artist, hair stylist, fashion stylist, photographer, videographer, drone operator and filmmaker. You brief us once, and we assemble and manage the entire creative team — artist selection, contracts, scheduling, insurance documentation, on-set coordination and payments handled from one place.',
      'That is what a real creative crew agency Italy production teams can rely on looks like: one contact, one invoice, one accountable point of ownership from pre-production through wrap.',
      'This is the right service when your shoot is complex — an international advertising campaign across multiple locations, a fashion production with a large HMU team, or an editorial project requiring both stills and motion.',
    ],
    highlights: [
      'One contact from brief through wrap — you never chase individual freelancers',
      'Contracts, invoicing and Partita IVA handled for you',
      'Italian and international insurance documentation ready before day one',
      'On-set coordination included, so you focus on the creative',
    ],
  },
  {
    number: '02',
    title: 'Individual Artist Booking',
    keywords: 'makeup artist agency Italy · hair stylist agency Italy editorial',
    body: [
      'Sometimes you need one exceptional artist — a key makeup for a luxury beauty campaign, a hair stylist for an editorial cover, a photographer for a lookbook, a drone operator for an aerial fashion sequence, or a filmmaker for a branded story. Tell us who you need, and we match you to the right person from our represented roster.',
      'Every artist we send has been personally vetted — editorial credits verified against the publications, English level assessed, on-set professionalism confirmed. You receive a curated shortlist that actually fits the brief, not a directory dump.',
    ],
    highlights: [
      'Curated shortlist matched to your brief',
      'Rate negotiation and booking confirmation handled for you',
      'Verified portfolios and credits shared on request',
      'Same-day availability checks',
    ],
  },
  {
    number: '03',
    title: 'Bilingual Communication',
    keywords: 'English speaking makeup artist Italy · bilingual creative crew Italy',
    body: [
      'Every artist we represent speaks fluent English. Not conversational — fluent. It is a baseline for representation, not a bonus feature. Because when your international team lands in Rome or Milan, you cannot afford to lose a shot day to on-set miscommunication.',
      'Beyond language, you get people who understand how international productions actually work: the pace, the standards, the visual references from Vogue to luxury beauty to editorial storytelling. Your director says "more Peter Lindbergh," and the team knows exactly what that means.',
    ],
    highlights: [
      'Fluent English required for every represented artist',
      'On-set direction bridged seamlessly between English and Italian',
      'Cultural fluency with international editorial and advertising standards',
      'No production days lost to translation friction',
    ],
  },
  {
    number: '04',
    title: 'Vetted Professionals Only',
    keywords: 'makeup artist agency Rome editorial · key hair stylist Italy',
    body: [
      'We represent people who live and breathe fashion and editorial — not generalists who occasionally take a beauty job between weddings and corporate shoots. The makeup artists, hair stylists, fashion stylists, photographers, videographers, drone operators and filmmakers on our roster have chosen this world as their craft, and it shows in every frame they touch.',
      'Every representation begins with a minimum of five verified published editorial credits, a portfolio review and a direct interview with our director. We check the credits against the publications themselves. We do not count followers. We count the work.',
      'The result: when you book through us, you are working with someone whose passion for fashion and editorial matches yours.',
    ],
    highlights: [
      'People who live and breathe fashion and editorial — not generalists',
      'Minimum 5 published editorials, verified against the publications',
      'Direct interview with our director before representation',
      'Annual re-evaluation to keep the roster current',
    ],
  },
  {
    number: '05',
    title: 'Insurance-Ready',
    keywords: 'professional crew insurance Italy · production crew beauty Italy',
    body: [
      'International productions have compliance requirements — professional liability insurance, Partita IVA (VAT registration), certificates of coverage — and gathering them at the last minute is where shoots stall. Every artist we represent can produce this documentation on request, or arrange coverage quickly for specific production requirements.',
      'You get the paperwork out of the way before day one so your production team can focus on the shoot, not chasing PDFs from freelancers.',
    ],
    highlights: [
      'Professional liability insurance available for every artist',
      'Documentation delivered at booking, not in the eleventh hour',
      'Compliance with international production requirements',
      'Partita IVA (VAT registration) confirmed for the entire represented roster',
    ],
  },
  {
    number: '06',
    title: 'Extended Network',
    keywords: 'fashion stylist agency Rome · creative talent agency Rome',
    body: [
      'When your production scales beyond our core represented roster — a large campaign requiring six or more creative professionals simultaneously, or a specific niche skill our represented artists do not cover — we draw from our extended vetted network.',
      'These are photographers, videographers, drone operators, filmmakers, makeup artists, hair stylists and fashion stylists we know personally and have either worked with directly or thoroughly assessed. Same standards, wider reach.',
      'You still get one contact and one accountable point of coordination — regardless of whether your crew comes from our represented roster or the extended network.',
    ],
    highlights: [
      'Overflow crew for large-scale productions',
      'Same vetting standards as our represented roster',
      'Available across major Italian cities — Rome, Milan, Florence',
      'One contact and one point of coordination, regardless of source',
    ],
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': services.map((s) => ({
    '@type': 'Service',
    name: s.title,
    description: s.body[0],
    provider: {
      '@type': 'Organization',
      name: 'ItalyCreatives',
      url: 'https://italycreatives.com',
    },
    areaServed: { '@type': 'Country', name: 'Italy' },
  })),
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          We are filmmakers and editorial enthusiasts who built the agency we always
          wished existed in Italy. ItalyCreatives represents the creative professionals
          international productions need most: makeup artists, hair stylists, fashion
          stylists, photographers, videographers, drone operators and filmmakers — all
          based in Italy, English-speaking, seriously vetted. One brief. One contact.
          The right crew on set.
        </p>
      </section>

      {/* Services */}
      {services.map((s, i) => (
        <React.Fragment key={s.number}>
          <section
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

          {/* Mid-page CTA — after service 03 */}
          {s.number === '03' && (
            <section
              style={{
                borderBottom: '1px solid var(--card-border)',
                background: 'var(--bg-primary)',
              }}
              className="px-6 py-20 text-center"
            >
              <div className="max-w-2xl mx-auto">
                <p style={lbl} className="mb-5">Ready when you are</p>
                <h2
                  style={{ ...serif, fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', fontWeight: 300, color: 'var(--text-primary)' }}
                  className="italic leading-tight mb-6"
                >
                  Have a production coming to Italy?
                </h2>
                <p
                  style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}
                  className="mb-8"
                >
                  Tell us the brief. We come back within 24 hours with the right
                  makeup artists, hair stylists, fashion stylists, photographers,
                  videographers, drone operators or filmmakers for your shoot.
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
          )}
        </React.Fragment>
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
    </>
  )
}
