import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog — ItalyCreatives',
  description:
    'Insights, guides and resources for international productions shooting in Italy. Creative crew, locations, fashion shoots and more.',
}

const sans: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
}
const serif: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, Cormorant Garamond, Georgia, serif)',
}
const label: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
  color: 'var(--text-muted)',
  letterSpacing: '0.3em',
  fontSize: '0.7rem',
  textTransform: 'uppercase',
}
const uiText: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
  letterSpacing: '0.12em',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Blog — ItalyCreatives',
  description:
    'Insights, guides and resources for international productions shooting in Italy.',
  url: 'https://italycreatives.com/blog',
  publisher: {
    '@type': 'Organization',
    name: 'ItalyCreatives',
    url: 'https://italycreatives.com',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: 'var(--bg-primary)' }}>
        {/* ── Header ── */}
        <section
          style={{ borderBottom: '1px solid var(--card-border)' }}
          className="px-6 py-24 text-center"
        >
          <p style={label} className="mb-6">The Blog</p>
          <h1
            style={{ ...serif, fontWeight: 300, lineHeight: 1.1 }}
            className="italic text-4xl md:text-6xl"
          >
            Insights for international
            <br />
            productions in Italy.
          </h1>
        </section>

        {/* ── Article grid ── */}
        <section className="px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ border: '1px solid var(--card-border)' }}
            >
              {posts.map((post, i) => (
                <article
                  key={post.slug}
                  style={{
                    borderRight: i % 2 === 0 ? '1px solid var(--card-border)' : 'none',
                    borderBottom: '1px solid var(--card-border)',
                  }}
                  className="p-8 flex flex-col gap-4"
                >
                  {/* Date + Tag */}
                  <div className="flex items-center gap-4">
                    <span
                      style={{
                        ...sans,
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {formatDate(post.date)}
                    </span>
                    {post.tags[0] && (
                      <span
                        style={{
                          ...sans,
                          fontSize: '0.65rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: 'var(--accent-red)',
                        }}
                      >
                        {post.tags[0]}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <h2
                      style={{
                        ...serif,
                        fontSize: '1.25rem',
                        fontWeight: 400,
                        color: 'var(--text-primary)',
                        lineHeight: 1.3,
                      }}
                      className="italic hover:opacity-70 transition-opacity"
                    >
                      {post.title}
                    </h2>
                  </Link>

                  {/* Excerpt */}
                  <p
                    style={{
                      ...sans,
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Reading time + Read more */}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span
                      style={{
                        ...sans,
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {post.readingTime} read
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      style={{
                        ...sans,
                        fontSize: '0.72rem',
                        color: 'var(--accent-red)',
                        textDecoration: 'none',
                      }}
                      className="hover:opacity-70 transition-opacity"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--card-border)',
          }}
          className="px-6 py-20 text-center"
        >
          <div className="max-w-xl mx-auto">
            <p
              style={{
                ...sans,
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: '2rem',
              }}
            >
              Looking for crew for your production in Italy?
            </p>
            <Link
              href="/contact"
              style={{
                ...uiText,
                background: 'var(--accent-red)',
                color: '#fff',
              }}
              className="inline-block px-10 py-4 transition-opacity hover:opacity-80"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
