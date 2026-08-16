import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getTemplateConfig } from '@/lib/templates/editorConfig';
import { formatPostDate } from '@/lib/blog';
import { getProfileSubPath } from '@/utils/url';
import BlogPostBody from '@/components/blog/BlogPostBody';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ username: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username: domain, slug } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, business_name')
    .eq('domain', domain)
    .single();

  if (!profile) {
    return { title: 'Post Not Found' };
  }

  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, cover_image_url, published')
    .eq('profile_id', profile.id)
    .eq('slug', slug)
    .single();

  if (!post || !post.published) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} - ${profile.business_name || 'Blog'}`,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: 'article',
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  };
}

export default async function ProfileBlogPostPage({ params }: PageProps) {
  const { username: domain, slug } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, domain, business_name, template_id, user_id')
    .eq('domain', domain)
    .single();

  if (!profile || !profile.template_id) {
    notFound();
  }

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('profile_id', profile.id)
    .eq('slug', slug)
    .single();

  const isOwner = user && user.id === profile.user_id;

  // Unpublished posts are only visible to the owner (preview before going live)
  if (!post || (!post.published && !isOwner)) {
    notFound();
  }

  const config = getTemplateConfig(profile.template_id);

  return (
    <div style={{ minHeight: '100vh', background: 'white', fontFamily: config.fonts.body }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 24px' }}>
        <Link
          href={getProfileSubPath(domain, '/blog')}
          style={{ color: config.colors.primary, fontSize: '15px', textDecoration: 'none' }}
        >
          &larr; Back to Blog
        </Link>

        {!post.published && (
          <div
            style={{
              marginTop: '16px',
              padding: '10px 16px',
              background: '#FEF3C7',
              border: '1px solid #FCD34D',
              borderRadius: '8px',
              color: '#92400E',
              fontSize: '14px',
            }}
          >
            This post is unpublished — only you can see this preview.
          </div>
        )}

        <h1 style={{ fontFamily: config.fonts.heading, fontSize: '40px', fontWeight: 700, color: '#000', marginTop: '24px', marginBottom: '12px' }}>
          {post.title}
        </h1>

        {post.published_at && (
          <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '32px' }}>
            {formatPostDate(post.published_at)}
          </div>
        )}

        {post.cover_image_url && (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', marginBottom: '32px' }}>
            <Image src={post.cover_image_url} alt={post.title} fill style={{ objectFit: 'cover' }} unoptimized />
          </div>
        )}

        <BlogPostBody content={post.content} />
      </div>
    </div>
  );
}
