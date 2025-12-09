import Link from 'next/link'
import Image from 'next/image'
import Footer from "@/components/footer";
import { getAllPosts } from '@/lib/mdx'

export default function BlogPage() {
  const blogPosts = getAllPosts()
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
          <Link href="/blog" className="text-lg text-black font-medium">
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

      {/* Blog Content */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-black mb-4 font-slab">Pets Friendz Blog</h1>
          <p className="text-xl text-gray-600 font-flex">Tips, guides, and resources for pet sitters</p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Featured Image */}
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-black mt-2 mb-3 group-hover:text-[#9185FF] transition-colors font-slab">
                  {post.title}
                </h2>
                <p className="text-gray-600 font-flex line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State if no posts */}
        {blogPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 font-flex">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
