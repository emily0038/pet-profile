'use client'

import { ReactNode } from 'react'

interface FAQItemProps {
  question: string
  answer: ReactNode
}

interface BlogFAQProps {
  items: FAQItemProps[]
  className?: string
}

export default function BlogFAQ({ items, className = '' }: BlogFAQProps) {
  return (
    <div className={`space-y-4 my-8 ${className}`}>
      {items.map((item, index) => (
        <details
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-6 group"
        >
          <summary className="text-lg font-bold text-black cursor-pointer list-none flex justify-between items-center">
            {item.question}
            <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
          </summary>
          <div className="mt-4 text-gray-700">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  )
}
