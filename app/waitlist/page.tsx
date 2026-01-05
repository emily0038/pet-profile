import Image from 'next/image'
import WaitlistForm from '@/components/waitlistForm'
import Footer from "@/components/footer";
import PublicHeader from "@/components/publicHeader";

export default function WaitlistPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicHeader />

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
              Coming February 2026
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-[700px] mx-auto font-flex">
              We&apos;re putting the finishing touches on our page builder.
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
