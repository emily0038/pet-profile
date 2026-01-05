import Callout from './Callout'
import BlogFAQ from './BlogFAQ'

// Helper function to generate slug from heading text
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const mdxComponents = {
  Callout,
  BlogFAQ,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className="text-[#9185FF] hover:text-[#5B4FC6] underline font-medium"
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof props.children === 'string' ? props.children : ''
    const id = generateSlug(text)
    return (
      <h2 {...props} id={id} className="text-4xl font-bold text-black font-slab mt-12 mb-6 scroll-mt-8" />
    )
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof props.children === 'string' ? props.children : ''
    const id = generateSlug(text)
    return (
      <h3 {...props} id={id} className="text-2xl font-bold text-black font-slab mt-8 mb-4 scroll-mt-8" />
    )
  },
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props} className="mb-6 text-gray-700" />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="my-6 pl-6 text-gray-700" style={{ listStyleType: 'none' }}>
      {props.children}
    </ul>
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="my-6 pl-6 list-decimal text-gray-700">
      {props.children}
    </ol>
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li
      {...props}
      className="relative pl-2 mb-2 text-gray-700"
      style={{
        paddingLeft: '0.5rem',
      }}
    />
  ),
}
