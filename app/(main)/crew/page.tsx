import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Creative Crew Rome Italy — ItalyCreatives',
  description:
    'Makeup artists, hair stylists, fashion stylists and filmmakers based in Rome, Italy. ItalyCreatives represents vetted creative professionals for international editorial and fashion productions.',
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

const categories = [
  {
    slug: 'makeup-artists',
    title: 'Makeup Artists',
    h2kw: 'Makeup Artists — Rome Italy',
    body: [
      'Our represented makeup artists hold verified editorial credits in international publications including Vogue, Harper\'s Bazaar, Dazed, Another Magazine and Italian titles across fashion, beauty and lifestyle. Every artist in this category has demonstrated the ability to work at a high editorial standard — skin preparation, colour work and set-pace professionalism included.',
      'For international productions shooting in Rome, sourcing a key makeup artist through an agency that has already verified credits and assessed on-set experience removes one of the most common pre-production uncertainties. You receive a portfolio, verified credits and rate information before committing.',
      'Our MUAs are experienced with both editorial and advertising briefs — from clean beauty campaigns for luxury skincare brands to high-fashion editorial for international magazines. All represented artists communicate in English and are familiar with the tempo and visual language of international productions.',
    ],
    keywords: 'Makeup artist agency Italy · key makeup artist Rome · HMU agency Italy international production · beauty crew production Italy',
  },
  {
    slug: 'hair-stylists',
    title: 'Hair Stylists',
    h2kw: 'Hair Stylists — Rome Italy',
    body: [
      'Represented hair stylists at ItalyCreatives have worked on editorial shoots for national and international fashion publications and hold verifiable credits that we check personally. Key hair stylists in our roster have experience in avant-garde fashion editorial, clean commercial beauty and everything between.',
      'Hair styling for international productions requires not just technical skill but on-set efficiency — the ability to work quickly, communicate clearly with a creative director who may not speak Italian, and adapt to brief changes without disrupting production flow. These are the standards we assess at the representation stage.',
      'ItalyCreatives connects international productions with hair stylists based in Rome who understand both the Italian aesthetic tradition and the international visual standards expected by luxury brands, fashion magazines and advertising agencies.',
    ],
    keywords: 'Hair stylist agency Italy editorial · key hair stylist Rome · hair stylist agency Italy fashion · travel ready hair stylist Italy',
  },
  {
    slug: 'fashion-stylists',
    title: 'Fashion Stylists',
    h2kw: 'Fashion Stylists — Rome Italy',
    body: [
      'Fashion stylists in our represented roster have worked on campaigns for luxury fashion brands, editorials for international publications and fashion week productions. Wardrobe sourcing in Rome — from designer showrooms to vintage archives — is a specialist skill that our represented stylists bring to every project.',
      'For international advertising campaigns and editorial shoots requiring a fashion stylist in Italy, our represented professionals understand the pull logistics, brand guideline compliance and on-set coordination that luxury and fashion productions require.',
      'From editorial briefs with complete creative freedom to commercial campaigns with strict brand alignment requirements, our fashion stylists have demonstrated they can execute at both ends of the spectrum — always to international production standards.',
    ],
    keywords: 'Fashion stylist agency Rome · fashion stylist agency Italy · wardrobe stylist Rome editorial · creative stylist Italy international production',
  },
  {
    slug: 'filmmakers',
    title: 'Filmmakers',
    h2kw: 'Filmmakers & DOPs — Rome Italy',
    body: [
      'Directors of photography and filmmakers in our roster bring experience from advertising, fashion film and branded content productions. Working in Italy as an international production requires a DOP who understands local lighting conditions, location dynamics and the coordination required to work alongside Italian production teams.',
      'Our represented filmmakers have credits across fashion film, documentary and commercial production. They work with both digital and analogue formats and are experienced in the specific visual requirements of luxury brand content — where every frame must hold up to the standards of the brands commissioning the work.',
      'For productions arriving in Italy that need an additional DOP or a local filmmaker who can integrate seamlessly with an international crew, ItalyCreatives provides access to cinematographers who combine Italian visual culture with international production fluency.',
    ],
    keywords: 'Filmmaker agency Italy · DOP agency Rome · director of photography Italy editorial · fashion film crew Rome',
  },
]

export default function CrewPage() {
  return (
    <div style={{ background: 'var(--bg-primary)' }}>

      {/* Header */}
      <section
        style={{ borderBottom: '1px solid var(--card-border)' }}
        className="px-6 py-28"
      >
        <div className="max-w-3xl mx-auto">
          <p style={lbl} className="mb-6">Our Crew</p>
          <h1
            style={{ ...serif, fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--text-primary)' }}
            className="italic leading-tight mb-8"
          >
            Rome&rsquo;s finest creative
            <br />
            professionals, represented.
          </h1>
          <p style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem', maxWidth: '38rem' }}>
            We represent carefully vetted makeup artists, hair stylists, fashion stylists and
            filmmakers based in Rome, Italy. Every artist holds verified editorial credits.
            Every artist communicates in English. Roster profiles coming soon.
          </p>
        </div>
      </section>

      {/* Categories */}
      {categories.map((cat, i) => (
        <section
          key={cat.slug}
          id={cat.slug}
          style={{
            borderBottom: '1px solid var(--card-border)',
            background: i % 2 === 1 ? 'var(--bg-secondary)' : 'var(--bg-primary)',
          }}
          className="px-6 py-20"
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left */}
            <div className="md:col-span-4">
              <div
                style={{ width: '2rem', height: '1px', background: 'var(--accent-red)', marginBottom: '1.5rem' }}
              />
              <h2
                style={{ ...serif, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 400, color: 'var(--text-primary)' }}
                className="italic leading-tight mb-6"
              >
                {cat.title}
              </h2>
              <Link
                href={`/crew/${cat.slug}`}
                style={{ ...sans, color: 'var(--accent-red)', letterSpacing: '0.12em', fontSize: '0.7rem', textTransform: 'uppercase' }}
                className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                View Roster
                <ArrowRight size={11} strokeWidth={1.5} color="var(--accent-red)" />
              </Link>
            </div>

            {/* Right */}
            <div className="md:col-span-8">
              {cat.body.map((para, j) => (
                <p
                  key={j}
                  style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}
                  className="mb-4 last:mb-0"
                >
                  {para}
                </p>
              ))}
              <p style={{ ...sans, color: 'var(--text-muted)', fontSize: '0.7rem', lineHeight: 1.6, marginTop: '1.5rem' }}>
                {cat.keywords}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="px-6 py-24 text-center" style={{ background: 'var(--bg-dark)' }}>
        <div className="max-w-xl mx-auto">
          <p style={{ ...lbl, color: 'rgba(255,255,255,0.35)' }} className="mb-6">Book Our Crew</p>
          <h2
            style={{ ...serif, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300, color: '#F8F5F0' }}
            className="italic leading-tight mb-8"
          >
            Interested in booking
            <br />
            our creative team?
          </h2>
          <p style={{ ...sans, color: 'rgba(248,245,240,0.6)', lineHeight: 1.8, fontSize: '0.95rem' }} className="mb-10">
            Tell us about your production. We respond within 24 hours.
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
            Book Our Crew
          </Link>
        </div>
      </section>

    </div>
  )
}
