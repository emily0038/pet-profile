import Image from "next/image";
import Link from "next/link";
import WaitlistForm from "@/components/waitlistForm";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
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
            href="/waitlist"
            className="bg-black text-white px-6 py-2.5 rounded text-base flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            Build your page
            <span className="text-lg">→</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center px-8 py-16 font-flex">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h1 className="text-6xl text-black font-normal leading-tight">
              The easiest way<br />
              to grow your pet sitting business
            </h1>

            <p className="text-2xl text-gray-700 leading-relaxed font-flex">
              Build your profile in <b>seconds</b>, share your page, and get requests directly in your inbox
            </p>

            {/* Waitlist Form Container */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <h3 className="text-2xl text-black font-normal">
                  Ready to build?
                </h3>
                <p className="text-base text-gray-600">
                  Be the first to know when we launch.
                </p>
                <WaitlistForm />
                <p className="text-xs text-gray-500">
                  No spam, ever. We&apos;ll only email you when we&apos;re live.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Product Showcase */}
          <div className="relative space-y-12">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 bg-black text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <p className="text-xl text-black font-flex pt-3">
                  Add business details,<br />
                  services, and photos
                </p>
              </div>
              <div className="pl-0">
                <Image
                  src="/iphone-edit.png"
                  alt="Editor interface showing profile setup"
                  width={300}
                  height={600}
                  className="max-w-full h-auto"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 bg-black text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <p className="text-xl text-black font-flex pt-3">
                  Publish your<br />
                  profile and share
                </p>
              </div>
              <div className="pl-0">
                <Image
                  src="/iphone-ui.png"
                  alt="Published profile interface"
                  width={300}
                  height={600}
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FAQ Section */}
      <section id="faq" className="bg-gray-50 py-16 px-8">
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
                Can I customize my profile?
                <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
              </summary>
              <p className="mt-4 text-gray-700 font-flex">
                Yes! You can add your business details, set your own pricing, upload photos, and customize your services to match your unique offerings.
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
                We&apos;re currently in beta and working hard to perfect the platform. Join our waitlist to be the first to know when we launch!
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
