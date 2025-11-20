import { createClient } from '@/utils/supabase/server'

/**
 * Generates a URL-safe slug from a string
 * Removes symbols, replaces spaces with hyphens, converts to lowercase
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove all symbols except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

/**
 * Checks if a username exists in the database
 */
async function usernameExists(username: string): Promise<boolean> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', username)
    .single()

  return !!data
}

/**
 * Generates a unique username based on business name or first name + last initial
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @param business - User's business name (optional)
 * @returns A unique username
 */
export async function generateUsername(
  firstName: string,
  lastName: string,
  business?: string
): Promise<string> {
  let baseUsername: string

  if (business && business.trim()) {
    // Use business name
    baseUsername = slugify(business)
  } else {
    // Use first name + last initial
    const lastInitial = lastName.charAt(0).toLowerCase()
    baseUsername = slugify(`${firstName}${lastInitial}`)
  }

  // Check if base username is available
  let username = baseUsername
  let counter = 1

  while (await usernameExists(username)) {
    username = `${baseUsername}-${counter}`
    counter++
  }

  return username
}

/**
 * Formats a username for display with @ symbol
 * @param username - The username to format
 * @returns Username with @ prefix (e.g., "@emilys-pampered-pups")
 */
export function formatUsername(username: string): string {
  return `@${username}`
}
