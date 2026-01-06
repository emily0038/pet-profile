import Link from 'next/link'
import Image from 'next/image'

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
      {/* Logo and Brand */}
      <Link href="/editor" className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Pets Friendz Logo"
          width={50}
          height={50}
        />
        <span className="text-2xl text-black font-bold font-slab">Pets Friendz</span>
      </Link>

      {/* Right Side - Logout Button */}
      <div className="flex items-center">
        <button
          onClick={() => {
            // TODO: Implement logout logic
            window.location.href = '/login'
          }}
          className="px-6 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium text-gray-700"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
