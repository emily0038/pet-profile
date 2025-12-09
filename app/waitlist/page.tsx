import Link from 'next/link'
import Image from 'next/image'
import WaitlistForm from '@/components/waitlistForm'
import Footer from "@/components/footer";

export default function WaitlistPage() {
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

        <Link href="/login" className="text-xl">
          Login
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16 font-flex">
        <div className="max-w-lg w-full space-y-8 text-center">
          {/* Icon or Illustration */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <Image
                src="/construction.svg"
                alt="Under construction"
                width={60}
                height={60}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-normal text-black">
              Coming Soon
            </h1>
            <p className="text-2xl text-gray-600">
              We&apos;re putting the finishing touches on the Pets Friendz sitter experience.
              Join the waitlist to be notified when we launch!
            </p>
          </div>

          {/* Waitlist Form */}
          <div className="mt-12">
            <WaitlistForm />
          </div>

          <p className="text-sm text-gray-500 mt-6">
            No spam, ever. We&apos;ll only email you when we launch.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
