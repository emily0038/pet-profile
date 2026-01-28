'use client'

import { useState } from 'react'

export default function NewsletterBox() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const { subscribeToNewsletter } = await import('@/app/actions/newsletter')
      const result = await subscribeToNewsletter(email)

      setMessage(result.message)
      if (result.success) {
        setEmail('')
      }
    } catch {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl p-8 md:p-12 my-8 bg-gray-50">
      <div className="text-2xl font-bold font-slab text-black mb-8">
        Sign up for our newsletter 🗞️
      </div>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9185FF] font-flex"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#9185FF] hover:bg-[#5B4FC6] text-white px-6 py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-none"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && (
        <p className={`mt-3 text-sm font-flex ${message.includes('Thanks') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  )
}
