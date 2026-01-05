import Link from 'next/link'
import Footer from '@/components/footer'
import PublicHeader from "@/components/publicHeader";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <PublicHeader />

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <h1 className="text-5xl font-bold text-black mb-8 font-slab">Contact Us</h1>

          <div className="prose prose-lg max-w-none font-flex text-gray-700 space-y-8">
            <p className="text-xl">
              We&apos;d love to hear from you! Whether you have questions, feedback, or need support, we&apos;re here to help.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-black mb-4 font-slab">Email Us</h3>
                <p className="text-gray-700 mb-2">General Inquiries:</p>
                <a href="mailto:emily@petsfriendz.com" className="text-[#9185FF] hover:text-[#5B4FC6] font-medium">
                  emily@petsfriendz.com
                </a>
                <p className="text-gray-700 mt-4 mb-2">Support:</p>
                <a href="mailto:admin@petsfriendz.com" className="text-[#9185FF] hover:text-[#5B4FC6] font-medium">
                  admin@petsfriendz.com
                </a>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-black mb-4 font-slab">Follow Us</h3>
                <p className="text-gray-700 mb-4">Stay updated with the latest news and tips</p>
                <div className="space-y-2">
                  <p>
                    <a href="#" className="text-[#9185FF] hover:text-[#5B4FC6] font-medium">
                      Twitter
                    </a>
                  </p>
                  <p>
                    <a href="#" className="text-[#9185FF] hover:text-[#5B4FC6] font-medium">
                      Instagram
                    </a>
                  </p>
                  <p>
                    <a href="#" className="text-[#9185FF] hover:text-[#5B4FC6] font-medium">
                      Facebook
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg mt-12">
              <h3 className="text-xl font-bold text-black mb-2 font-slab">Looking to get started?</h3>
              <p className="mb-4">
                <Link href="/waitlist" className="text-[#9185FF] underline hover:text-[#5B4FC6] font-medium">Join our waitlist</Link> to be the first to know when we launch.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-3xl font-bold text-black mb-6 font-slab">Frequently Asked Questions</h2>
              <p>
                Before reaching out, you might find your answer in our <Link href="/#faq" className="text-[#9185FF] underline hover:text-[#5B4FC6] font-medium">FAQ section</Link> on the home page.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
