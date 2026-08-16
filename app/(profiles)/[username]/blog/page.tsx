import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getTemplateConfig } from '@/lib/templates/editorConfig';
import { formatPostDate } from '@/lib/blog';
import { getProfilePath, getProfileSubPath } from '@/utils/url';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username: domain } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('business_name')
    .eq('domain', domain)
    .single();

  if (!profile) {
    return { title: 'Blog Not Found' };
  }

  return {
    title: `Blog - ${profile.business_name || 'Pet Care Services'}`,
    description: `Latest updates from ${profile.business_name || 'this pet care business'}.`,
  };
}

export default async function ProfileBlogPage({ params }: PageProps) {
  const { username: domain } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, domain, business_name, template_id')
    .eq('domain', domain)
    .single();

  if (!profile || !profile.template_id) {
    notFound();
  }

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, cover_image_url, published_at')
    .eq('profile_id', profile.id)
    .eq('published', true)
    .order('published_at', { ascending: false });

  const config = getTemplateConfig(profile.template_id);

  return (
    <div style={{ minHeight: '100vh', background: 'white', fontFamily: config.fonts.body }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ marginBottom: '48px' }}>
          <Link href={getProfilePath(domain)} style={{ color: config.colors.primary, fontSize: '15px', textDecoration: 'none' }}>
            &larr; Back to {profile.business_name || 'profile'}
          </Link>
          <h1 style={{ fontFamily: config.fonts.heading, fontSize: '40px', fontWeight: 700, marginTop: '16px', color: '#000' }}>
            Blog
          </h1>
        </div>

        {!posts || posts.length === 0 ? (
          <p style={{ color: '#6b7280', fontSize: '16px' }}>No posts yet — check back soon.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {posts.map((post) => (
              <Link
                key={post.id}
                href={getProfileSubPath(domain, `/blog/${post.slug}`)}
                style={{
                  display: 'flex',
                  gap: '24px',
                  textDecoration: 'none',
                  color: 'inherit',
                  paddingBottom: '32px',
                  borderBottom: '1px solid #E5E7EB',
                }}
              >
                {post.cover_image_url && (
                  <div style={{ position: 'relative', width: '200px', height: '140px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden' }}>
                    <Image src={post.cover_image_url} alt={post.title} fill style={{ objectFit: 'cover' }} unoptimized />
                  </div>
                )}
                <div>
                  {post.published_at && (
                    <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '6px' }}>
                      {formatPostDate(post.published_at)}
                    </div>
                  )}
                  <h2 style={{ fontFamily: config.fonts.heading, fontSize: '24px', fontWeight: 700, color: '#000', marginBottom: '8px' }}>
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.6 }}>{post.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
