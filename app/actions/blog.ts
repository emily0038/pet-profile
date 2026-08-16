'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { slugifyTitle, excerptFromContent } from '@/lib/blog'
import { BlogPost } from '@/lib/templates/types'

async function getOwnProfileId(): Promise<{ profileId: string; domain: string } | { error: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in' }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, domain')
    .eq('user_id', user.id)
    .single()

  if (!profile) {
    return { error: 'Profile not found' }
  }

  return { profileId: profile.id, domain: profile.domain }
}

/**
 * Ensures a slug is unique within a profile, appending -2, -3, etc. on
 * collision. `excludePostId` lets an update keep its own slug.
 */
async function ensureUniqueSlug(profileId: string, baseSlug: string, excludePostId?: string): Promise<string> {
  const supabase = await createClient()
  let slug = baseSlug || 'post'
  let counter = 2

  while (true) {
    let query = supabase
      .from('blog_posts')
      .select('id')
      .eq('profile_id', profileId)
      .eq('slug', slug)

    if (excludePostId) {
      query = query.neq('id', excludePostId)
    }

    const { data } = await query.maybeSingle()
    if (!data) return slug

    slug = `${baseSlug || 'post'}-${counter}`
    counter++
  }
}

/**
 * All posts (draft + published) owned by the current user, for the editor.
 */
export async function getMyBlogPosts(): Promise<{ posts: BlogPost[] } | { error: string }> {
  const owner = await getOwnProfileId()
  if ('error' in owner) return owner

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('profile_id', owner.profileId)
    .order('updated_at', { ascending: false })

  if (error) return { error: error.message }
  return { posts: data || [] }
}

/**
 * A single post owned by the current user, for the edit form.
 */
export async function getMyBlogPost(postId: string): Promise<{ post: BlogPost } | { error: string }> {
  const owner = await getOwnProfileId()
  if ('error' in owner) return owner

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', postId)
    .eq('profile_id', owner.profileId)
    .single()

  if (error || !data) return { error: 'Post not found' }
  return { post: data }
}

export async function createBlogPost(formData: FormData): Promise<{ success: boolean; postId?: string; error?: string }> {
  const owner = await getOwnProfileId()
  if ('error' in owner) return { success: false, error: owner.error }

  const title = (formData.get('title') as string)?.trim()
  const content = (formData.get('content') as string) ?? ''
  const excerptInput = (formData.get('excerpt') as string)?.trim()
  const coverImageUrl = (formData.get('cover_image_url') as string)?.trim() || null
  const published = formData.get('published') === 'true'

  if (!title) {
    return { success: false, error: 'Title is required' }
  }

  const slug = await ensureUniqueSlug(owner.profileId, slugifyTitle(title))
  const excerpt = excerptInput || excerptFromContent(content) || null

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      profile_id: owner.profileId,
      title,
      slug,
      excerpt,
      content,
      cover_image_url: coverImageUrl,
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .select('id')
    .single()

  if (error) return { success: false, error: error.message }

  revalidatePath('/editor/blog')
  revalidatePath(`/${owner.domain}/blog`)

  return { success: true, postId: data.id }
}

export async function updateBlogPost(postId: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  const owner = await getOwnProfileId()
  if ('error' in owner) return { success: false, error: owner.error }

  const title = (formData.get('title') as string)?.trim()
  const content = (formData.get('content') as string) ?? ''
  const excerptInput = (formData.get('excerpt') as string)?.trim()
  const coverImageUrl = (formData.get('cover_image_url') as string)?.trim() || null
  const published = formData.get('published') === 'true'

  if (!title) {
    return { success: false, error: 'Title is required' }
  }

  const supabase = await createClient()

  // Confirm ownership and fetch current state for slug/publish comparisons
  const { data: existing } = await supabase
    .from('blog_posts')
    .select('slug, title, published')
    .eq('id', postId)
    .eq('profile_id', owner.profileId)
    .single()

  if (!existing) {
    return { success: false, error: 'Post not found' }
  }

  // Only regenerate the slug if the title actually changed
  const slug = title !== existing.title
    ? await ensureUniqueSlug(owner.profileId, slugifyTitle(title), postId)
    : existing.slug

  const excerpt = excerptInput || excerptFromContent(content) || null

  const { error } = await supabase
    .from('blog_posts')
    .update({
      title,
      slug,
      excerpt,
      content,
      cover_image_url: coverImageUrl,
      published,
      // Set published_at the first time a post is published; keep it
      // stable across subsequent edits
      ...(published && !existing.published ? { published_at: new Date().toISOString() } : {}),
      ...(!published ? { published_at: null } : {}),
      updated_at: new Date().toISOString(),
    })
    .eq('id', postId)
    .eq('profile_id', owner.profileId)

  if (error) return { success: false, error: error.message }

  revalidatePath('/editor/blog')
  revalidatePath(`/editor/blog/${postId}`)
  revalidatePath(`/${owner.domain}/blog`)
  revalidatePath(`/${owner.domain}/blog/${slug}`)
  if (slug !== existing.slug) {
    revalidatePath(`/${owner.domain}/blog/${existing.slug}`)
  }

  return { success: true }
}

export async function deleteBlogPost(postId: string): Promise<{ success: boolean; error?: string }> {
  const owner = await getOwnProfileId()
  if ('error' in owner) return { success: false, error: owner.error }

  const supabase = await createClient()
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', postId)
    .eq('profile_id', owner.profileId)

  if (error) return { success: false, error: error.message }

  revalidatePath('/editor/blog')
  revalidatePath(`/${owner.domain}/blog`)

  return { success: true }
}
