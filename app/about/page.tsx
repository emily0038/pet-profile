import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/footer'

export default function AboutPage() {
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
            href="/waitlist"
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
              <p className="text-sm text-gray-500 text-center py-2 px-4 bg-gray-50">Me and my dog Hazel</p>
            </div>

            <p>
              Hi, I&apos;m Emily! I&apos;m an animal lover and pet care provider, and I&apos;m trying to solve the marketing challenge for pet sitters by removing the barriers to building a client base on their own.
            </p>
            <p>
              When I first got my mini goldendoodle, I found it surprisingly difficult to find experienced, responsible caregivers to trust her with when I went away.
            </p>
            <p>
              I ended up reluctantly joining a marketplace app and found a top-rated sitter in my area. And although we loved her, it felt weird knowing that 30% of the cost was going to a middleman company that played no part in the care.
            </p>
            <p>
              As I continued to seek out individualized care for my pup, it felt like every self-employed sitter either found their clients solely through word-of-mouth, or by joining an app. There was no in-between.
            </p>
            <p>
              That’s why I built Pets Friendz Pages– to empower trustworthy independent care providers and small businesses to take control of their own marketing. By putting sitters in charge of their own growth, this tool enables them to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Build a brand that highlights their unique offerings and differentiators</li>
              <li>Set prices that reflect their work and expenses– without the middleman fees</li>
              <li>Manage their own policies without thinking about the impact on the algorithm</li>
            </ul>
            <p>
              For many care providers, building a professional website is the first hurdle in getting your brand in front of potential clients. But it’s not the last.
            </p>
            <p>
              <a href="mailto:emily@petsfriendz.com">Let me know</a> what other features you&apos;d like to see added to the platform. I’m always looking for new ways to help pet care professionals grow their business!
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
