import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSanitize from 'rehype-sanitize';

interface BlogPostBodyProps {
  content: string;
}

/**
 * Renders profile-owner-authored blog content.
 *
 * Unlike the Pets Friendz company blog (lib/mdx.ts + custom MDX
 * components), this content comes from self-serve business owners, so it's
 * untrusted input. rehype-sanitize strips script tags, event-handler
 * attributes, and javascript: URLs from the compiled output before it ever
 * reaches the browser, while still allowing normal markdown formatting
 * (headings, links, images, lists, code, tables).
 */
export default function BlogPostBody({ content }: BlogPostBodyProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypeSanitize],
          },
        }}
      />
    </div>
  );
}
