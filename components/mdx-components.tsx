import Callout from './Callout'
import BlogFAQ from './BlogFAQ'
import CTABox from './CTABox'
import ProductCTA from './ProductCTA'
import NewsletterBox from './NewsletterBox'
import ValueCard from './ValueCard'
import ComparisonGrid from './ComparisonGrid'
import Image from 'next/image'

// Helper function to generate slug from heading text
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// BlogImage component for floated images in MDX
const BlogImage = ({
  src,
  alt,
  width = 400,
  height = 300,
  float = 'none',
  caption
}: {
  src: string
  alt: string
  width?: number
  height?: number
  float?: 'left' | 'right' | 'none'
  caption?: string
}) => {
  const floatClass = {
    left: 'float-left mr-6 mb-4',
    right: 'float-right ml-6 mb-4',
    none: 'mx-auto my-8'
  }[float]

  return (
    <figure className={`${floatClass} max-w-full`} style={{ maxWidth: `${width}px` }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg w-full h-auto shadow-sm"
      />
      {(caption || alt) && (
        <figcaption className="text-sm text-gray-500 text-center mt-2 italic">
          {caption || alt}
        </figcaption>
      )}
    </figure>
  )
}

export const mdxComponents = {
  Callout,
  BlogFAQ,
  CTABox,
  ProductCTA,
  NewsletterBox,
  ValueCard,
  ComparisonGrid,
  BlogImage,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
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
