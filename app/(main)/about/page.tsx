import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — ItalyCreatives',
  description:
    'ItalyCreatives is Rome\'s only creative crew agency for international editorial and fashion productions. Founded to fill a real gap in the Italian production market.',
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

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--bg-primary)' }}>

      {/* Header */}
      <section
        style={{ borderBottom: '1px solid var(--card-border)' }}
        className="px-6 py-28"
      >
        <div className="max-w-3xl mx-auto">
          <p style={lbl} className="mb-6">About</p>
          <h1
            style={{ ...serif, fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--text-primary)' }}
            className="italic leading-tight"
          >
            About ItalyCreatives
          </h1>
        </div>
      </section>

      {/* Who we are */}
      <section
        style={{ borderBottom: '1px solid var(--card-border)' }}
        className="px-6 py-20"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p style={lbl} className="mb-4">Who We Are</p>
            <div style={{ width: '2rem', height: '1px', background: 'var(--accent-red)' }} />
          </div>
          <div className="md:col-span-8 space-y-5">
            <p style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              ItalyCreatives was founded to fill a real gap: international productions arriving
              in Italy had no single, reliable point of contact for vetted creative crew in Rome.
              We are that contact.
            </p>
            <p style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              We represent makeup artists, hair stylists, fashion stylists and filmmakers who
              meet a defined professional standard — published editorial credits, fluent English,
              direct experience on international productions, and the professionalism that high-end
              clients expect. Not everyone who applies is represented. That is the point.
            </p>
            <p style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              Our model is built on representation, not on volume. We work with a focused roster
              of professionals we stand behind personally, and we coordinate full creative teams
              for productions that need more than one specialist.
            </p>
          </div>
        </div>
      </section>

      {/* Why Rome */}
      <section
        style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--card-border)' }}
        className="px-6 py-20"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p style={lbl} className="mb-4">Why Rome</p>
            <div style={{ width: '2rem', height: '1px', background: 'var(--accent-red)' }} />
          </div>
          <div className="md:col-span-8 space-y-5">
            <p style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              Rome is one of the world&rsquo;s great production cities. Cinecittà gave it a
              century-long tradition of professional filmmaking. Its streets, palaces, ruins and
              residential neighbourhoods give productions a visual range that no studio set can
              replicate. Architectural diversity from ancient to baroque to rationalist to
              contemporary — all within city limits.
            </p>
            <p style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              Compared to Milan, Rome offers lower production costs, less crew saturation, more
              authentic locations and a creative talent pool that is highly skilled but
              underexposed to international commissions. For international brands and publishers
              arriving in Italy, this means better value and more differentiated imagery.
            </p>
            <p style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              Every major Italian competitor in the creative crew market — Etoile Management,
              W-M, BLEND, Julian Watson Milan — is Milan-based. ItalyCreatives is the first
              agency built specifically around Rome. That is both an opportunity and a commitment.
            </p>
          </div>
        </div>
      </section>

      {/* Our standards */}
      <section
        style={{ borderBottom: '1px solid var(--card-border)' }}
        className="px-6 py-20"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p style={lbl} className="mb-4">Our Standards</p>
            <div style={{ width: '2rem', height: '1px', background: 'var(--accent-red)' }} />
          </div>
          <div className="md:col-span-8 space-y-5">
            <p style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              Representation at ItalyCreatives is earned, not given. Every application is
              reviewed personally. We verify editorial credits against the publications listed.
              We assess English level directly. We interview every candidate before making a
              representation decision.
            </p>
            <p style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              The minimum requirement for representation is five published editorial credits in
              verifiable international or national publications. Credits are checked. Portfolio
              quality is assessed against the standards of the international productions we
              serve. Rate expectations are reviewed for market alignment.
            </p>
            <p style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              Active roster status is reviewed annually. Professionals who are no longer
              available, no longer meeting production standards, or who have not worked in
              twelve months are transitioned to our extended network or removed entirely.
              A small roster maintained to a high standard serves our clients better than a
              large one maintained to none.
            </p>
          </div>
        </div>
      </section>

      {/* The ecosystem */}
      <section
        style={{ background: 'var(--bg-dark)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        className="px-6 py-20"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p style={{ ...lbl, color: 'rgba(255,255,255,0.35)' }} className="mb-4">
              The Ecosystem
            </p>
            <div style={{ width: '2rem', height: '1px', background: 'var(--accent-gold)' }} />
          </div>
          <div className="md:col-span-8 space-y-5">
            <p style={{ ...sans, color: 'rgba(248,245,240,0.65)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              ItalyCreatives is the third pillar of a complete offering for international
              productions shooting in Italy. Together with{' '}
              <a
                href="https://nreal.it"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}
                className="hover:opacity-80 transition-opacity"
              >
                NREAL
              </a>{' '}
              (production and direction services) and{' '}
              <a
                href="https://italylocations.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}
                className="hover:opacity-80 transition-opacity"
              >
                ItalyLocations
              </a>{' '}
              (location scouting across Italy), we cover every major production need from a
              single network.
            </p>
            <p style={{ ...sans, color: 'rgba(248,245,240,0.65)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              A production company arriving in Italy can contact one person and receive:
              location scouting across the entire country, creative crew coordination
              in Rome, and production direction if required. One network. One standard.
              One point of contact.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px mt-8"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {[
                { name: 'NREAL', url: 'https://nreal.it', desc: 'Production · Direction' },
                { name: 'ItalyLocations', url: 'https://italylocations.com', desc: 'Location Scouting' },
                { name: 'ItalyCreatives', url: 'https://italycreatives.com', desc: 'Creative Crew' },
              ].map((node) => (
                <a
                  key={node.name}
                  href={node.url}
                  target={node.name === 'ItalyCreatives' ? undefined : '_blank'}
                  rel={node.name === 'ItalyCreatives' ? undefined : 'noopener noreferrer'}
                  style={{ borderRight: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}
                  className="p-6 block hover:opacity-70 transition-opacity"
                >
                  <p style={{ ...lbl, color: 'rgba(255,255,255,0.3)' }} className="mb-2">{node.desc}</p>
                  <p style={{ ...serif, color: '#F8F5F0', fontSize: '1.2rem', fontWeight: 400 }} className="italic">
                    {node.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-xl mx-auto">
          <p style={lbl} className="mb-6">Work With Us</p>
          <h2
            style={{ ...serif, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 300, color: 'var(--text-primary)' }}
            className="italic leading-tight mb-8"
          >
            Looking for crew for your
            <br />
            next Italian production?
          </h2>
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
