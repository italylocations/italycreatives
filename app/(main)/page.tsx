import type { Metadata } from 'next'
import Link from 'next/link'
import { Scissors, Sparkles, Shirt, Film, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ItalyCreatives — Creative Crew Agency Rome Italy',
  description:
    'Rome-based creative crew agency representing makeup artists, hair stylists, fashion stylists and filmmakers for international editorial and fashion productions in Italy.',
}

const APPLY_URL = process.env.NEXT_PUBLIC_APPLY_URL ?? 'https://apply.italycreatives.com'

// ─── shared style tokens ────────────────────────────────────────────────────

const label: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
  color: 'var(--text-muted)',
  letterSpacing: '0.3em',
  fontSize: '0.7rem',
  textTransform: 'uppercase',
}

const heading: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, Cormorant Garamond, Georgia, serif)',
  color: 'var(--text-primary)',
}

const body: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
  color: 'var(--text-secondary)',
}

const uiText: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
  letterSpacing: '0.12em',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
}

// ─── sub-components ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={label} className="mb-6">
      {children}
    </p>
  )
}

// ─── page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div style={{ background: 'var(--bg-primary)' }}>

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section
        style={{ borderBottom: '1px solid var(--card-border)' }}
        className="min-h-screen flex flex-col items-center justify-center px-6 py-32 text-center"
      >
        <SectionLabel>Rome · Italy · Est. 2026</SectionLabel>

        <h1
          style={{ ...heading, lineHeight: 1.05 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light italic mb-8 max-w-5xl"
        >
          Creative Crew
          <br />
          for International
          <br />
          Productions.
        </h1>

        <p
          style={{ ...body, maxWidth: '36rem', lineHeight: 1.75 }}
          className="text-lg mb-12"
        >
          We represent carefully selected makeup artists, hair stylists,
          fashion stylists and filmmakers based in Rome, Italy.
          Available for editorial, advertising and fashion productions worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/contact"
            style={{
              ...uiText,
              background: 'var(--accent-red)',
              color: '#fff',
            }}
            className="px-10 py-4 transition-opacity hover:opacity-80"
          >
            Book Our Crew
          </Link>
          <a
            href={APPLY_URL}
            style={{
              ...uiText,
              border: '1px solid var(--accent-red)',
              color: 'var(--accent-red)',
            }}
            className="px-10 py-4 transition-opacity hover:opacity-60"
          >
            Join the Roster
          </a>
        </div>
      </section>

      {/* ── 2. WHAT WE DO ────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--card-border)',
        }}
        className="px-6 py-28"
      >
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Our Services</SectionLabel>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                title: 'Talent Representation',
                description:
                  'We represent a carefully curated roster of vetted professionals. Each artist meets our standards for editorial credits, English proficiency and on-set experience.',
              },
              {
                title: 'Crew Coordination',
                description:
                  'For larger productions requiring a full creative team, we manage contracts, scheduling, logistics and payments so you focus on the creative work.',
              },
              {
                title: 'Extended Network',
                description:
                  'When production scale exceeds our core roster, we source overflow crew from our vetted extended network — professionals we know and trust.',
              },
            ].map((service) => (
              <div key={service.title}>
                <div
                  style={{
                    width: '2rem',
                    height: '1px',
                    background: 'var(--accent-red)',
                    marginBottom: '1.5rem',
                  }}
                />
                <h3
                  style={{ ...heading, fontSize: '1.6rem', fontWeight: 400 }}
                  className="italic mb-4 leading-tight"
                >
                  {service.title}
                </h3>
                <p style={{ ...body, fontSize: '0.9rem', lineHeight: 1.8 }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CREW CATEGORIES ───────────────────────────────────────────── */}
      <section
        style={{ borderBottom: '1px solid var(--card-border)' }}
        className="px-6 py-28"
      >
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Our Crew</SectionLabel>

          <h2
            style={{ ...heading, fontSize: '2.8rem', fontWeight: 300 }}
            className="italic mb-16 leading-tight"
          >
            Professionals we represent.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ border: '1px solid var(--card-border)' }}
          >
            {[
              {
                icon: <Sparkles size={20} strokeWidth={1.5} color="var(--accent-red)" />,
                category: 'Makeup Artists',
                slug: 'makeup-artists',
                description:
                  'Key and assistant MUAs with published editorial credits in international magazines. Specialists in beauty, fashion and editorial.',
              },
              {
                icon: <Scissors size={20} strokeWidth={1.5} color="var(--accent-red)" />,
                category: 'Hair Stylists',
                slug: 'hair-stylists',
                description:
                  'Key hairstylists trained for editorial and advertising sets. From avant-garde fashion to clean beauty — all with verifiable magazine credits.',
              },
              {
                icon: <Shirt size={20} strokeWidth={1.5} color="var(--accent-red)" />,
                category: 'Fashion Stylists',
                slug: 'fashion-stylists',
                description:
                  'Wardrobe stylists with experience on international campaigns, fashion week and editorial shoots for luxury publications.',
              },
              {
                icon: <Film size={20} strokeWidth={1.5} color="var(--accent-red)" />,
                category: 'Filmmakers',
                slug: 'filmmakers',
                description:
                  'DOPs and directors of photography available for fashion film, advertising and branded content productions in Italy.',
              },
            ].map((item) => (
              <div
                key={item.slug}
                style={{
                  background: 'var(--bg-primary)',
                  borderRight: '1px solid var(--card-border)',
                }}
                className="p-8 flex flex-col gap-6"
              >
                {item.icon}
                <h3
                  style={{ ...heading, fontSize: '1.4rem', fontWeight: 400 }}
                  className="italic leading-tight"
                >
                  {item.category}
                </h3>
                <p style={{ ...body, fontSize: '0.85rem', lineHeight: 1.85, flex: 1 }}>
                  {item.description}
                </p>
                <Link
                  href={`/crew/${item.slug}`}
                  style={{ ...uiText, color: 'var(--accent-red)' }}
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                >
                  View Roster
                  <ArrowRight size={12} strokeWidth={1.5} color="var(--accent-red)" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHY ROME ──────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--bg-dark)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
        className="px-6 py-28"
      >
        <div className="max-w-3xl mx-auto">
          <p
            style={{ ...label, color: 'rgba(255,255,255,0.35)' }}
            className="mb-6"
          >
            Why Rome
          </p>

          <h2
            style={{
              ...heading,
              color: '#F8F5F0',
              fontSize: '2.6rem',
              fontWeight: 300,
            }}
            className="italic leading-tight mb-8"
          >
            Italy&rsquo;s most compelling
            <br />
            production city isn&rsquo;t Milan.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
              color: 'rgba(248,245,240,0.65)',
              lineHeight: 1.9,
              fontSize: '1rem',
            }}
            className="mb-6"
          >
            Rome offers international productions something Milan no longer can:
            authentic locations, lower production costs and a creative talent
            pool that is deeply skilled yet significantly less saturated. The
            city&rsquo;s architectural diversity — from ancient ruins to
            rationalist buildings to sun-baked residential streets — makes it
            one of the most versatile backdrops in the world.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
              color: 'rgba(248,245,240,0.65)',
              lineHeight: 1.9,
              fontSize: '1rem',
            }}
          >
            Every major competitor in the Italian creative crew market is
            Milan-based. ItalyCreatives is the first agency built specifically
            around Rome — connected to the{' '}
            <a
              href="https://italylocations.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}
              className="hover:opacity-80 transition-opacity"
            >
              ItalyLocations
            </a>{' '}
            scouting network and{' '}
            <a
              href="https://nreal.it"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}
              className="hover:opacity-80 transition-opacity"
            >
              NREAL
            </a>{' '}
            production services for a complete offering.
          </p>
        </div>
      </section>

      {/* ── 4b. FOUNDED BY FILMMAKERS ────────────────────────────────────── */}
      <section
        style={{ borderBottom: '1px solid var(--card-border)' }}
        className="px-6 py-28"
      >
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Founded by Filmmakers</SectionLabel>

          <h2
            style={{ ...heading, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300 }}
            className="italic leading-tight mb-8 max-w-2xl"
          >
            We know what productions need.
            <br />
            Because we&rsquo;ve been on set.
          </h2>

          <p
            style={{ ...body, lineHeight: 1.85, fontSize: '0.95rem', maxWidth: '42rem' }}
            className="mb-16"
          >
            ItalyCreatives was founded by Nicolas Vanegas Sanchez, director of photography
            and filmmaker with credits including Sony Pictures, Porsche, Ballandi Music,
            Fila and the Italian Air Force. We represent crew because we understand what
            productions actually need on set.
          </p>

          {/* Video grid — 2 columns, 3 rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                embedUrl: 'https://www.youtube.com/embed/V2fJv2omoZU',
                label: 'Sony Pictures',
                title: 'Equalizer 3 — Behind the Scenes I',
                credit: 'Cinematography — Nicolas Vanegas Sanchez',
              },
              {
                embedUrl: 'https://www.youtube.com/embed/-A73xjTUrOo',
                label: 'Sony Pictures',
                title: 'Equalizer 3 — Behind the Scenes II',
                credit: 'Cinematography — Nicolas Vanegas Sanchez',
              },
              {
                embedUrl: 'https://player.vimeo.com/video/755217732',
                label: 'Porsche — Faroe Islands',
                title: 'Porsche Backstage — Faroe Islands',
                credit: 'Cinematography — Nicolas Vanegas Sanchez',
              },
              {
                embedUrl: 'https://player.vimeo.com/video/379296367',
                label: 'Fila — Fashion Campaign',
                title: 'Fila Campaign 2020',
                credit: 'Cinematography & Editing — Nicolas Vanegas Sanchez',
              },
              {
                embedUrl: 'https://www.youtube.com/embed/ljw3QTRIwIo',
                label: 'Aeronautica Militare',
                title: 'Legacy of the Sky — Centennial Tribute',
                credit: 'Cinematography — Nicolas Vanegas Sanchez',
              },
              {
                embedUrl: 'https://www.youtube.com/embed/NCVpKDqU8wk',
                label: 'Ballandi Music',
                title: 'Aurora Blasi — French Roulette',
                credit: 'Director / DOP / Editor — Nicolas Vanegas Sanchez',
              },
            ].map((video) => (
              <div key={video.embedUrl}>
                {/* Embed container */}
                <div
                  style={{
                    border: '1px solid rgba(13,13,13,0.08)',
                    aspectRatio: '16 / 9',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    className="transition-transform duration-300 ease-in-out hover:scale-[1.02]"
                    style={{ width: '100%', height: '100%' }}
                  >
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                    />
                  </div>
                </div>

                {/* Card caption */}
                <div style={{ paddingTop: '12px' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-red)',
                      marginBottom: '4px',
                    }}
                  >
                    {video.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant, Cormorant Garamond, Georgia, serif)',
                      fontSize: '1.05rem',
                      fontStyle: 'italic',
                      color: 'var(--text-primary)',
                      marginBottom: '3px',
                    }}
                  >
                    {video.title}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {video.credit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. THE NETWORK ───────────────────────────────────────────────── */}
      <section
        style={{ borderBottom: '1px solid var(--card-border)' }}
        className="px-6 py-28"
      >
        <div className="max-w-5xl mx-auto">
          <SectionLabel>The Ecosystem</SectionLabel>

          <h2
            style={{ ...heading, fontSize: '2rem', fontWeight: 300 }}
            className="italic mb-16 leading-tight"
          >
            Part of Italy&rsquo;s complete
            <br />
            production network.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
            style={{ border: '1px solid var(--card-border)' }}
          >
            {[
              {
                name: 'NREAL',
                url: 'https://nreal.it',
                role: 'Production & Direction',
                description:
                  'Production company and DOP services for international advertising, fashion film and branded content productions in Italy.',
              },
              {
                name: 'ItalyLocations',
                url: 'https://italylocations.com',
                role: 'Location Scouting',
                description:
                  'Exclusive location finding service covering unique venues, private properties and undiscovered spaces across the entire Italian territory.',
              },
              {
                name: 'ItalyCreatives',
                url: 'https://italycreatives.com',
                role: 'Creative Crew Agency',
                description:
                  'Representation of makeup artists, hair stylists, fashion stylists and filmmakers for international productions based in Rome.',
              },
            ].map((node) => (
              <div
                key={node.name}
                style={{
                  background: 'var(--bg-primary)',
                  borderRight: '1px solid var(--card-border)',
                }}
                className="p-8"
              >
                <p style={label} className="mb-3">{node.role}</p>
                <a
                  href={node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...heading,
                    fontSize: '1.8rem',
                    fontWeight: 400,
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                  }}
                  className="italic block mb-4 hover:opacity-60 transition-opacity"
                >
                  {node.name}
                </a>
                <p style={{ ...body, fontSize: '0.85rem', lineHeight: 1.85 }}>
                  {node.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CONTACT CTA ───────────────────────────────────────────────── */}
      <section
        style={{ background: 'var(--bg-secondary)' }}
        className="px-6 py-28 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <p style={label} className="mb-6">
            Get in Touch
          </p>
          <h2
            style={{ ...heading, fontSize: '2.8rem', fontWeight: 300 }}
            className="italic leading-tight mb-8"
          >
            Looking for crew for your
            <br />
            next production in Italy?
          </h2>
          <p
            style={{ ...body, lineHeight: 1.8 }}
            className="mb-10 text-base"
          >
            Tell us about your project. We respond within 24 hours with
            crew availability, rates and next steps.
          </p>
          <Link
            href="/contact"
            style={{
              ...uiText,
              background: 'var(--accent-red)',
              color: '#fff',
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
