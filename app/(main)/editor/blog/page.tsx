'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AppHeader from '@/components/appHeader'
import { getMyBlogPosts, deleteBlogPost } from '@/app/actions/blog'
import { BlogPost } from '@/lib/templates/types'
import { getProfileSubPath } from '@/utils/url'
import { createClient } from '@/utils/supabase/client'

export default function BlogListPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [domain, setDomain] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('domain')
          .eq('user_id', user.id)
          .single()
        if (profile?.domain) setDomain(profile.domain)
      }

      const result = await getMyBlogPosts()
      if ('error' in result) {
        setError(result.error)
      } else {
        setPosts(result.posts)
      }
      setLoading(false)
    }

    load()
  }, [])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    const result = await deleteBlogPost(id)
    if (result.success) {
      setPosts((prev) => prev.filter((p) => p.id !== id))
    } else {
      setError(result.error || 'Failed to delete post')
    }
    setDeletingId(null)
    setConfirmDeleteId(null)
  }

  return (
    <>
      <AppHeader />
      <div className="min-h-screen bg-[#f8fafc] px-5 py-10">
        <div className="max-w-[800px] mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-[#0f172a] text-[32px] font-semibold mb-2">Blog</h1>
              <p className="text-[#64748b] text-[15px]">Write posts to boost your page&apos;s visibility and keep clients updated</p>
            </div>
            <button
              onClick={() => router.push('/editor/blog/new')}
              className="px-5 py-3 rounded-lg text-[15px] font-medium text-white transition-all"
              style={{ background: '#9185FF' }}
            >
              New Post
            </button>
          </div>

          {error && (
            <div className="text-[#ef4444] text-sm p-3 rounded-lg mb-5 bg-[#fef2f2] border border-[#fecaca]">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-10 text-center text-[#64748b]">Loading...</div>
            ) : posts.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-[#64748b] text-[15px] mb-4">You haven&apos;t written any posts yet.</p>

                <button
                  onClick={() => router.push('/editor/blog/new')}
                  className="px-5 py-2.5 rounded-lg text-[14px] font-medium text-white"
                  style={{ background: '#9185FF' }}
                >
                  Write your first post
                </button>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="px-6 py-5 border-b border-[#e2e8f0] last:border-b-0 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#1e293b] text-[16px] font-medium truncate">{post.title}</span>
                      <span
                        className="px-2 py-0.5 text-[11px] font-medium rounded-full flex-shrink-0"
                        style={
                          post.published
                            ? { background: '#dcfce7', color: '#15803d' }
                            : { background: '#f1f5f9', color: '#64748b' }
                        }
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div className="text-[#94a3b8] text-[13px]">
                      Updated {new Date(post.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {post.published && domain && (
                      <a
                        href={getProfileSubPath(domain, `/blog/${post.slug}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#7c3aed] text-[14px] font-medium hover:underline"
                      >
                        View
                      </a>
                    )}
                    <Link
                      href={`/editor/blog/${post.id}`}
                      className="text-[#374151] text-[14px] font-medium hover:underline"
                    >
                      Edit
                    </Link>
                    {confirmDeleteId === post.id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                          className="text-[#ef4444] text-[14px] font-medium"
                        >
                          {deletingId === post.id ? 'Deleting...' : 'Confirm'}
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="text-[#94a3b8] text-[14px]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(post.id)}
                        className="text-[#ef4444] text-[14px] font-medium hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
