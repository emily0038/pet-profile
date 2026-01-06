import Image from 'next/image'
import Link from 'next/link'

interface CTABoxProps {
  /** Heading text */
  heading: string
  /** Body text or JSX content */
  body: string | React.ReactNode
  /** Button text */
  buttonText?: string
  /** Button URL */
  buttonUrl?: string
  /** Image source path */
  imageSrc?: string
  /** Image alt text */
  imageAlt?: string
  /** Image width */
  imageWidth?: number
  /** Image height */
  imageHeight?: number
  /** Text color (default: black) */
  textColor?: string
  /** Image position: 'left' or 'right' (default: 'right') */
  imagePosition?: 'left' | 'right'
}

export default function CTABox({
  heading,
  body,
  buttonText,
  buttonUrl,
  imageSrc,
  imageAlt = '',
  imageWidth = 300,
  imageHeight = 200,
  textColor = '#000000',
  imagePosition = 'right'
}: CTABoxProps) {
  const textContent = (
    <div className="space-y-6">
      <h3 className="text-3xl font-bold font-slab" style={{ color: textColor }}>
        {heading}
      </h3>
      <div className="text-lg font-flex" style={{ color: textColor }}>
        {body}
      </div>
      {buttonText && buttonUrl && (
        <div>
          <Link
            href={buttonUrl}
            className="inline-block px-6 py-3 rounded-lg font-bold transition-opacity hover:opacity-90 text-white bg-[#9185FF]"
          >
            {buttonText}
          </Link>
        </div>
      )}
    </div>
  )

  const imageContent = imageSrc ? (
    <div className="flex items-center justify-center">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        className="rounded-lg shadow-md w-full h-auto max-w-full"
      />
    </div>
  ) : null

  return (
    <div
      className="rounded-2xl p-8 md:p-12 my-8 bg-[#E4E1FF]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {imagePosition === 'left' ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    </div>
  )
}
