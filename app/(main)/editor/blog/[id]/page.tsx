'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import * as Bytescale from '@bytescale/sdk'
import AppHeader from '@/components/appHeader'
import { createBlogPost, updateBlogPost, deleteBlogPost, getMyBlogPost } from '@/app/actions/blog'
import { getProfileSubPath } from '@/utils/url'
import { createClient } from '@/utils/supabase/client'

// Initialize Bytescale upload manager (matches the rest of the editor's
// image upload flow, see e.g. components/editor/sections/HeroSection.tsx)
const uploadManager = new Bytescale.UploadManager({
  apiKey: 'public_223k2RMDA3XCvtqA2sr4V7rKhoHU',
})

export default function BlogPostFormPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const isNew = params.id === 'new'
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [domain, setDomain] = useState<string | null>(null)
  const [loading, setLoading] = useState(!isNew)
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const [published, setPublished] = useState(false)
  const [slug, setSlug] = useState<string | null>(null)

  const [isUploadingCover, setIsUploadingCover] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

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

      if (!isNew) {
        const result = await getMyBlogPost(params.id)
        if ('error' in result) {
          setError(result.error)
        } else {
          setTitle(result.post.title)
          setExcerpt(result.post.excerpt || '')
          setContent(result.post.content)
          setCoverImageUrl(result.post.cover_image_url || '')
          setPublished(result.post.published)
          setSlug(result.post.slug)
        }
        setLoading(false)
      }
    }

    load()
  }, [isNew, params.id])

  const handleCoverFileSelect = async (file: File) => {
    setError(null)
    setIsUploadingCover(true)
    try {
      const { fileUrl } = await uploadManager.upload({ data: file })
      setCoverImageUrl(fileUrl)
    } catch {
      setError('Failed to upload cover image. Please try again.')
    }
    setIsUploadingCover(false)
  }

  const buildFormData = (publishedValue: boolean) => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('excerpt', excerpt)
    formData.append('cover_image_url', coverImageUrl)
    formData.append('published', String(publishedValue))
    return formData
  }

  const handleSave = async (publishedValue: boolean) => {
    if (!title.trim()) {
      setError('Title is required')
      return
    }

    setSaving(true)
    setError(null)
    setSuccess(false)

    const formData = buildFormData(publishedValue)

    if (isNew) {
      const result = await createBlogPost(formData)
      if (result.success && result.postId) {
        router.push(`/editor/blog/${result.postId}`)
        return
      }
      setError(result.error || 'Failed to create post')
    } else {
      const result = await updateBlogPost(params.id, formData)
      if (result.success) {
        setPublished(publishedValue)
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError(result.error || 'Failed to save post')
      }
    }

    setSaving(false)
  }

  const handleDelete = async () => {
    setDeleting(true)
    const result = await deleteBlogPost(params.id)
    if (result.success) {
      router.push('/editor/blog')
    } else {
      setError(result.error || 'Failed to delete post')
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <>
        <AppHeader />
        <div className="min-h-screen bg-[#f8fafc] px-5 py-10 text-center text-[#64748b]">Loading...</div>
      </>
    )
  }

  return (
    <>
      <AppHeader />
      <div className="min-h-screen bg-[#f8fafc] px-5 py-10">
        <div className="max-w-[800px] mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-[#0f172a] text-[32px] font-semibold mb-2">
                {isNew ? 'New Post' : 'Edit Post'}
              </h1>
              {!isNew && domain && slug && published && (
                <a
                  href={getProfileSubPath(domain, `/blog/${slug}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7c3aed] text-[14px] hover:underline"
                >
                  View live post &rarr;
                </a>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              {/* Title */}
              <div className="mb-5">
                <label htmlFor="title" className="block text-[#475569] text-sm font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 5 Tips for a Stress-Free Vet Visit"
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-[14px] py-[10px] text-[#0f172a] text-[15px] transition-all focus:outline-none focus:border-[#8b5cf6] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
                />
              </div>

              {/* Cover image */}
              <div className="mb-5">
                <label className="block text-[#475569] text-sm font-medium mb-2">
                  Cover image (optional)
                </label>
                {coverImageUrl ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[#e2e8f0] mb-2">
                    <Image src={coverImageUrl} alt="Cover" fill style={{ objectFit: 'cover' }} unoptimized />
                    <button
                      onClick={() => setCoverImageUrl('')}
                      className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingCover}
                    className="w-full border-2 border-dashed border-[#cbd5e1] rounded-lg py-8 text-center text-[#64748b] text-sm hover:border-[#8b5cf6] transition-colors"
                  >
                    {isUploadingCover ? 'Uploading...' : 'Click to upload a cover image'}
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleCoverFileSelect(file)
                  }}
                  className="hidden"
                />
              </div>

              {/* Excerpt */}
              <div className="mb-5">
                <label htmlFor="excerpt" className="block text-[#475569] text-sm font-medium mb-2">
                  Excerpt (optional)
                </label>
                <textarea
                  id="excerpt"
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Leave blank to auto-generate a summary from your post content"
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-[14px] py-[10px] text-[#0f172a] text-[14px] transition-all focus:outline-none focus:border-[#8b5cf6] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
                />
              </div>

              {/* Content */}
              <div className="mb-5">
                <label htmlFor="content" className="block text-[#475569] text-sm font-medium mb-2">
                  Content
                </label>
                <textarea
                  id="content"
                  rows={16}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={'Write your post in Markdown.\n\n## A heading\n\nSome **bold** text, a [link](https://example.com), and a list:\n\n- One\n- Two'}
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-[14px] py-[10px] text-[#0f172a] text-[14px] font-mono transition-all focus:outline-none focus:border-[#8b5cf6] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
                />
              </div>

              {/* Published toggle */}
              <label className="flex items-center gap-3 mb-5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-[#374151] text-[14px] font-medium">
                  Published (visible on your public blog)
                </span>
              </label>

              {error && (
                <div className="text-[#ef4444] text-sm p-3 rounded-lg mb-5 bg-[#fef2f2] border border-[#fecaca]">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-[#15803d] text-sm p-3 rounded-lg mb-5 bg-[#dcfce7] border border-[#86efac]">
                  Post saved successfully
                </div>
              )}

              <div className="flex items-center justify-between" style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => handleSave(published)}
                    disabled={saving}
                    className="btn-save"
                  >
                    {saving ? 'Saving...' : isNew ? 'Save Post' : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => router.push('/editor/blog')}
                    className="btn-cancel"
                  >
                    Back to Posts
                  </button>
                </div>

                {!isNew && (
                  confirmDelete ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[#64748b] text-[13px]">Delete this post?</span>
                      <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="text-[#ef4444] text-[14px] font-medium"
                      >
                        {deleting ? 'Deleting...' : 'Confirm'}
                      </button>
                      <button
                        onClick={() => setConfirmDelete(false)}
                        className="text-[#94a3b8] text-[14px]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(true)}
                      className="text-[#ef4444] text-[14px] font-medium hover:underline"
                    >
                      Delete Post
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
