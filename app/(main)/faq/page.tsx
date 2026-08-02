import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers to the most common questions about booking creative crew in Italy with ItalyCreatives — coverage, process, pricing, insurance and more.',
  alternates: { canonical: 'https://italycreatives.com/faq' },
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

const faqs = [
  {
    number: '01',
    q: 'Where are you based and what areas of Italy do you cover?',
    a: 'We are based in Rome. From Rome, we can reach Tuscany, Naples, Umbria, Abruzzo and the most iconic locations of central and southern Italy in under two hours. For productions further afield — Sicily, Sardinia, the North — we coordinate travel and logistics through our extended network of professionals across the country.',
  },
  {
    number: '02',
    q: 'How quickly can you put a crew together?',
    a: 'Once we receive your brief, we send a detailed proposal with artist suggestions and portfolios within 48 hours. Our network is made up of professionals who are genuinely passionate about this work — people who are reliable, responsive and ready. For productions in Rome specifically, we can often move faster.',
  },
  {
    number: '03',
    q: 'Do your crew members speak English?',
    a: 'Yes. Working in English on set is standard for us — we work with international productions regularly and our team is comfortable with it. If a specific artist we propose has conversational rather than fluent English, we will always flag that clearly before you confirm the booking. No surprises on set.',
  },
  {
    number: '04',
    q: 'What types of productions do you work with?',
    a: 'Fashion and editorial are at the heart of what we love. We also work on advertising campaigns, commercial productions, branded content, fashion films, international events and destination weddings. If it involves creative crew and a vision worth executing, we want to be part of it.',
  },
  {
    number: '05',
    q: 'How does the booking process work?',
    a: 'You contact us with your brief — dates, location, crew needs, production type. We come back within 48 hours with a detailed proposal including artist profiles and portfolios. Once you confirm, we handle everything: contracts, scheduling, on-set coordination and follow-up. You focus on the creative. We handle the crew.',
  },
  {
    number: '06',
    q: 'Can you handle last-minute or same-day requests?',
    a: 'For productions in Rome, same-day requests are sometimes possible — our network is largest and most responsive here. For productions outside Rome that require travel, same-day is difficult to guarantee. Last-minute requests (24–48 hours) we handle regularly. The earlier you contact us, the more options we can offer.',
  },
  {
    number: '07',
    q: 'Are your professionals insured?',
    a: 'All our represented professionals hold a Partita IVA (Italian VAT registration) and personal professional insurance. That said, standard practice in Italy — as in most international markets — is for the production itself to carry a comprehensive policy covering all crew on set. We are happy to provide documentation of our artists’ individual insurance upon request.',
  },
  {
    number: '08',
    q: 'How does your pricing work?',
    a: 'No commissions, no hidden fees. We work with transparent pricing — you receive a clear proposal with the artist’s day rate included. Every artist sets their own rate based on their experience and specialisation. What you see in the proposal is what you pay. No surprises.',
  },
  {
    number: '09',
    q: 'Can we see portfolios before confirming a booking?',
    a: 'Always. Every proposal we send includes portfolio samples and verified editorial credits for each artist suggested. We want you to feel confident in your choice before anything is confirmed.',
  },
  {
    number: '10',
    q: 'Do you also provide photographers and drone operators?',
    a: 'Yes. Our roster includes photographers specialising in events, congresses, behind-the-scenes, EPK, backstage and film set photography. Our drone operators are fully licensed, insured and experienced in obtaining flight permits. One important note on drones: Italy has extensive no-fly zones, particularly around historic sites and urban centres. Permit timelines vary. We always assess locations in advance and will be upfront if aerial work is not feasible for your specific shoot location or timeline.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
}

export default function FaqPage() {
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
          className="px-6 py-28"
        >
          <div className="max-w-3xl mx-auto">
            <p style={lbl} className="mb-6">FAQ</p>
            <h1
              style={{ ...serif, fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--text-primary)' }}
              className="italic leading-tight mb-8"
            >
              Frequently asked
              <br />
              questions.
            </h1>
            <p
              style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}
            >
              Everything worth knowing before you book creative crew in Italy —
              coverage, process, pricing, insurance and the little practical
              details that make a shoot day run well.
            </p>
          </div>
        </section>

        {/* FAQ list */}
        {faqs.map((f) => (
          <section
            key={f.number}
            style={{ borderBottom: '1px solid var(--card-border)' }}
            className="px-6 py-16"
          >
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-3">
                <p style={{ ...sans, color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  {f.number}
                </p>
              </div>
              <div className="md:col-span-9">
                <h2
                  style={{ ...serif, fontSize: 'clamp(1.35rem, 2.4vw, 1.7rem)', fontWeight: 400, color: 'var(--text-primary)' }}
                  className="italic leading-snug mb-5"
                >
                  {f.q}
                </h2>
                <p style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}>
                  {f.a}
                </p>
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
              Still curious
            </p>
            <h2
              style={{ ...serif, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 300, color: '#F8F5F0' }}
              className="italic leading-tight mb-6"
            >
              Still have questions?
            </h2>
            <p
              style={{ ...sans, color: 'rgba(248,245,240,0.6)', lineHeight: 1.8, fontSize: '0.95rem' }}
              className="mb-10"
            >
              Get in touch — we respond within 24 hours.
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
