'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Subscription, getTrialDaysRemaining, formatTrialEndDate, isTrialActive } from '@/lib/subscription';
import { recordUpgradeInterest } from '@/app/actions/subscription';

interface TrialBannerProps {
  subscription: Subscription | null;
}

export default function TrialBanner({ subscription }: TrialBannerProps) {
  const router = useRouter();
  const [isUpgrading, setIsUpgrading] = useState(false);

  const isOnTrial = subscription && isTrialActive(subscription);
  const daysRemaining = getTrialDaysRemaining(subscription);
  const endDate = formatTrialEndDate(subscription);

  // Only show for users on active trial
  if (!isOnTrial) {
    return null;
  }

  const handleUpgradeClick = async () => {
    setIsUpgrading(true);
    try {
      await recordUpgradeInterest();
      router.push('/upgrade');
    } catch (error) {
      console.error('Failed to record upgrade interest:', error);
      setIsUpgrading(false);
    }
  };

  return (
    <div
      className="w-full py-3 px-4"
      style={{
        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <p className="text-white text-sm text-center sm:text-left">
          <span className="font-semibold">{daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left</span>
          {' '}in your Premium trial
          <span className="hidden sm:inline"> • </span>
          <span className="block sm:inline text-white/80">Enjoy all features until {endDate}</span>
        </p>
        <button
          onClick={handleUpgradeClick}
          disabled={isUpgrading}
          className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white/20 disabled:opacity-50"
          style={{
            background: 'transparent',
            border: '1.5px solid rgba(255, 255, 255, 0.8)',
            color: 'white',
          }}
        >
          {isUpgrading ? 'Processing...' : 'Upgrade Your Account'}
        </button>
      </div>
    </div>
  );
}
