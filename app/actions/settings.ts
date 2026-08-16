'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updatePersonalInfo(prevState: { error?: string; success?: boolean } | null, formData: FormData) {
  const supabase = await createClient()

  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string
  const email = formData.get('email') as string

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to update your profile' }
  }

  // Update user metadata (first_name, last_name)
  const { error: metadataError } = await supabase.auth.updateUser({
    data: {
      first_name: firstName,
      last_name: lastName,
    }
  })

  if (metadataError) {
    return { error: metadataError.message }
  }

  // Update profile table
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      first_name: firstName,
      last_name: lastName,
      email: email,
    })
    .eq('user_id', user.id)

  if (profileError) {
    return { error: profileError.message }
  }

  // If email changed, update auth email (will send verification)
  if (email !== user.email) {
    const { error: emailError } = await supabase.auth.updateUser({ email })
    if (emailError) {
      return { error: emailError.message }
    }
  }

  revalidatePath('/settings')
  return { success: true }
}

export async function updateBusinessInfo(prevState: { error?: string; success?: boolean } | null, formData: FormData) {
  const supabase = await createClient()

  const businessName = formData.get('business_name') as string
  const phoneNumber = formData.get('phone_number') as string

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to update your profile' }
  }

  // Update profile table
  const { error } = await supabase
    .from('profiles')
    .update({
      business_name: businessName,
      phone_number: phoneNumber,
    })
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/settings')
  return { success: true }
}

export async function updatePassword(prevState: { error?: string; success?: boolean } | null, formData: FormData) {
  const supabase = await createClient()

  const currentPassword = formData.get('current_password') as string
  const newPassword = formData.get('new_password') as string
  const confirmPassword = formData.get('confirm_password') as string

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !user.email) {
    return { error: 'You must be logged in to update your password' }
  }

  // Validate passwords match
  if (newPassword !== confirmPassword) {
    return { error: 'New passwords do not match' }
  }

  // Validate password length
  if (newPassword.length < 6) {
    return { error: 'Password must be at least 6 characters' }
  }

  // Verify current password by attempting to sign in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  })

  if (signInError) {
    return { error: 'Current password is incorrect' }
  }

  // Update password
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (updateError) {
    return { error: updateError.message }
  }

  return { success: true }
}

export async function updateGoogleAnalytics(prevState: { error?: string; success?: boolean } | null, formData: FormData) {
  const supabase = await createClient()

  const measurementId = (formData.get('google_measurement_id') as string)?.trim() || ''

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to update your settings' }
  }

  // Validate measurement ID format if provided (should be G-XXXXXXXXXX)
  if (measurementId && !/^G-[A-Z0-9]+$/i.test(measurementId)) {
    return { error: 'Invalid measurement ID format. It should look like G-XXXXXXXXXX' }
  }

  // Get profile to revalidate the correct path
  const { data: profile } = await supabase
    .from('profiles')
    .select('domain')
    .eq('user_id', user.id)
    .single()

  // Update profile table
  const { error } = await supabase
    .from('profiles')
    .update({
      google_measurement_id: measurementId || null,
    })
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/settings')
  if (profile?.domain) {
    revalidatePath(`/${profile.domain}`)
  }
  return { success: true }
}

export async function updateLlmsTxt(prevState: { error?: string; success?: boolean } | null, formData: FormData) {
  const supabase = await createClient()

  const content = (formData.get('llms_txt_content') as string) ?? ''

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to update your settings' }
  }

  // Get profile to revalidate the correct path
  const { data: profile } = await supabase
    .from('profiles')
    .select('domain')
    .eq('user_id', user.id)
    .single()

  // An empty/whitespace-only value clears the override and falls back to
  // the auto-generated version
  const { error } = await supabase
    .from('profiles')
    .update({
      llms_txt_content: content.trim() || null,
    })
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/settings')
  if (profile?.domain) {
    revalidatePath(`/${profile.domain}`)
    revalidatePath(`/${profile.domain}/llms.txt`)
  }
  return { success: true }
}
