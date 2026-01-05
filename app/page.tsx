import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import PublicHeader from "@/components/publicHeader";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="text-center py-20 px-8 bg-white">
        <h1 className="text-5xl font-bold text-black mb-5 leading-tight font-slab">
          The easiest way to grow<br />your pet sitting business
        </h1>
        <p className="text-xl text-gray-700 mb-10 max-w-[700px] mx-auto font-flex">
          Launch a professional pet care website in <b>seconds</b> to take your business to the next level
        </p>
        <Link
          href="/waitlist"
          className="bg-black text-white px-8 py-3.5 rounded text-base inline-flex items-center gap-2.5 hover:bg-gray-800 transition-colors font-medium"
        >
          Get Started
          <span className="text-xl">→</span>
        </Link>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-[#9185FF] uppercase tracking-widest mb-3 font-flex">
              HOW IT WORKS
            </div>
            <h2 className="text-4xl font-bold text-black leading-tight font-slab">
              Get started in 3 simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-white p-4 border-b border-gray-200">
                <div className="rounded shadow-sm overflow-hidden">
                  <Image
                    src="/template-selector.png"
                    alt="Template selection"
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="p-8 pb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E4E1FF] text-[#9185FF] rounded-full text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-3 text-black leading-snug font-slab">
                  Select a template
                </h3>
                <p className="text-base text-gray-700 leading-relaxed font-flex">
                  Choose from professionally designed templates that showcase your business.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-white p-4 border-b border-gray-200">
                <div className="rounded shadow-sm overflow-hidden">
                  <Image
                    src="/template-editor.png"
                    alt="Editor interface"
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="p-8 pb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E4E1FF] text-[#9185FF] rounded-full text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-3 text-black leading-snug font-slab">
                  Add your business details, services, and photos
                </h3>
                <p className="text-base text-gray-700 leading-relaxed font-flex">
                  Customize with your information, services, pricing, and photos.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-white p-4 border-b border-gray-200">
                <div className="rounded shadow-sm overflow-hidden">
                  <Image
                    src="/bubbly-example.png"
                    alt="Published website"
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="p-8 pb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E4E1FF] text-[#9185FF] rounded-full text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-3 text-black leading-snug font-slab">
                  Publish your website and share
                </h3>
                <p className="text-base text-gray-700 leading-relaxed font-flex">
                  Go live and start receiving booking requests in your inbox.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-black text-center mb-12 font-slab">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <details className="bg-white border border-gray-200 rounded-lg p-6 group">
              <summary className="text-xl font-bold text-black cursor-pointer list-none flex justify-between items-center">
                How does Pets Friendz work?
                <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
              </summary>
              <p className="mt-4 text-gray-700 font-flex">
                Pets Friendz makes it easy to create a professional profile for your pet sitting business. Simply add your details, services, and photos, then share your unique link with clients. They can view your services and request bookings directly through your page.
              </p>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg p-6 group">
              <summary className="text-xl font-bold text-black cursor-pointer list-none flex justify-between items-center">
                Is Pets Friendz free to use?
                <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
              </summary>
              <p className="mt-4 text-gray-700 font-flex">
                We offer a free (always!) plan to get you started. Premium features and advanced customization options will be available with our paid plans once we launch.
              </p>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg p-6 group">
              <summary className="text-xl font-bold text-black cursor-pointer list-none flex justify-between items-center">
                Can I customize my page?
                <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
              </summary>
              <p className="mt-4 text-gray-700 font-flex">
                Yes! Once you select your template, you can add your business details, upload photos, and customize your services to match your unique offerings. You can also leave optional sections blank to exclude them from your page.
              </p>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg p-6 group">
              <summary className="text-xl font-bold text-black cursor-pointer list-none flex justify-between items-center">
                How do I receive booking requests?
                <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
              </summary>
              <p className="mt-4 text-gray-700 font-flex">
                When a client submits a request through your profile, you&apos;ll receive an email notification with all the details. You can then respond directly to the client.
              </p>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg p-6 group">
              <summary className="text-xl font-bold text-black cursor-pointer list-none flex justify-between items-center">
                When will Pets Friendz launch?
                <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
              </summary>
              <p className="mt-4 text-gray-700 font-flex">
                We&apos;re working hard to perfect the platform before we launch in February 2026. Join our waitlist to be the first to know when we launch!
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
