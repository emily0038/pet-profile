'use server'

import { createClient } from '@/utils/supabase/server'

export async function joinWaitlist(name: string, email: string) {
  const supabase = await createClient()

  try {
    // Insert into waitlist table
    const { error } = await supabase
      .from('waitlist')
      .insert({
        name,
        email,
      })

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        return {
          success: false,
          error: 'This email is already on the waitlist.'
        }
      }

      throw error
    }

    return {
      success: true,
      error: null
    }
  } catch (error) {
    console.error('Error joining waitlist:', error)
    return {
      success: false,
      error: 'Failed to join waitlist. Please try again.'
    }
  }
}
