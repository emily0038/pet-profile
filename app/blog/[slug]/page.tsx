import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts, extractTableOfContents } from '@/lib/mdx'
import { mdxComponents } from '@/components/mdx-components'

interface BlogPostProps {
  params: {
    slug: string
  }
}

export default function BlogPost({ params }: BlogPostProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const tableOfContents = extractTableOfContents(post.content)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Pets Friendz Logo"
            width={50}
            height={50}
          />
          <span className="hidden sm:block text-2xl text-black font-bold font-slab">Pets Friendz</span>
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/blog" className="text-lg text-black hover:text-gray-600 transition-colors">
            Blog
          </Link>
          <Link href="/login" className="text-lg text-black hover:text-gray-600 transition-colors">
            Login
          </Link>
          <Link
            href="/waitlist"
            className="bg-black text-white px-6 py-2.5 rounded text-base flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            Build your page
            <span className="text-lg">→</span>
          </Link>
        </div>
      </header>

      {/* Blog Post Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Sidebar - Metadata */}
          <aside className="lg:col-span-3 lg:sticky lg:top-8 lg:self-start">
            <div className="space-y-6">
              {/* Category */}
              <div>
                <span className="inline-block px-3 py-1 bg-[#9185FF] text-white text-sm font-bold rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-black font-slab leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-gray-600 font-flex leading-relaxed">
                {post.excerpt}
              </p>

              {/* Metadata */}
              <div className="space-y-3 text-sm text-gray-500 font-flex">
                <div>
                  <span className="font-medium text-gray-700">By {post.author}</span>
                </div>
                <div>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                <div>{post.readTime}</div>
              </div>

              {/* Table of Contents */}
              {tableOfContents.length > 0 && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-bold text-black mb-3 font-slab">Table of Contents</h3>
                  <nav className="space-y-2 text-sm font-flex">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.slug}
                        href={`#${item.slug}`}
                        className={`block text-gray-600 hover:text-[#9185FF] transition-colors ${
                          item.level === 3 ? 'pl-4' : ''
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </aside>

          {/* Right Column - Content */}
          <article className="lg:col-span-9">
            {/* Hero Image */}
            <div className="aspect-video relative mb-12 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={post.heroImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Article Body */}
            <div
              className="prose prose-lg max-w-none font-flex"
              style={{
                fontSize: '20px',
                lineHeight: '2',
                color: '#374151'
              }}
            >
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            {/* CTA Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-black mb-3 font-slab">
                  Ready to grow your pet sitting business?
                </h3>
                <p className="text-gray-600 mb-6 font-flex">
                  Join our waitlist to create your professional profile in minutes.
                </p>
                <Link
                  href="/waitlist"
                  className="inline-block bg-[#9185FF] hover:bg-[#5B4FC6] text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-none"
                >
                  Join the Waitlist
                </Link>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  )
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
