/**
 * URL utilities for handling subdomain vs path-based routing
 */

/**
 * Determines if subdomains are enabled based on environment
 */
export function isSubdomainsEnabled(): boolean {
  // Check explicit flag first
  if (process.env.ENABLE_SUBDOMAINS !== undefined) {
    return process.env.ENABLE_SUBDOMAINS === 'true'
  }

  // Fallback: enable subdomains only in production
  return process.env.NODE_ENV === 'production'
}

/**
 * Get the base domain without protocol
 */
export function getRootDomain(): string {
  return process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'petsfriendz.com'
}

/**
 * Get the full base URL with protocol
 */
export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://petsfriendz.com'
}

/**
 * Generates the correct profile URL based on environment
 * @param username - The profile's domain/username slug
 * @returns Full URL to the profile
 */
export function getProfileUrl(username: string): string {
  if (isSubdomainsEnabled()) {
    // Production: subdomain routing
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const rootDomain = getRootDomain()
    return `${protocol}://${username}.${rootDomain}`
  } else {
    // Local dev: path-based routing
    const baseUrl = getBaseUrl()
    return `${baseUrl}/${username}`
  }
}

/**
 * Generates the correct profile path for router.push
 * @param username - The profile's domain/username slug
 * @returns Path for Next.js navigation
 */
export function getProfilePath(username: string): string {
  if (isSubdomainsEnabled()) {
    // For subdomain routing, use full URL
    return getProfileUrl(username)
  } else {
    // For path-based routing, use relative path
    return `/${username}`
  }
}
