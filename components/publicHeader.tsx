import Image from "next/image";
import Link from "next/link";

export default function PublicHeader() {
  return (
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
  );
}
