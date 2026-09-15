import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface BlogPostBodyProps {
  content: string;
}

/**
 * Renders profile-owner-authored blog content.
 *
 * Unlike the Pets Friendz company blog (lib/mdx.ts + custom MDX
 * components), this content comes from self-serve business owners, so it's
 * untrusted, arbitrary input — often pasted in from elsewhere (a doc, an AI
 * tool, another CMS) rather than hand-written markdown.
 *
 * We deliberately use react-markdown (plain CommonMark/GFM via remark)
 * instead of next-mdx-remote's MDX/JSX compiler. MDX compiles embedded HTML
 * into real React elements, which breaks on anything JSX doesn't like about
 * plain HTML — e.g. a `style="color: red"` string attribute, which is valid
 * HTML but throws a hard React error since the `style` prop requires an
 * object. react-markdown (with rehype-raw) parses embedded HTML as HTML,
 * not JSX, so it doesn't hit that class of crash.
 *
 * rehype-raw turns embedded raw HTML (e.g. a pasted <div>) into real nodes
 * so it renders instead of showing as literal text. rehype-sanitize then
 * strips script tags, event-handler attributes, and javascript: URLs
 * before anything reaches the browser. Its default (GitHub-style) schema
 * also strips `style` and `class` attributes — safe by default, at the
 * cost of any inline styling in pasted HTML being dropped.
 */
export default function BlogPostBody({ content }: BlogPostBodyProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
