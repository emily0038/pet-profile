'use client'

import { signup } from '@/app/actions/auth'
import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2 bg-[#9185FF] text-white rounded-lg hover:bg-[#6E5FEE] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? 'Creating account...' : 'Sign up'}
    </button>
  )
}

export default function SignupPage() {
  const [state, formAction] = useActionState(signup, null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-[#9185FF] hover:text-[#6E5FEE]">
              Log in
            </Link>
          </p>
        </div>

        <form action={formAction} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium mb-1">
                  First name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF] dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Jane"
                />
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium mb-1">
                  Last name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF] dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Eyre"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF] dark:bg-gray-800 dark:border-gray-700"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium mb-1">
                Phone number
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                autoComplete="tel"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF] dark:bg-gray-800 dark:border-gray-700"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="business" className="block text-sm font-medium mb-1">
                Business <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <input
                id="business"
                name="business"
                type="text"
                autoComplete="organization"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF] dark:bg-gray-800 dark:border-gray-700"
                placeholder="Pet Care Co."
              />
            </div>

            {/* Turned off autoComplete to avoid React hydration error */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                required
                minLength={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF] dark:bg-gray-800 dark:border-gray-700"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
            </div>
          </div>

          {state?.error && (
            <div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              {state.error}
            </div>
          )}

          <SubmitButton />
        </form>
      </div>
    </div>
  )
}
