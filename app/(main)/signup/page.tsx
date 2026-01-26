'use client'

import { signupBasicInfo } from '@/app/actions/auth'
import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] text-white rounded-lg px-4 py-4 text-base font-medium hover:from-[#7c3aed] hover:to-[#6d28d9] hover:shadow-[0_8px_24px_rgba(139,92,246,0.3)] hover:-translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mt-8"
    >
      {pending ? 'Creating account...' : 'Sign up'}
    </button>
  )
}

export default function SignupPage() {
  const [state, formAction] = useActionState(signupBasicInfo, null)

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
          className="rounded-2xl px-[60px] py-12 backdrop-blur-[10px]"
          style={{
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(71, 85, 105, 0.3)',
          }}
        >
          <h1
            className="text-center text-[42px] font-light mb-3"
            style={{
              color: '#cbd5e1',
              letterSpacing: '-0.5px'
            }}
          >
            Create your account
          </h1>
          <p
            className="text-center text-[15px] mb-10"
            style={{ color: '#94a3b8' }}
          >
            Already have an account?{' '}
            <Link
              href="/login"
              className="hover:text-[#c4b5fd] transition-colors duration-200"
              style={{ color: '#a78bfa', textDecoration: 'none' }}
            >
              Log in
            </Link>
          </p>

          <form action={formAction}>
            {/* First and Last Name Row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  htmlFor="first_name"
                  className="flex items-center gap-2 text-sm mb-2 font-normal"
                  style={{ color: '#94a3b8' }}
                >
                  First name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  required
                  placeholder="Jane"
                  className="w-full rounded-lg px-4 py-[14px] text-[15px] border transition-all duration-200 focus:outline-none placeholder:text-[#475569]"
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(71, 85, 105, 0.5)',
                    color: '#e2e8f0'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8b5cf6'
                    e.target.style.background = 'rgba(15, 23, 42, 0.8)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(71, 85, 105, 0.5)'
                    e.target.style.background = 'rgba(15, 23, 42, 0.6)'
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="flex items-center gap-2 text-sm mb-2 font-normal"
                  style={{ color: '#94a3b8' }}
                >
                  Last name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  required
                  placeholder="Eyre"
                  className="w-full rounded-lg px-4 py-[14px] text-[15px] border transition-all duration-200 focus:outline-none placeholder:text-[#475569]"
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(71, 85, 105, 0.5)',
                    color: '#e2e8f0'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8b5cf6'
                    e.target.style.background = 'rgba(15, 23, 42, 0.8)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(71, 85, 105, 0.5)'
                    e.target.style.background = 'rgba(15, 23, 42, 0.6)'
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm mb-2 font-normal"
                style={{ color: '#94a3b8' }}
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-lg px-4 py-[14px] text-[15px] border transition-all duration-200 focus:outline-none placeholder:text-[#475569]"
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(71, 85, 105, 0.5)',
                  color: '#e2e8f0'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8b5cf6'
                  e.target.style.background = 'rgba(15, 23, 42, 0.8)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(71, 85, 105, 0.5)'
                  e.target.style.background = 'rgba(15, 23, 42, 0.6)'
                }}
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-sm mb-2 font-normal"
                style={{ color: '#94a3b8' }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full rounded-lg px-4 py-[14px] text-[15px] border transition-all duration-200 focus:outline-none placeholder:text-[#475569]"
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(71, 85, 105, 0.5)',
                  color: '#e2e8f0'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8b5cf6'
                  e.target.style.background = 'rgba(15, 23, 42, 0.8)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(71, 85, 105, 0.5)'
                  e.target.style.background = 'rgba(15, 23, 42, 0.6)'
                }}
              />
              <p className="mt-[6px] text-[13px]" style={{ color: '#64748b' }}>
                Must be at least 6 characters
              </p>
            </div>

            {state?.error && (
              <div
                className="text-sm p-3 rounded-lg mb-6"
                style={{
                  color: '#f87171',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}
              >
                {state.error}
              </div>
            )}

            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  )
}
