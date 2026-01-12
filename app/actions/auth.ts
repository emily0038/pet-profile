'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { generateUsername } from '@/utils/username'

// Added prevState to allow login to be null at initial state; maybe check back
export async function login(prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient()

  // Get form data
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Sign in with Supabase
  const { data: authData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  // Check if profile exists for this user
  if (authData.user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', authData.user.id)
      .single()

    // Create profile if it doesn't exist (first login after signup)
    if (!profile) {
      // Generate unique domain
      const domain = await generateUsername(
        authData.user.user_metadata.first_name || '',
        authData.user.user_metadata.last_name || '',
        authData.user.user_metadata.business
      )

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: authData.user.id,
          email: authData.user.email,
          first_name: authData.user.user_metadata.first_name,
          last_name: authData.user.user_metadata.last_name,
          phone_number: authData.user.user_metadata.phone_number,
          business_name: authData.user.user_metadata.business,
          domain: domain,
          accepts_cats: false,
          accepts_dogs: false,
        })

      if (profileError) {
        console.error('Failed to create profile:', profileError)
        // Don't block login if profile creation fails
      }
    }
  }

  revalidatePath('/', 'layout')
  redirect('/editor')
}

// New multi-step signup flow - Step 1: Basic info with email verification
export async function signupBasicInfo(prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string

  // Get the origin for the confirmation URL
  const origin = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  // Sign up with Supabase - email confirmation required
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
      emailRedirectTo: `${origin}/auth/callback`,
    }
  })

  if (error) {
    console.error('Signup error:', error)
    // Check if it's an email sending error
    if (error.message.includes('email') || error.message.includes('confirmation')) {
      return { error: 'Error sending confirmation email. Please check your email configuration in Supabase.' }
    }
    return { error: error.message }
  }

  // Log signup response for debugging
  console.log('Signup successful:', {
    userId: data.user?.id,
    email: data.user?.email,
    confirmationSent: data.user?.confirmation_sent_at,
    confirmed: data.user?.confirmed_at
  })

  // Redirect to verify email page
  redirect(`/signup/verify-email?email=${encodeURIComponent(email)}`)
}

// Resend verification email
export async function resendVerificationEmail(email: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email,
  })

  console.log('Resend verification email - Email:', email)
  console.log('Resend verification email - Data:', data)
  console.log('Resend verification email - Error:', error)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

// Check if domain is available
export async function checkDomainAvailability(domain: string): Promise<{ available: boolean; message: string }> {
  // Validate domain format
  const domainRegex = /^[a-z0-9-]+$/
  if (!domainRegex.test(domain)) {
    return { available: false, message: 'Domain can only contain lowercase letters, numbers, and hyphens' }
  }

  if (domain.length < 3) {
    return { available: false, message: 'Domain must be at least 3 characters' }
  }

  if (domain.length > 30) {
    return { available: false, message: 'Domain must be less than 30 characters' }
  }

  const supabase = await createClient()

  // Check if domain exists
  const { data, error } = await supabase
    .from('profiles')
    .select('domain')
    .eq('domain', domain)
    .maybeSingle()

  if (error) {
    console.error('Domain availability check error:', error)
    return { available: false, message: `Failed to check domain availability: ${error.message}` }
  }

  if (data) {
    return { available: false, message: 'This domain is already taken' }
  }

  return { available: true, message: '✓ Domain is available!' }
}

// Complete profile after email verification
export async function completeProfile(prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient()

  const businessName = formData.get('business_name') as string
  const phoneNumber = formData.get('phone_number') as string
  const domain = formData.get('domain') as string

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to complete your profile' }
  }

  // Validate domain availability one more time
  const domainCheck = await checkDomainAvailability(domain)
  if (!domainCheck.available) {
    return { error: domainCheck.message }
  }

  // Check if profile already exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (existingProfile) {
    // Update existing profile
    const { error } = await supabase
      .from('profiles')
      .update({
        business_name: businessName,
        phone_number: phoneNumber,
        domain: domain,
      })
      .eq('user_id', user.id)

    if (error) {
      return { error: error.message }
    }
  } else {
    // Create new profile
    const { error } = await supabase
      .from('profiles')
      .insert({
        user_id: user.id,
        email: user.email,
        first_name: user.user_metadata.first_name,
        last_name: user.user_metadata.last_name,
        business_name: businessName,
        phone_number: phoneNumber,
        domain: domain,
        accepts_cats: false,
        accepts_dogs: false,
      })

    if (error) {
      return { error: error.message }
    }
  }

  revalidatePath('/', 'layout')
  redirect('/editor')
}

// Legacy signup function - kept for backwards compatibility
export async function signup(prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient()

  // Get form data
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
        phone_number: formData.get('phone_number') as string,
        business: formData.get('business') as string,
      }
    }
  }

  // Sign up with Supabase
  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: error.message }
    }

  // Note: Profile will be created on first login due to RLS policies

  revalidatePath('/', 'layout')
  redirect('/login')  // Redirect to login page after signup
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
