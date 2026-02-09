'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { Subscription } from '@/lib/subscription';

const TRIAL_DURATION_DAYS = 30;

/**
 * Get the current user's subscription
 */
export async function getSubscription(): Promise<Subscription | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return subscription;
}

/**
 * Create a subscription for a new user
 * Called during signup process
 */
export async function createSubscription(
  userId: string,
  planType: 'free' | 'premium'
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const now = new Date();
  const trialEndsAt = new Date(now.getTime() + TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000);

  const subscriptionData = {
    user_id: userId,
    plan_type: planType,
    status: planType === 'premium' ? 'trial' : 'active',
    trial_started_at: planType === 'premium' ? now.toISOString() : null,
    trial_ends_at: planType === 'premium' ? trialEndsAt.toISOString() : null,
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
  };

  const { error } = await supabase.from('subscriptions').insert(subscriptionData);

  if (error) {
    console.error('Error creating subscription:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Start a premium trial for a free user
 * Can only be used once per account
 */
export async function startPremiumTrial(): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Not authenticated' };
  }

  // Get current subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (!subscription) {
    return { success: false, error: 'No subscription found' };
  }

  // Check if user has already used trial
  if (subscription.trial_started_at) {
    return { success: false, error: 'Trial has already been used' };
  }

  // Start the trial
  const now = new Date();
  const trialEndsAt = new Date(now.getTime() + TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000);

  const { error } = await supabase
    .from('subscriptions')
    .update({
      plan_type: 'premium',
      status: 'trial',
      trial_started_at: now.toISOString(),
      trial_ends_at: trialEndsAt.toISOString(),
      updated_at: now.toISOString(),
    })
    .eq('user_id', user.id);

  if (error) {
    console.error('Error starting trial:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/editor');
  revalidatePath('/settings');

  return { success: true };
}

/**
 * Switch user back to free plan
 * Used when trial expires or user downgrades
 */
export async function switchToFreePlan(): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Not authenticated' };
  }

  const { error } = await supabase
    .from('subscriptions')
    .update({
      plan_type: 'free',
      status: 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id);

  if (error) {
    console.error('Error switching to free plan:', error);
    return { success: false, error: error.message };
  }

  // Also update profile to use basic template
  await supabase
    .from('profiles')
    .update({
      template_id: 'basic',
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id);

  revalidatePath('/editor');
  revalidatePath('/settings');

  return { success: true };
}

/**
 * Record interest in upgrading to paid premium
 * Sends email notification to emily@petsfriendz.com
 */
export async function recordUpgradeInterest(): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Not authenticated' };
  }

  // Get user's profile for more context
  const { data: profile } = await supabase
    .from('profiles')
    .select('business_name, domain')
    .eq('user_id', user.id)
    .single();

  // Send email notification
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'emily@petsfriendz.com',
        subject: 'Premium Upgrade Interest',
        html: `
          <h2>A user is interested in upgrading to Premium!</h2>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Business Name:</strong> ${profile?.business_name || 'N/A'}</p>
          <p><strong>Domain:</strong> ${profile?.domain || 'N/A'}</p>
          <p><strong>User ID:</strong> ${user.id}</p>
        `,
      }),
    });
  } catch (error) {
    console.error('Error sending upgrade interest email:', error);
    // Don't fail the action if email fails
  }

  return { success: true };
}
