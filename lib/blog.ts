import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  metaDescription: string
  tags: string[]
  readingTime: string
  content: string
}

function parsePost(filename: string): BlogPost {
  const filePath = path.join(BLOG_DIR, filename)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug: data.slug as string,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    metaDescription: data.metaDescription as string,
    tags: (data.tags as string[]) ?? [],
    readingTime: data.readingTime as string,
    content,
  }
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))
  const posts = files.map((f) => parsePost(f))
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))
  for (const file of files) {
    const post = parsePost(file)
    if (post.slug === slug) return post
  }
  return null
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug)
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}
