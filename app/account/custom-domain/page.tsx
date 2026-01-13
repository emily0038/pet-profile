import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getCurrentCustomDomain } from '@/app/actions/custom-domain';
import CustomDomainManager from '@/components/account/CustomDomainManager';

export default async function CustomDomainPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get current custom domain if any
  const customDomain = await getCurrentCustomDomain();

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1a2332 0%, #0f1419 100%)' }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Custom Domain</h1>
          <p className="text-gray-400">
            Connect your own domain to your Pets Friendz profile
          </p>
        </div>

        <CustomDomainManager initialDomain={customDomain} />
      </div>
    </div>
  );
}
