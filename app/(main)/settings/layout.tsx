import { getSubscription } from '@/app/actions/subscription';
import TrialBanner from '@/components/TrialBanner';

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const subscription = await getSubscription();

  return (
    <div className="min-h-screen flex flex-col">
      <TrialBanner subscription={subscription} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
