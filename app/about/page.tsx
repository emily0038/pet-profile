import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/footer'
import PublicHeader from '@/components/publicHeader'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PublicHeader />

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <h1 className="text-5xl font-bold text-black mb-8 font-slab">About Pets Friendz</h1>

          <div className="prose prose-lg max-w-none font-flex text-gray-700 space-y-6">
            <p className="text-xl">
              Pets Friendz was built to help pet sitters grow their businesses and connect with pet owners who need trusted care for their furry friends.
            </p>
            <h2 className="text-3xl font-bold text-black mt-12 mb-4 font-slab">Our Story</h2>

            {/* Photo placeholder - floats right on desktop, full width on mobile */}
            <div className="float-none sm:float-right sm:ml-8 sm:mb-6 mb-6 w-full sm:w-80 rounded-lg overflow-hidden shadow-lg bg-gray-100">
              <Image
                src="/emily-and-hazel.jpg"
                alt="Emily and her mini goldendoodle Hazel"
                width={320}
                height={400}
                className="object-cover w-full h-auto"
              />
              <p className="text-sm text-gray-500 text-center py-2 px-4 bg-gray-50">Emily and her dog Hazel</p>
            </div>

            <p>
              Hi, I&apos;m Emily! I&apos;m an animal lover and pet care provider, and I&apos;m trying to solve the marketing problem for pet sitters by removing the barriers to building and growing their own business.

            </p>
            <p>
              When I first got my mini goldendoodle, I found it surprisingly difficult to find experienced, responsible caregivers to trust her with when I went away.
            </p>
            <p>
              I got my start in professional dog care in 2024, when I joined Rover as a boarding and daycare provider. At first, it was a great experience. Getting listed on the marketplace helped me connect with clients, and the app made it easy to manage communications and bookings in one place.
            </p>
            <p>
              But a year (and a few months of unemployment) later, I decided it was time to stop paying steep platform fees and start building my own client list. As I began to build out my personal brand, I quickly realized that I was no longer working as a pet sitter; I was doing the job of an entire marketing and sales team.
            </p>
            <p>
              If it weren&apos;t for my web dev hobby and background in marketing, I&apos;d be stuck before I even started, or shelling out thousands for a professional service. And while pet care requires a diverse set of skills, software development isn&apos;t typically in the job description.
            </p>
            <p>
              That&apos;s why I created Pets Friendz Pages: To empower trustworthy independent care providers and small businesses to build an online presence that reflects their level of service. I focused on making the process as quick and easy as possible, so sitters could spend less time working on marketing and more time with the pets in their care.
            </p>
            <p>
              I&apos;m always looking for feedback! If you have any thoughts or suggestions, feel free to reach out to <a href="mailto:emily@petsfriendz.com">emily@petsfriendz.com</a>.
            </p>
            <h2 className="text-3xl font-bold text-black mt-12 mb-4 font-slab">Join Us</h2>
            <p>
              Whether you&apos;re just starting your pet sitting journey or you&apos;re a seasoned professional, Pets Friendz is here to help you succeed. <Link href="/waitlist" className="text-[#9185FF] underline hover:text-[#5B4FC6] font-medium">Join our waitlist</Link> to be among the first to experience the platform.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
