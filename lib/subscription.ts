export interface Subscription {
  id: string;
  user_id: string;
  plan_type: 'free' | 'premium';
  status: 'active' | 'trial' | 'expired' | 'cancelled';
  trial_started_at: string | null;
  trial_ends_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Check if user has premium access (either paid or on active trial)
 */
export function isPremiumUser(subscription: Subscription | null): boolean {
  if (!subscription) return false;

  if (subscription.plan_type === 'premium') {
    return subscription.status === 'active' || subscription.status === 'trial';
  }

  return false;
}

/**
 * Check if user is currently on an active trial
 */
export function isTrialActive(subscription: Subscription | null): boolean {
  if (!subscription) return false;

  if (subscription.status !== 'trial') return false;
  if (!subscription.trial_ends_at) return false;

  return new Date(subscription.trial_ends_at) > new Date();
}

/**
 * Check if user can use premium features
 * Same as isPremiumUser but with trial expiration check
 */
export function canUsePremiumFeatures(subscription: Subscription | null): boolean {
  if (!subscription) return false;

  if (subscription.plan_type === 'premium') {
    if (subscription.status === 'active') return true;
    if (subscription.status === 'trial') {
      return isTrialActive(subscription);
    }
  }

  return false;
}

/**
 * Get number of days remaining in trial
 * Returns 0 if not on trial or trial expired
 */
export function getTrialDaysRemaining(subscription: Subscription | null): number {
  if (!subscription || !subscription.trial_ends_at) return 0;
  if (subscription.status !== 'trial') return 0;

  const endDate = new Date(subscription.trial_ends_at);
  const now = new Date();

  if (endDate <= now) return 0;

  const diffMs = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Format trial end date for display
 * Returns formatted date string like "March 1, 2026"
 */
export function formatTrialEndDate(subscription: Subscription | null): string {
  if (!subscription || !subscription.trial_ends_at) return '';

  const endDate = new Date(subscription.trial_ends_at);

  return endDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Check if user has already used their trial
 * (trial can only be used once per account)
 */
export function hasUsedTrial(subscription: Subscription | null): boolean {
  if (!subscription) return false;
  return subscription.trial_started_at !== null;
}

/**
 * Check if user is on free plan
 */
export function isFreePlan(subscription: Subscription | null): boolean {
  if (!subscription) return true; // No subscription = free
  return subscription.plan_type === 'free';
}

/**
 * Get display name for current plan
 */
export function getPlanDisplayName(subscription: Subscription | null): string {
  if (!subscription) return 'Free';

  if (subscription.plan_type === 'free') return 'Free';

  if (subscription.plan_type === 'premium') {
    if (subscription.status === 'trial') return 'Premium Trial';
    if (subscription.status === 'active') return 'Premium';
    if (subscription.status === 'expired') return 'Premium (Expired)';
    if (subscription.status === 'cancelled') return 'Premium (Cancelled)';
  }

  return 'Free';
}
