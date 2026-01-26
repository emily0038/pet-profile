'use client'

import { resendVerificationEmail } from '@/app/actions/auth'
import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || 'your email'
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)

  const handleResend = async () => {
    setResending(true)
    setResendMessage(null)

    try {
      const result = await resendVerificationEmail(email)
      if (result.success) {
        setResendMessage('Verification email sent! Check your inbox.')
      } else {
        setResendMessage(result.error || 'Failed to resend email')
      }
    } catch {
      setResendMessage('Failed to resend email. Please try again.')
    } finally {
      setResending(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5"
      style={{
        background: 'linear-gradient(135deg, #1a2332 0%, #0f1419 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
      }}
    >
      <div className="w-full max-w-[600px]">
        <div
          className="rounded-2xl px-[60px] py-12 backdrop-blur-[10px] text-center"
          style={{
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(71, 85, 105, 0.3)',
          }}
        >
          {/* Email Icon */}
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{
              background: 'rgba(139, 92, 246, 0.15)',
              border: '2px solid rgba(139, 92, 246, 0.3)'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-10 h-10"
              style={{ color: '#a78bfa' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h1
            className="text-[32px] font-light mb-4"
            style={{
              color: '#cbd5e1',
              letterSpacing: '-0.5px'
            }}
          >
            Check your inbox
          </h1>

          <div
            className="text-[15px] leading-relaxed mb-5"
            style={{ color: '#94a3b8' }}
          >
            <p>We&apos;ve sent a verification link to</p>
            <p className="font-medium mt-1" style={{ color: '#c4b5fd' }}>
              {email}
            </p>
            <p className="mt-4">
              Click the link in the email to verify your account and continue setting up your profile.
            </p>
          </div>

          {resendMessage && (
            <div
              className="text-sm p-3 rounded-lg mb-4"
              style={{
                color: resendMessage.includes('sent') ? '#86efac' : '#f87171',
                background: resendMessage.includes('sent')
                  ? 'rgba(34, 197, 94, 0.1)'
                  : 'rgba(239, 68, 68, 0.1)',
                border: resendMessage.includes('sent')
                  ? '1px solid rgba(34, 197, 94, 0.2)'
                  : '1px solid rgba(239, 68, 68, 0.2)'
              }}
            >
              {resendMessage}
            </div>
          )}

          <button
            onClick={handleResend}
            disabled={resending}
            className="text-sm mt-4 hover:underline transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ color: '#a78bfa' }}
          >
            {resending ? 'Sending...' : "Didn't receive the email? Resend"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #1a2332 0%, #0f1419 100%)',
        }}
      >
        <div className="text-white">Loading...</div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
