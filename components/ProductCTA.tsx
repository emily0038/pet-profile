import Image from 'next/image'
import Link from 'next/link'

export default function ProductCTA() {
  return (
    <div className="rounded-2xl px-8 pt-2.5 pb-5 md:px-12 md:pt-4 md:pb-8 my-8 bg-[#E4E1FF]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="space-y-5">
          <h3 className="text-3xl font-bold font-slab text-black">
            Build your website with Pets Friendz
          </h3>
          <ul className="space-y-2 text-lg font-flex text-black">
            <ul className="flex items-center gap-2">
              <span className="text-[#9185FF] font-bold">&#10003;</span> Branded templates
            </ul>
            <ul className="flex items-center gap-2">
              <span className="text-[#9185FF] font-bold">&#10003;</span> Free hosting
            </ul>
            <ul className="flex items-center gap-2">
              <span className="text-[#9185FF] font-bold">&#10003;</span> Built-in SEO
            </ul>
          </ul>
          <div>
            <Link
              href="/signup"
              className="inline-block px-6 py-3 rounded-lg !font-bold transition-opacity hover:opacity-90 !text-white !no-underline bg-[#9185FF]"
            >
              Get Started Free
            </Link>
          </div>
        </div>
        <div className="blog-cta-images">
          <div className="blog-cta-image blog-cta-image-1 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <Image
              src="/hero-editor.png"
              alt="Pets Friendz editor interface"
              width={280}
              height={234}
              className="w-full h-auto"
            />
          </div>
          <div className="blog-cta-image blog-cta-image-2 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <Image
              src="/hero-preview.png"
              alt="Pets Friendz published website preview"
              width={280}
              height={234}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
