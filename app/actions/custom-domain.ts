'use server';

import { createClient } from '@/utils/supabase/server';
import { addDomainToVercel, checkDomainStatus, removeDomainFromVercel } from '@/lib/vercel-domains';
import { revalidatePath } from 'next/cache';

interface AddDomainResult {
  success: boolean;
  error?: string;
}

interface VerifyDomainResult {
  verified: boolean;
  error?: string;
  needsCname?: boolean;
  cnameTarget?: string;
}

interface RemoveDomainResult {
  success: boolean;
  error?: string;
}

/**
 * Add a custom domain for the authenticated user
 */
export async function addCustomDomain(domain: string): Promise<AddDomainResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Not authenticated' };
  }

  // Normalize domain to lowercase
  domain = domain.toLowerCase().trim();

  // Validate domain format (must start with www)
  if (!domain.startsWith('www.')) {
    return { success: false, error: 'Domain must start with www (e.g., www.yourdomain.com)' };
  }

  // Basic domain validation
  const domainRegex = /^www\.[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}$/i;
  if (!domainRegex.test(domain)) {
    return { success: false, error: 'Invalid domain format' };
  }

  // Check if user already has a custom domain
  const { data: existingUserDomain } = await supabase
    .from('custom_domains')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (existingUserDomain) {
    return { success: false, error: 'You already have a custom domain connected. Please remove it first.' };
  }

  // Check if domain is already connected to another account
  const { data: existingDomain } = await supabase
    .from('custom_domains')
    .select('id')
    .eq('domain', domain)
    .maybeSingle();

  if (existingDomain) {
    return { success: false, error: 'This domain is already connected to another account' };
  }

  try {
    // Add domain to Vercel
    await addDomainToVercel(domain);

    // Store in database
    const { error: dbError } = await supabase
      .from('custom_domains')
      .insert({
        user_id: user.id,
        domain,
        status: 'pending',
      });

    if (dbError) {
      // If database insert fails, try to clean up Vercel
      try {
        await removeDomainFromVercel(domain);
      } catch (cleanupError) {
        console.error('Failed to cleanup Vercel domain after DB error:', cleanupError);
      }
      throw dbError;
    }

    revalidatePath('/account/custom-domain');
    return { success: true };
  } catch (error: unknown) {
    console.error('Add custom domain error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to add domain';
    return { success: false, error: errorMessage };
  }
}

/**
 * Verify a custom domain's DNS configuration
 */
export async function verifyCustomDomain(domain: string): Promise<VerifyDomainResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { verified: false, error: 'Not authenticated' };
  }

  try {
    // Check status with Vercel
    const status = await checkDomainStatus(domain);

    const isVerified = status.verified === true;

    // Update database based on verification status
    if (isVerified) {
      await supabase
        .from('custom_domains')
        .update({
          status: 'active',
          verified_at: new Date().toISOString(),
          error_message: null,
        })
        .eq('domain', domain)
        .eq('user_id', user.id);

      revalidatePath('/account/custom-domain');

      return { verified: true };
    } else {
      // Domain not verified yet - check if it needs CNAME
      const cnameRecord = status.verification?.find(v => v.type === 'CNAME');

      await supabase
        .from('custom_domains')
        .update({
          status: 'verifying',
        })
        .eq('domain', domain)
        .eq('user_id', user.id);

      revalidatePath('/account/custom-domain');

      return {
        verified: false,
        needsCname: !!cnameRecord,
        cnameTarget: cnameRecord?.value,
      };
    }
  } catch (error: unknown) {
    console.error('Verify custom domain error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to verify domain';

    // Update database with error
    await supabase
      .from('custom_domains')
      .update({
        status: 'error',
        error_message: errorMessage,
      })
      .eq('domain', domain)
      .eq('user_id', user.id);

    revalidatePath('/account/custom-domain');

    return { verified: false, error: errorMessage };
  }
}

/**
 * Remove a custom domain
 */
export async function removeCustomDomain(domain: string): Promise<RemoveDomainResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    // Remove from Vercel first
    await removeDomainFromVercel(domain);

    // Then remove from database
    const { error: dbError } = await supabase
      .from('custom_domains')
      .delete()
      .eq('domain', domain)
      .eq('user_id', user.id);

    if (dbError) throw dbError;

    revalidatePath('/account/custom-domain');
    return { success: true };
  } catch (error: unknown) {
    console.error('Remove custom domain error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to remove domain';
    return { success: false, error: errorMessage };
  }
}

/**
 * Get the current user's custom domain
 */
export async function getCurrentCustomDomain() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('custom_domains')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Get custom domain error:', error);
    return null;
  }

  return data;
}
