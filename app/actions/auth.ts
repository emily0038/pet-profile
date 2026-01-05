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

// Added prevState to allow signup to be null at initial state; maybe check back
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
