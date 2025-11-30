import Image from "next/image";
import Link from "next/link";
import WaitlistForm from "@/components/waitlistForm";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Pets Friendz Logo"
            width={60}
            height={60}
          />
          <span className="text-3xl text-black font-bold font-slab">Pets Friendz</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/login" className="text-xl text-black">
            Login
          </Link>
          <Link
            href="/waitlist"
            className="bg-black text-white px-8 py-3 rounded text-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            Build your page
            <span className="text-xl">→</span>
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
    </div>
  );
}
