import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Extract subdomain from hostname
 * Returns null if no subdomain or if it's a reserved subdomain
 */
function getSubdomain(hostname: string): string | null {
  // Reserved subdomains that should not be treated as profile subdomains
  const RESERVED_SUBDOMAINS = ['www', 'api', 'app', 'admin', 'blog']

  // Get root domain from environment
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'petsfriendz.com'

  // Remove root domain to get subdomain
  const subdomain = hostname.replace(`.${rootDomain}`, '').replace(rootDomain, '')

  // Return null if no subdomain or if it's reserved
  if (!subdomain || subdomain === hostname || RESERVED_SUBDOMAINS.includes(subdomain)) {
    return null
  }

  return subdomain
}

/**
 * Check if subdomains are enabled
 */
function isSubdomainsEnabled(): boolean {
  if (process.env.ENABLE_SUBDOMAINS !== undefined) {
    return process.env.ENABLE_SUBDOMAINS === 'true'
  }
  return process.env.NODE_ENV === 'production'
}

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const { pathname } = request.nextUrl

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ============================================
  // CUSTOM DOMAIN ROUTING LOGIC
  // ============================================

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'petsfriendz.com'
  const isCustomDomain = !hostname.includes(rootDomain) &&
                         !hostname.includes('localhost') &&
                         !hostname.includes('vercel.app')

  if (isCustomDomain) {
    // Don't process if it's hitting a special route (API, _next, etc.)
    if (
      pathname.startsWith('/api') ||
      pathname.startsWith('/_next') ||
      pathname.startsWith('/static') ||
      pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp)$/)
    ) {
      return supabaseResponse
    }

    // Log for debugging
    console.log('Custom domain request - Hostname:', hostname, 'Pathname:', pathname)

    // Look up the custom domain in our database
    const { data: customDomainData, error: lookupError } = await supabase
      .from('custom_domains')
      .select('user_id')
      .eq('domain', hostname)
      .eq('status', 'active')
      .maybeSingle()

    console.log('Custom domain lookup result:', { customDomainData, lookupError })

    if (customDomainData) {
      // Get the profile domain for this user
      const { data: profile } = await supabase
        .from('profiles')
        .select('domain')
        .eq('user_id', customDomainData.user_id)
        .single()

      if (profile?.domain) {
        // Rewrite custom domain -> /[username]
        const rewriteUrl = request.nextUrl.clone()
        // If pathname is root, just use /{username}, otherwise append the path
        rewriteUrl.pathname = pathname === '/' ? `/${profile.domain}` : `/${profile.domain}${pathname}`

        return NextResponse.rewrite(rewriteUrl, { request: supabaseResponse })
      }
    }

    // Custom domain not found or not active - return 404
    return new NextResponse('Domain not found', { status: 404 })
  }

  // ============================================
  // SUBDOMAIN ROUTING LOGIC
  // ============================================

  if (isSubdomainsEnabled()) {
    const subdomain = getSubdomain(hostname)

    // If we have a subdomain, this is a profile request
    if (subdomain) {
      // Don't process if it's hitting a special route (API, _next, etc.)
      if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp)$/)
      ) {
        return supabaseResponse
      }

      // Rewrite subdomain.domain.com -> domain.com/[username]
      // This allows the existing [username] route to handle the request
      const rewriteUrl = request.nextUrl.clone()
      rewriteUrl.pathname = `/${subdomain}${pathname}`

      // Return rewritten response
      return NextResponse.rewrite(rewriteUrl, { request: supabaseResponse })
    }

    // No subdomain - check if this is an old path-based URL that needs redirecting
    // Match pattern: /[username] where username doesn't start with special prefixes
    const usernameMatch = pathname.match(/^\/([a-z0-9-]+)$/)

    if (usernameMatch) {
      const username = usernameMatch[1]

      // Reserved paths that should NOT be redirected
      const RESERVED_PATHS = [
        'editor', 'login', 'signup', 'blog', 'about', 'contact',
        'privacy', 'terms', 'waitlist', 'get-involved', 'api'
      ]

      if (!RESERVED_PATHS.includes(username)) {
        // This looks like an old profile URL - redirect to subdomain
        const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'petsfriendz.com'
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
        const redirectUrl = `${protocol}://${username}.${rootDomain}`

        // 301 Permanent Redirect for SEO
        return NextResponse.redirect(redirectUrl, { status: 301 })
      }
    }
  }

  // ============================================
  // EXISTING AUTH LOGIC
  // ============================================

  // Protected routes that require authentication AND complete profile
  const protectedPaths = ['/editor', '/settings']
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath) {
    if (!user) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check if profile is complete (has required fields)
    const { data: profile } = await supabase
      .from('profiles')
      .select('business_name, phone_number, domain')
      .eq('user_id', user.id)
      .single()

    const isProfileComplete = profile &&
      profile.business_name &&
      profile.phone_number &&
      profile.domain

    // Redirect to complete-profile if profile is incomplete
    // But allow access to complete-profile page itself
    if (!isProfileComplete && pathname !== '/auth/complete-profile') {
      return NextResponse.redirect(new URL('/auth/complete-profile', request.url))
    }
  }

  // Redirect authenticated users away from login/signup
  if (pathname === '/login' || pathname === '/signup') {
    if (user) {
      return NextResponse.redirect(new URL('/editor', request.url))
    }
  }

  // Redirect authenticated users with complete profiles away from complete-profile
  if (pathname === '/auth/complete-profile' && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('business_name, phone_number, domain')
      .eq('user_id', user.id)
      .single()

    const isProfileComplete = profile &&
      profile.business_name &&
      profile.phone_number &&
      profile.domain

    if (isProfileComplete) {
      return NextResponse.redirect(new URL('/editor', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
