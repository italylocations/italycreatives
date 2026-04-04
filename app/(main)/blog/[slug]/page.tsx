import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllSlugs, getPostBySlug, getAllPosts, formatDate } from '@/lib/blog'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: `${post.title} — ItalyCreatives`,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
      url: `https://italycreatives.com/blog/${post.slug}`,
      siteName: 'ItalyCreatives',
    },
  }
}

const sans: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
}
const serif: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, Cormorant Garamond, Georgia, serif)',
}
const uiText: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
  letterSpacing: '0.12em',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      style={{
        fontFamily: 'var(--font-cormorant, Cormorant Garamond, Georgia, serif)',
        fontSize: '1.5rem',
        fontWeight: 400,
        fontStyle: 'italic',
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: 'var(--text-primary)',
        lineHeight: 1.25,
      }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      style={{
        fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
        fontSize: '1.05rem',
        fontWeight: 600,
        marginTop: '1.5rem',
        marginBottom: '0.75rem',
        color: 'var(--text-primary)',
      }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      style={{
        fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
        lineHeight: 1.8,
        marginBottom: '1.5rem',
        color: 'var(--text-secondary)',
        fontSize: '0.95rem',
      }}
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong style={{ fontWeight: 600, color: '#0D0D0D' }} {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      style={{
        color: 'var(--accent-red)',
        textDecoration: 'none',
      }}
      className="hover:underline"
      {...props}
    />
  ),
}

function getRelatedPosts(currentSlug: string, tags: string[], count = 3) {
  const allPosts = getAllPosts()
  const scored = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => tags.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.post)

  if (scored.length < count) {
    const extras = allPosts
      .filter((p) => p.slug !== currentSlug && !scored.find((s) => s.slug === p.slug))
      .slice(0, count - scored.length)
    return [...scored, ...extras]
  }
  return scored
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post.slug, post.tags)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    url: `https://italycreatives.com/blog/${post.slug}`,
    author: {
      '@type': 'Organization',
      name: 'ItalyCreatives',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ItalyCreatives',
      url: 'https://italycreatives.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-16">

          {/* ── Breadcrumb ── */}
          <nav className="mb-10" aria-label="Breadcrumb">
            <ol
              style={{ ...sans, fontSize: '0.75rem', color: 'var(--text-muted)' }}
              className="flex items-center gap-2 flex-wrap"
            >
              <li>
                <Link
                  href="/"
                  style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                  className="hover:opacity-70"
                >
                  Home
                </Link>
              </li>
              <li style={{ color: 'var(--card-border)' }}>→</li>
              <li>
                <Link
                  href="/blog"
                  style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                  className="hover:opacity-70"
                >
                  Blog
                </Link>
              </li>
              <li style={{ color: 'var(--card-border)' }}>→</li>
              <li
                style={{ color: 'var(--text-secondary)' }}
                className="truncate max-w-[200px] sm:max-w-xs"
              >
                {post.title}
              </li>
            </ol>
          </nav>

          {/* ── Article header ── */}
          <header className="mb-12">
            <div
              style={{ ...sans, fontSize: '0.75rem', color: 'var(--text-muted)' }}
              className="flex flex-wrap items-center gap-4 mb-6"
            >
              {post.tags[0] && (
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-red)',
                  }}
                >
                  {post.tags[0]}
                </span>
              )}
              <span>{formatDate(post.date)}</span>
              <span>{post.readingTime} read</span>
            </div>

            <h1
              style={{
                ...serif,
                fontWeight: 300,
                lineHeight: 1.1,
                color: 'var(--text-primary)',
              }}
              className="italic text-3xl md:text-5xl mb-8"
            >
              {post.title}
            </h1>

            {/* Red hairline divider */}
            <div
              style={{
                width: '3rem',
                height: '1px',
                background: 'var(--accent-red)',
              }}
            />
          </header>

          {/* ── Article body ── */}
          <div className="w-full" style={{ maxWidth: '680px' }}>
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          {/* ── In-article CTA ── */}
          <div
            className="p-6 md:p-8"
            style={{
              border: '1px solid var(--accent-red)',
              background: '#F0EBE3',
              marginTop: '3rem',
              marginBottom: '3rem',
            }}
          >
            <p
              style={{
                ...serif,
                fontSize: '1.4rem',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--text-primary)',
                marginBottom: '1rem',
              }}
            >
              Planning a production in Italy?
            </p>
            <p
              style={{
                ...sans,
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}
            >
              Get in touch with our crew team. We respond within 24 hours with
              availability, rates and next steps.
            </p>
            <Link
              href="/contact"
              style={{
                ...uiText,
                background: 'var(--accent-red)',
                color: '#fff',
                textDecoration: 'none',
              }}
              className="block sm:inline-block w-full sm:w-auto text-center px-8 py-3 hover:opacity-80 transition-opacity"
            >
              Get in Touch
            </Link>
          </div>

        </div>

        {/* ── Related Articles ── */}
        {related.length > 0 && (
          <section
            style={{ borderTop: '1px solid var(--card-border)' }}
            className="px-4 md:px-6 py-16"
          >
            <div className="max-w-5xl mx-auto">
              <p
                style={{
                  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.3em',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                }}
                className="mb-8"
              >
                Related Articles
              </p>

              <div
                className="grid grid-cols-1 md:grid-cols-3"
                style={{ border: '1px solid var(--card-border)' }}
              >
                {related.map((rel, i) => (
                  <div
                    key={rel.slug}
                    className={`p-6 flex flex-col gap-3 border-b md:border-b-0 ${i < related.length - 1 ? 'md:border-r' : ''}`}
                    style={{ borderColor: 'var(--card-border)' }}
                  >
                    {rel.tags[0] && (
                      <span
                        style={{
                          ...sans,
                          fontSize: '0.6rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: 'var(--accent-red)',
                        }}
                      >
                        {rel.tags[0]}
                      </span>
                    )}
                    <Link
                      href={`/blog/${rel.slug}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <h3
                        style={{
                          ...serif,
                          fontSize: '1.1rem',
                          fontWeight: 400,
                          color: 'var(--text-primary)',
                          lineHeight: 1.3,
                        }}
                        className="italic hover:opacity-70 transition-opacity"
                      >
                        {rel.title}
                      </h3>
                    </Link>
                    <p
                      style={{
                        ...sans,
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {rel.readingTime} read
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
