'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

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

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-5">
        <Link href="/pricing" className="text-lg text-black hover:text-gray-600 transition-colors">
          Pricing
        </Link>
        <Link href="/blog" className="text-lg text-black hover:text-gray-600 transition-colors">
          Blog
        </Link>
        <Link href="/login" className="text-lg text-black hover:text-gray-600 transition-colors">
          Login
        </Link>
        <Link
          href="/signup"
          className="bg-black text-white px-6 py-2.5 rounded text-base flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          Build your page
          <span className="text-lg">→</span>
        </Link>
      </div>

      {/* Mobile hamburger */}
      <div className="relative md:hidden" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            <Link
              href="/pricing"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              Blog
            </Link>
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              Login
            </Link>
            <div className="border-t border-gray-200 my-1"></div>
            <Link
              href="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 font-semibold hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              Build your page
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
