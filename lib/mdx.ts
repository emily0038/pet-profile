import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  readTime: string
  category: string
  excerpt: string
  heroImage: string
  content: string
  draft?: boolean
}

export interface TocItem {
  text: string
  slug: string
  level: number
}

// Helper function to generate slug from heading text
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Extract H2 and H3 headers from markdown content for TOC
export function extractTableOfContents(content: string): TocItem[] {
  const headingRegex = /^(#{2,3}) (.+)$/gm
  const headings: TocItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length // 2 for ##, 3 for ###
    const text = match[2]
    headings.push({
      text,
      slug: generateSlug(text),
      level,
    })
  }

  return headings
}

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(contentDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        author: data.author,
        readTime: data.readTime,
        category: data.category,
        excerpt: data.excerpt,
        heroImage: data.heroImage,
        content,
        draft: data.draft || false,
      }
    })
    .filter((post) => !post.draft) // Filter out draft posts

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      readTime: data.readTime,
      category: data.category,
      excerpt: data.excerpt,
      heroImage: data.heroImage,
      content,
      draft: data.draft || false,
    }
  } catch {
    return null
  }
}
