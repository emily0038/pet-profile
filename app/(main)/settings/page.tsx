'use client'

import { updatePersonalInfo, updateBusinessInfo, updatePassword, updateGoogleAnalytics } from '@/app/actions/settings'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import AppHeader from '@/components/appHeader'

interface ConfirmModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  title: string
  message: string
}

function ConfirmModal({ isOpen, onConfirm, onCancel, title, message }: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '400px',
        width: '90%',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', marginBottom: '12px' }}>
          {title}
        </h3>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '10px 24px',
              background: 'white',
              color: '#374151',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '10px 24px',
              background: '#9185FF',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    businessName: '',
    phoneNumber: '',
    domain: '',
    googleMeasurementId: '',
  })

  const [originalData, setOriginalData] = useState(userData)

  // Form state for each section
  const [personalForm, setPersonalForm] = useState({ firstName: '', lastName: '', email: '' })
  const [businessForm, setBusinessForm] = useState({ businessName: '', phoneNumber: '' })
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [analyticsForm, setAnalyticsForm] = useState({ googleMeasurementId: '' })

  // Error states
  const [personalErrors, setPersonalErrors] = useState<Record<string, string>>({})
  const [businessErrors, setBusinessErrors] = useState<Record<string, string>>({})
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({})
  const [analyticsErrors, setAnalyticsErrors] = useState<Record<string, string>>({})

  // Success states
  const [personalSuccess, setPersonalSuccess] = useState(false)
  const [businessSuccess, setBusinessSuccess] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [analyticsSuccess, setAnalyticsSuccess] = useState(false)

  // Saving states
  const [savingPersonal, setSavingPersonal] = useState(false)
  const [savingBusiness, setSavingBusiness] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [savingAnalytics, setSavingAnalytics] = useState(false)

  // Confirmation modal states
  const [personalModalOpen, setPersonalModalOpen] = useState(false)
  const [businessModalOpen, setBusinessModalOpen] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)


  useEffect(() => {
    async function fetchUserData() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, email, business_name, phone_number, domain, google_measurement_id')
          .eq('user_id', user.id)
          .single()

        console.log('Profile data:', profile)
        console.log('Profile error:', error)

        if (profile) {
          const data = {
            firstName: profile.first_name || '',
            lastName: profile.last_name || '',
            email: profile.email || user.email || '',
            businessName: profile.business_name || '',
            phoneNumber: profile.phone_number || '',
            domain: profile.domain || '',
            googleMeasurementId: profile.google_measurement_id || '',
          }
          console.log('Setting form data:', data)
          setUserData(data)
          setOriginalData(data)
          setPersonalForm({ firstName: data.firstName, lastName: data.lastName, email: data.email })
          setBusinessForm({ businessName: data.businessName, phoneNumber: data.phoneNumber })
          setAnalyticsForm({ googleMeasurementId: data.googleMeasurementId })
        }
      }
    }

    fetchUserData()
  }, [])

  // Check if forms have changes AND have valid data
  const hasPersonalChanges = (personalForm.firstName !== originalData.firstName ||
    personalForm.lastName !== originalData.lastName ||
    personalForm.email !== originalData.email) &&
    personalForm.firstName.trim() !== '' &&
    personalForm.lastName.trim() !== '' &&
    personalForm.email.trim() !== ''

  const hasBusinessChanges = (businessForm.businessName !== originalData.businessName ||
    businessForm.phoneNumber !== originalData.phoneNumber) &&
    businessForm.businessName.trim() !== '' &&
    businessForm.phoneNumber.trim() !== ''

  const hasPasswordChanges = passwordForm.currentPassword !== '' &&
    passwordForm.newPassword !== '' &&
    passwordForm.confirmPassword !== ''

  const hasAnalyticsChanges = analyticsForm.googleMeasurementId !== originalData.googleMeasurementId

  // Validation functions
  const validatePersonalInfo = () => {
    const errors: Record<string, string> = {}
    if (!personalForm.firstName.trim()) errors.firstName = 'First name is required'
    if (!personalForm.lastName.trim()) errors.lastName = 'Last name is required'
    if (!personalForm.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalForm.email)) errors.email = 'Invalid email format'
    setPersonalErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateBusinessInfo = () => {
    const errors: Record<string, string> = {}
    if (!businessForm.businessName.trim()) errors.businessName = 'Business name is required'
    if (!businessForm.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required'
    setBusinessErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validatePassword = () => {
    const errors: Record<string, string> = {}
    if (!passwordForm.currentPassword) errors.currentPassword = 'Current password is required'
    if (!passwordForm.newPassword) errors.newPassword = 'New password is required'
    else if (passwordForm.newPassword.length < 6) errors.newPassword = 'Password must be at least 6 characters'
    if (!passwordForm.confirmPassword) errors.confirmPassword = 'Please confirm your password'
    else if (passwordForm.newPassword !== passwordForm.confirmPassword) errors.confirmPassword = 'Passwords do not match'
    setPasswordErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Save handlers
  const handleSavePersonal = async () => {
    if (!validatePersonalInfo()) return
    setPersonalModalOpen(true)
  }

  const confirmSavePersonal = async () => {
    setPersonalModalOpen(false)
    setSavingPersonal(true)
    setPersonalSuccess(false)
    setPersonalErrors({})

    const formData = new FormData()
    formData.append('first_name', personalForm.firstName)
    formData.append('last_name', personalForm.lastName)
    formData.append('email', personalForm.email)

    const result = await updatePersonalInfo(null, formData)

    if (result?.error) {
      setPersonalErrors({ general: result.error })
    } else {
      setPersonalSuccess(true)
      setOriginalData({ ...originalData, firstName: personalForm.firstName, lastName: personalForm.lastName, email: personalForm.email })
      setTimeout(() => setPersonalSuccess(false), 3000)
    }

    setSavingPersonal(false)
  }

  const handleSaveBusiness = async () => {
    if (!validateBusinessInfo()) return
    setBusinessModalOpen(true)
  }

  const confirmSaveBusiness = async () => {
    setBusinessModalOpen(false)
    setSavingBusiness(true)
    setBusinessSuccess(false)
    setBusinessErrors({})

    const formData = new FormData()
    formData.append('business_name', businessForm.businessName)
    formData.append('phone_number', businessForm.phoneNumber)

    const result = await updateBusinessInfo(null, formData)

    if (result?.error) {
      setBusinessErrors({ general: result.error })
    } else {
      setBusinessSuccess(true)
      setOriginalData({ ...originalData, businessName: businessForm.businessName, phoneNumber: businessForm.phoneNumber })
      setTimeout(() => setBusinessSuccess(false), 3000)
    }

    setSavingBusiness(false)
  }

  const handleSavePassword = async () => {
    if (!validatePassword()) return
    setPasswordModalOpen(true)
  }

  const confirmSavePassword = async () => {
    setPasswordModalOpen(false)
    setSavingPassword(true)
    setPasswordSuccess(false)
    setPasswordErrors({})

    const formData = new FormData()
    formData.append('current_password', passwordForm.currentPassword)
    formData.append('new_password', passwordForm.newPassword)
    formData.append('confirm_password', passwordForm.confirmPassword)

    const result = await updatePassword(null, formData)

    if (result?.error) {
      setPasswordErrors({ general: result.error })
    } else {
      setPasswordSuccess(true)
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setPasswordSuccess(false), 3000)
    }

    setSavingPassword(false)
  }

  // Cancel handlers
  const cancelPersonalChanges = () => {
    setPersonalForm({ firstName: originalData.firstName, lastName: originalData.lastName, email: originalData.email })
    setPersonalErrors({})
    setPersonalSuccess(false)
  }

  const cancelBusinessChanges = () => {
    setBusinessForm({ businessName: originalData.businessName, phoneNumber: originalData.phoneNumber })
    setBusinessErrors({})
    setBusinessSuccess(false)
  }

  const cancelPasswordChanges = () => {
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setPasswordErrors({})
    setPasswordSuccess(false)
  }

  const handleSaveAnalytics = async () => {
    setSavingAnalytics(true)
    setAnalyticsSuccess(false)
    setAnalyticsErrors({})

    const formData = new FormData()
    formData.append('google_measurement_id', analyticsForm.googleMeasurementId)

    const result = await updateGoogleAnalytics(null, formData)

    if (result?.error) {
      setAnalyticsErrors({ general: result.error })
    } else {
      setAnalyticsSuccess(true)
      setOriginalData({ ...originalData, googleMeasurementId: analyticsForm.googleMeasurementId })
      setTimeout(() => setAnalyticsSuccess(false), 3000)
    }

    setSavingAnalytics(false)
  }

  const cancelAnalyticsChanges = () => {
    setAnalyticsForm({ googleMeasurementId: originalData.googleMeasurementId })
    setAnalyticsErrors({})
    setAnalyticsSuccess(false)
  }

  return (
    <>
      <AppHeader />
      <div className="min-h-screen bg-[#f8fafc] px-5 py-10">
        <div className="max-w-[800px] mx-auto">
          <div className="mb-8">
            <h1 className="text-[#0f172a] text-[32px] font-semibold mb-2">Account Settings</h1>
            <p className="text-[#64748b] text-[15px]">Manage your account information and preferences</p>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h2 className="text-[#1e293b] text-lg font-semibold mb-1">Personal Information</h2>
              <p className="text-[#64748b] text-sm">Update your personal details</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="firstName" className="block text-[#475569] text-sm font-medium mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={personalForm.firstName}
                    onChange={(e) => setPersonalForm({ ...personalForm, firstName: e.target.value })}
                    className="w-full bg-white border border-[#cbd5e1] rounded-lg px-[14px] py-[10px] text-[#0f172a] text-[15px] transition-all focus:outline-none focus:border-[#8b5cf6] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
                  />
                  {personalErrors.firstName && (
                    <div className="text-[#ef4444] text-xs mt-1">{personalErrors.firstName}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-[#475569] text-sm font-medium mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={personalForm.lastName}
                    onChange={(e) => setPersonalForm({ ...personalForm, lastName: e.target.value })}
                    className="w-full bg-white border border-[#cbd5e1] rounded-lg px-[14px] py-[10px] text-[#0f172a] text-[15px] transition-all focus:outline-none focus:border-[#8b5cf6] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
                  />
                  {personalErrors.lastName && (
                    <div className="text-[#ef4444] text-xs mt-1">{personalErrors.lastName}</div>
                  )}
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="block text-[#475569] text-sm font-medium mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={personalForm.email}
                  onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-[14px] py-[10px] text-[#0f172a] text-[15px] transition-all focus:outline-none focus:border-[#8b5cf6] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
                />
                {personalErrors.email && (
                  <div className="text-[#ef4444] text-xs mt-1">{personalErrors.email}</div>
                )}
                <div className="text-[#64748b] text-[13px] mt-[6px]">
                  We&apos;ll send a verification email if you change this
                </div>
              </div>

              {personalErrors.general && (
                <div className="text-[#ef4444] text-sm p-3 rounded-lg mb-5 bg-[#fef2f2] border border-[#fecaca]">
                  {personalErrors.general}
                </div>
              )}

              {personalSuccess && (
                <div className="text-[#15803d] text-sm p-3 rounded-lg mb-5 bg-[#dcfce7] border border-[#86efac]">
                  Personal information updated successfully
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
                <button
                  onClick={handleSavePersonal}
                  disabled={!hasPersonalChanges || savingPersonal}
                  className="btn-save"
                >
                  {savingPersonal ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={cancelPersonalChanges}
                  disabled={!hasPersonalChanges}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h2 className="text-[#1e293b] text-lg font-semibold mb-1">Business Information</h2>
              <p className="text-[#64748b] text-sm">Manage your business details</p>
            </div>
            <div className="p-6">
              <div className="mb-5">
                <label htmlFor="businessName" className="block text-[#475569] text-sm font-medium mb-2">
                  Business name
                </label>
                <input
                  type="text"
                  id="businessName"
                  value={businessForm.businessName}
                  onChange={(e) => setBusinessForm({ ...businessForm, businessName: e.target.value })}
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-[14px] py-[10px] text-[#0f172a] text-[15px] transition-all focus:outline-none focus:border-[#8b5cf6] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
                />
                {businessErrors.businessName && (
                  <div className="text-[#ef4444] text-xs mt-1">{businessErrors.businessName}</div>
                )}
              </div>

              <div className="mb-5">
                <label htmlFor="phone" className="block text-[#475569] text-sm font-medium mb-2">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={businessForm.phoneNumber}
                  onChange={(e) => setBusinessForm({ ...businessForm, phoneNumber: e.target.value })}
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-[14px] py-[10px] text-[#0f172a] text-[15px] transition-all focus:outline-none focus:border-[#8b5cf6] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
                />
                {businessErrors.phoneNumber && (
                  <div className="text-[#ef4444] text-xs mt-1">{businessErrors.phoneNumber}</div>
                )}
              </div>

              {businessErrors.general && (
                <div className="text-[#ef4444] text-sm p-3 rounded-lg mb-5 bg-[#fef2f2] border border-[#fecaca]">
                  {businessErrors.general}
                </div>
              )}

              {businessSuccess && (
                <div className="text-[#15803d] text-sm p-3 rounded-lg mb-5 bg-[#dcfce7] border border-[#86efac]">
                  Business information updated successfully
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
                <button
                  onClick={handleSaveBusiness}
                  disabled={!hasBusinessChanges || savingBusiness}
                  className="btn-save"
                >
                  {savingBusiness ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={cancelBusinessChanges}
                  disabled={!hasBusinessChanges}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Domain Settings */}
          <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h2 className="text-[#1e293b] text-lg font-semibold mb-1">Domain Settings</h2>
              <p className="text-[#64748b] text-sm">Manage your custom domain</p>
            </div>
            <div className="p-6">
              <div className="bg-[#fef3c7] border border-[#fcd34d] rounded-lg p-4 mb-5 flex gap-3">
                <svg className="w-5 h-5 text-[#d97706] flex-shrink-0 mt-[2px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-[#78350f] text-sm leading-relaxed">
                    Your domain is managed by Pets Friendz. To change your domain, please{' '}
                    <a href="mailto:support@petsfriendz.com" className="text-[#d97706] font-semibold hover:underline">
                      contact support
                    </a>.
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-[#475569] text-sm font-medium mb-2">Current domain</label>
                <input
                  type="text"
                  value={`${userData.domain}.petsfriendz.com`}
                  disabled
                  className="w-full bg-[#f1f5f9] border border-[#cbd5e1] rounded-lg px-[14px] py-[10px] text-[#94a3b8] text-[15px] cursor-not-allowed"
                />
                <div className="text-[#64748b] text-[13px] mt-[6px] flex items-center gap-[6px]">
                  <svg className="w-[14px] h-[14px] text-[#94a3b8]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Contact Pets Friendz to update this domain
                </div>
              </div>

            </div>
          </div>

          {/* Password */}
          <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h2 className="text-[#1e293b] text-lg font-semibold mb-1">Password</h2>
              <p className="text-[#64748b] text-sm">Update your password</p>
            </div>
            <div className="p-6">
              <div className="mb-5">
                <label htmlFor="currentPassword" className="block text-[#475569] text-sm font-medium mb-2">
                  Current password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  placeholder="Enter current password"
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-[14px] py-[10px] text-[#0f172a] text-[15px] transition-all focus:outline-none focus:border-[#8b5cf6] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)] placeholder:text-[#94a3b8]"
                />
                {passwordErrors.currentPassword && (
                  <div className="text-[#ef4444] text-xs mt-1">{passwordErrors.currentPassword}</div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="newPassword" className="block text-[#475569] text-sm font-medium mb-2">
                    New password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    placeholder="Enter new password"
                    className="w-full bg-white border border-[#cbd5e1] rounded-lg px-[14px] py-[10px] text-[#0f172a] text-[15px] transition-all focus:outline-none focus:border-[#8b5cf6] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)] placeholder:text-[#94a3b8]"
                  />
                  {passwordErrors.newPassword && (
                    <div className="text-[#ef4444] text-xs mt-1">{passwordErrors.newPassword}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-[#475569] text-sm font-medium mb-2">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    className="w-full bg-white border border-[#cbd5e1] rounded-lg px-[14px] py-[10px] text-[#0f172a] text-[15px] transition-all focus:outline-none focus:border-[#8b5cf6] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)] placeholder:text-[#94a3b8]"
                  />
                  {passwordErrors.confirmPassword && (
                    <div className="text-[#ef4444] text-xs mt-1">{passwordErrors.confirmPassword}</div>
                  )}
                </div>
              </div>

              <div className="text-[#64748b] text-[13px] mb-5">Must be at least 6 characters</div>

              {passwordErrors.general && (
                <div className="text-[#ef4444] text-sm p-3 rounded-lg mb-5 bg-[#fef2f2] border border-[#fecaca]">
                  {passwordErrors.general}
                </div>
              )}

              {passwordSuccess && (
                <div className="text-[#15803d] text-sm p-3 rounded-lg mb-5 bg-[#dcfce7] border border-[#86efac]">
                  Password updated successfully
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
                <button
                  onClick={handleSavePassword}
                  disabled={!hasPasswordChanges || savingPassword}
                  className="btn-save"
                >
                  {savingPassword ? 'Updating...' : 'Update password'}
                </button>
                <button
                  onClick={cancelPasswordChanges}
                  disabled={!hasPasswordChanges}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Google Analytics */}
          <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h2 className="text-[#1e293b] text-lg font-semibold mb-1">Google Analytics</h2>
              <p className="text-[#64748b] text-sm">Track visitors to your profile page</p>
            </div>
            <div className="p-6">
              <div className="mb-5">
                <label htmlFor="googleMeasurementId" className="block text-[#475569] text-sm font-medium mb-2">
                  Measurement ID
                </label>
                <input
                  type="text"
                  id="googleMeasurementId"
                  value={analyticsForm.googleMeasurementId}
                  onChange={(e) => setAnalyticsForm({ ...analyticsForm, googleMeasurementId: e.target.value })}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-[14px] py-[10px] text-[#0f172a] text-[15px] transition-all focus:outline-none focus:border-[#8b5cf6] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)] placeholder:text-[#94a3b8]"
                />
                <div className="text-[#64748b] text-[13px] mt-[6px]">
                  Find this in your Google Analytics account under Admin &gt; Data Streams &gt; Web
                </div>
              </div>

              {analyticsErrors.general && (
                <div className="text-[#ef4444] text-sm p-3 rounded-lg mb-5 bg-[#fef2f2] border border-[#fecaca]">
                  {analyticsErrors.general}
                </div>
              )}

              {analyticsSuccess && (
                <div className="text-[#15803d] text-sm p-3 rounded-lg mb-5 bg-[#dcfce7] border border-[#86efac]">
                  Google Analytics settings updated successfully
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
                <button
                  onClick={handleSaveAnalytics}
                  disabled={!hasAnalyticsChanges || savingAnalytics}
                  className="btn-save"
                >
                  {savingAnalytics ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={cancelAnalyticsChanges}
                  disabled={!hasAnalyticsChanges}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmModal
        isOpen={personalModalOpen}
        onConfirm={confirmSavePersonal}
        onCancel={() => setPersonalModalOpen(false)}
        title="Save Personal Information?"
        message="Are you sure you want to save these changes to your personal information?"
      />
      <ConfirmModal
        isOpen={businessModalOpen}
        onConfirm={confirmSaveBusiness}
        onCancel={() => setBusinessModalOpen(false)}
        title="Save Business Information?"
        message="Are you sure you want to save these changes to your business information?"
      />
      <ConfirmModal
        isOpen={passwordModalOpen}
        onConfirm={confirmSavePassword}
        onCancel={() => setPasswordModalOpen(false)}
        title="Update Password?"
        message="Are you sure you want to update your password?"
      />
    </>
  )
}
