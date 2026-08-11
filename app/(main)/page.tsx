import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import PublicHeader from "@/components/publicHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pets Friendz - The easiest way to grow your pet sitting business",
  description: "Launch a professional pet care website in seconds to take your business to the next level. Build your profile, share your page, and get requests directly in your inbox.",
  openGraph: {
    title: "Pets Friendz - The easiest way to grow your pet sitting business",
    description: "Launch a professional pet care website in seconds to take your business to the next level. Build your profile, share your page, and get requests directly in your inbox.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-left">
            <h1 className="text-5xl font-bold text-black mb-5 leading-tight font-slab">
              The easiest way to grow<br />your pet sitting business
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-[700px] font-flex">
              Launch a professional pet care website in <b>minutes</b> to take your business to the next level
            </p>
            <Link
              href="/signup"
              className="bg-black text-white px-8 py-3.5 rounded text-base inline-flex items-center gap-2.5 hover:bg-gray-800 transition-colors font-medium"
            >
              Get Started
              <span className="text-xl">→</span>
            </Link>
          </div>
          <div className="flex-1 w-full">
            <div className="homepage-hero-images">
              <div className="homepage-hero-image homepage-hero-image-1 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <Image
                  src="/hero-editor.png"
                  alt="Pets Friendz editor interface"
                  width={400}
                  height={334}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <div className="homepage-hero-image homepage-hero-image-2 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <Image
                  src="/hero-preview.png"
                  alt="Pets Friendz published website preview"
                  width={400}
                  height={334}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
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
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
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
              <div className="p-8 pb-6 mt-auto">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E4E1FF] text-[#9185FF] rounded-full text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-3 text-black leading-snug font-slab">
                  Select a template
                </h3>
                <p className="text-base text-gray-700 leading-relaxed font-flex">
                  Choose from professionally designed templates to showcase your business.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
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
              <div className="p-8 pb-6 mt-auto">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E4E1FF] text-[#9185FF] rounded-full text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-3 text-black leading-snug font-slab">
                  Add details, services, and photos
                </h3>
                <p className="text-base text-gray-700 leading-relaxed font-flex">
                  Customize with your information, services, pricing, and photos.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
              <div className="bg-white p-4 border-b border-gray-200">
                <div className="rounded shadow-sm overflow-hidden">
                  <Image
                    src="/pro-example.png"
                    alt="Published website"
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="p-8 pb-6 mt-auto">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E4E1FF] text-[#9185FF] rounded-full text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-3 text-black leading-snug font-slab">
                  Publish your website
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
                Pets Friendz is a website builder with a form-based editing process. That means that to build a page, all you have to do is choose a template, upload your content (business details, services, and photos), then click Publish. No coding, formatting, or hosting setup required!
              </p>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg p-6 group">
              <summary className="text-xl font-bold text-black cursor-pointer list-none flex justify-between items-center">
                Is Pets Friendz free to use?
                <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
              </summary>
              <p className="mt-4 text-gray-700 font-flex">
                Yes! Pets Friendz is completely free to use. Get started with any template design, a custom subdomain, custom domain connection, and GA4 setup — no fees, no upgrades required.
              </p>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg p-6 group">
              <summary className="text-xl font-bold text-black cursor-pointer list-none flex justify-between items-center">
                Can I customize my page?
                <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
              </summary>
              <p className="mt-4 text-gray-700 font-flex">
                Yes! Once you select your template, you can customize your page by uploading your own logo, photos, and content. You can also leave optional sections blank to exclude them from your page.
              </p>
              <p className="mt-4 text-gray-700 font-flex">
                If there are any changes you’d like to see made to the page designs, please reach out to <a href="mailto:emily@petsfriendz.com">emily@petsfriendz.com</a>.
              </p>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg p-6 group">
              <summary className="text-xl font-bold text-black cursor-pointer list-none flex justify-between items-center">
                How do I receive booking requests?
                <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
              </summary>
              <p className="mt-4 text-gray-700 font-flex">
                All of the Pets Friendz templates include an optional form where visitors can submit pet care inquiries. You&apos;ll receive any messages directly in your account email.
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
