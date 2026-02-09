import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/footer'

export default function GetInvolvedPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Pets Friendz Logo"
            width={50}
            height={50}
          />
          <span className="text-2xl text-black font-bold font-slab">Pets Friendz</span>
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/blog" className="text-lg text-black hover:text-gray-600 transition-colors">
            Blog
          </Link>
          <Link href="/login" className="text-lg text-black hover:text-gray-600 transition-colors">
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-black text-white px-6 py-2.5 rounded text-base flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            Build your page
            <span className="text-lg">→</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <h1 className="text-5xl font-bold text-black mb-8 font-slab">Get Involved</h1>

          <div className="prose prose-lg max-w-none font-flex text-gray-700 space-y-6">
            <p className="text-xl">
              Want to get paid to grow your business with Pets Friendz? Apply to our ambassador program.
            </p>

            <h2 className="text-3xl font-bold text-black mt-12 mb-4 font-slab">Ambassador Program</h2>

            <p>
              We&apos;re looking for experienced pet sitters who are interested in helping us improve our tool. As an ambassador, you&apos;ll be expected to conduct hands-on testing for the Pets Friendz platform by incorporating your profile into your own pet sitting marketing initiatives.
            </p>

            <p>
              You should be willing to promote your profile to grow your client base through a mix of digital and community-based initiatives.
            </p>

            <p>
              Projects will vary, but responsibilities may include:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Completing on-the-ground tasks to promote your profile</li>
              <li>Reporting your experiences (via email or video call) to be shared on the company website</li>
              <li>Creating social media content for the company page (if comfortable)</li>
            </ul>

            <p>
              Ambassadors should be comfortable having their name/photo shared on the company website.
            </p>

            <p>
              If that sounds like you, please email <a href="mailto:emily@petsfriendz.com" className="text-[#9185FF] underline hover:text-[#5B4FC6] font-medium">emily@petsfriendz.com</a> with the subject line <strong>Pets Friendz Ambassador</strong>, and include the following information:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>A quick summary of your pet sitting experience</li>
              <li>How you currently promote your pet care services</li>
              <li>What tools / app(s) you use for your pet sitting business</li>
              <li>Your business goals</li>
              <li>Your social media (TikTok or Instagram preferred)</li>
            </ul>

            <p className="font-semibold">
              Ambassadors will be paid on a per-project basis at a rate of $25/hour.
            </p>

            <h2 className="text-3xl font-bold text-black mt-12 mb-4 font-slab">Subject Matter Expert</h2>

            <p>Already have a website you love? You can still join in to help solve the pet sitting marketing problem. We&apos;re also looking for experienced pet sitters to share their first-hand experiences for our blog and newsletter.</p>
            <p>You&apos;ll complete surveys and interviews over email and video calls, so no writing necessary! If you&apos;re interested, reach out to <a href="mailto:emily@petsfriendz.com" className="text-[#9185FF] underline hover:text-[#5B4FC6] font-medium">emily@petsfriendz.com</a> with the subject line <strong>Pets Friendz SME</strong>.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
