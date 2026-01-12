import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createClient()

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      // Redirect to signup with error
      return NextResponse.redirect(new URL('/signup?error=verification_failed', requestUrl.origin))
    }

    // Check if user has completed their profile
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, domain')
        .eq('user_id', user.id)
        .single()

      // If profile doesn't exist or domain is null, redirect to complete profile
      if (!profile || !profile.domain) {
        return NextResponse.redirect(new URL('/auth/complete-profile', requestUrl.origin))
      }

      // Profile is complete, redirect to editor
      return NextResponse.redirect(new URL('/editor', requestUrl.origin))
    }
  }

  // If no code, redirect to signup
  return NextResponse.redirect(new URL('/signup', requestUrl.origin))
}
