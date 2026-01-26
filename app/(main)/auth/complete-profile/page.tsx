'use client'

import { completeProfile, checkDomainAvailability } from '@/app/actions/auth'
import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] text-white rounded-lg px-4 py-4 text-base font-medium hover:from-[#7c3aed] hover:to-[#6d28d9] hover:shadow-[0_8px_24px_rgba(139,92,246,0.3)] hover:-translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mt-8"
    >
      {pending ? 'Completing setup...' : 'Complete setup'}
    </button>
  )
}

function InfoTooltip({ text }: { text: string }) {
  return (
    <span
      className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[11px] cursor-help relative group"
      style={{
        background: 'rgba(139, 92, 246, 0.2)',
        border: '1px solid rgba(139, 92, 246, 0.4)',
        color: '#a78bfa'
      }}
    >
      i
      <span
        className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 px-3 py-2 rounded-md text-[12px] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-10"
        style={{
          background: '#1e293b',
          border: '1px solid #475569',
          color: '#e2e8f0'
        }}
      >
        {text}
      </span>
    </span>
  )
}

export default function CompleteProfilePage() {
  const [state, formAction] = useActionState(completeProfile, null)
  const [domainValue, setDomainValue] = useState('')
  const [domainStatus, setDomainStatus] = useState<{
    checking: boolean
    available: boolean | null
    message: string
  }>({ checking: false, available: null, message: '' })

  const handleCheckDomain = async () => {
    if (!domainValue || domainValue.length < 3) {
      setDomainStatus({
        checking: false,
        available: false,
        message: 'Domain must be at least 3 characters'
      })
      return
    }

    setDomainStatus({ checking: true, available: null, message: 'Checking...' })

    try {
      const result = await checkDomainAvailability(domainValue)
      setDomainStatus({
        checking: false,
        available: result.available,
        message: result.message
      })
    } catch {
      setDomainStatus({
        checking: false,
        available: false,
        message: 'Failed to check domain availability'
      })
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
            Complete your profile
          </h1>
          <p
            className="text-center text-[15px] mb-10"
            style={{ color: '#94a3b8' }}
          >
            Just a few more details to get started
          </p>

          <form action={formAction}>
            {/* Business Name */}
            <div className="mb-6">
              <label
                htmlFor="business_name"
                className="flex items-center gap-2 text-sm mb-2 font-normal"
                style={{ color: '#94a3b8' }}
              >
                Business name
                <InfoTooltip text="Business name to display on your website (ex: Sarah's Pet Care)" />
              </label>
              <input
                id="business_name"
                name="business_name"
                type="text"
                required
                placeholder="Pet Care Co."
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

            {/* Phone Number */}
            <div className="mb-6">
              <label
                htmlFor="phone_number"
                className="flex items-center gap-2 text-sm mb-2 font-normal"
                style={{ color: '#94a3b8' }}
              >
                Phone number
                <InfoTooltip text="Primary contact number for your business" />
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                required
                placeholder="(555) 123-4567"
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

            {/* Domain */}
            <div className="mb-6">
              <label
                htmlFor="domain"
                className="flex items-center gap-2 text-sm mb-2 font-normal"
                style={{ color: '#94a3b8' }}
              >
                Subdomain
                <InfoTooltip text="This will be displayed in your URL (e.g., yourbusiness.petsfriendz.com)" />
              </label>
              <div className="flex gap-2">
                <input
                  id="domain"
                  name="domain"
                  type="text"
                  required
                  placeholder="yourbusiness"
                  value={domainValue}
                  onChange={(e) => {
                    setDomainValue(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))
                    setDomainStatus({ checking: false, available: null, message: '' })
                  }}
                  className="flex-1 rounded-lg px-4 py-[14px] text-[15px] border transition-all duration-200 focus:outline-none placeholder:text-[#475569]"
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
                <button
                  type="button"
                  onClick={handleCheckDomain}
                  disabled={domainStatus.checking || !domainValue}
                  className="px-6 py-[14px] rounded-lg text-[15px] font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'rgba(139, 92, 246, 0.2)',
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                    color: '#a78bfa'
                  }}
                >
                  {domainStatus.checking ? 'Checking...' : 'Check'}
                </button>
              </div>
              {domainStatus.message && (
                <p
                  className="mt-2 text-[13px]"
                  style={{
                    color: domainStatus.available ? '#86efac' : domainStatus.available === false ? '#f87171' : '#64748b'
                  }}
                >
                  {domainStatus.message}
                </p>
              )}
              <p className="mt-[6px] text-[13px]" style={{ color: '#64748b' }}>
                Lowercase letters, numbers, and hyphens only
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
