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

  // Protected routes
  if (pathname.startsWith('/editor')) {
    if (!user) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect authenticated users away from login/signup
  if (pathname === '/login' || pathname === '/signup') {
    if (user) {
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
