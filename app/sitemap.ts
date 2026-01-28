import { MetadataRoute } from 'next'
import { createClient } from '@/utils/supabase/server'
import { getAllPosts } from '@/lib/mdx'
import { getProfileUrl, getBaseUrl } from '@/utils/url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl()
  const supabase = await createClient()

  // Fetch all published profiles
  const { data: profiles } = await supabase
    .from('profiles')
    .select('domain, updated_at, user_id')
    .not('domain', 'is', null)
    .not('template_id', 'is', null)

  // Fetch user_ids that have active custom domains
  const { data: customDomains } = await supabase
    .from('custom_domains')
    .select('user_id')
    .eq('status', 'active')

  // Create set of user_ids with custom domains for fast lookup
  const usersWithCustomDomains = new Set(customDomains?.map(cd => cd.user_id) || [])

  // Filter out profiles that have custom domains
  const profilesWithoutCustomDomains = profiles?.filter(
    profile => !usersWithCustomDomains.has(profile.user_id)
  ) || []

  // Fetch all blog posts
  const blogPosts = getAllPosts()

  // Create static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/waitlist`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
        {
      url: `${baseUrl}/get-involved`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Create dynamic profile pages (excluding those with custom domains)
  const profilePages: MetadataRoute.Sitemap = profilesWithoutCustomDomains.map((profile) => ({
    url: getProfileUrl(profile.domain),
    lastModified: profile.updated_at ? new Date(profile.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Create blog post pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...profilePages, ...blogPages]
}
