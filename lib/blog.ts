/**
 * Helpers for per-profile blog posts (not to be confused with lib/mdx.ts,
 * which powers the Pets Friendz company blog from static MDX files).
 */

/**
 * Generates a URL-safe slug from a post title.
 */
export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Derives a short plain-text excerpt from markdown content when the author
 * hasn't written one explicitly.
 */
export function excerptFromContent(content: string, maxLength = 160): string {
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // code blocks
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // links -> text
    .replace(/[#>*_`~-]/g, '') // markdown punctuation
    .replace(/\s+/g, ' ')
    .trim();

  if (plainText.length <= maxLength) return plainText;
  return plainText.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

/**
 * Formats a published date for display, e.g. "March 1, 2026".
 */
export function formatPostDate(dateString: string | null): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
