'use client';

import { useState } from 'react';
import { addCustomDomain, verifyCustomDomain, removeCustomDomain } from '@/app/actions/custom-domain';

interface CustomDomain {
  id: string;
  domain: string;
  status: string;
  verified_at: string | null;
  error_message: string | null;
  created_at: string;
}

interface CustomDomainManagerProps {
  initialDomain: CustomDomain | null;
}

export default function CustomDomainManager({ initialDomain }: CustomDomainManagerProps) {
  const [domain, setDomain] = useState(initialDomain);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddDomain = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    const result = await addCustomDomain(inputValue);

    setLoading(false);

    if (result.success) {
      setSuccess('Domain added successfully! Please follow the instructions below to verify.');
      setInputValue('');
      // Refresh to get the new domain
      window.location.reload();
    } else {
      setError(result.error || 'Failed to add domain');
    }
  };

  const handleVerify = async () => {
    if (!domain) return;

    setError(null);
    setSuccess(null);
    setVerifying(true);

    const result = await verifyCustomDomain(domain.domain);

    setVerifying(false);

    if (result.verified) {
      setSuccess('Domain verified successfully! Your custom domain is now active.');
      // Refresh to get updated status
      window.location.reload();
    } else if (result.error) {
      setError(result.error);
    } else {
      setError('Domain not yet verified. Please ensure the CNAME record is correctly configured and try again in a few minutes.');
    }
  };

  const handleRemove = async () => {
    if (!domain) return;

    if (!confirm(`Are you sure you want to remove ${domain.domain}?`)) {
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    const result = await removeCustomDomain(domain.domain);

    setLoading(false);

    if (result.success) {
      setSuccess('Domain removed successfully');
      setDomain(null);
    } else {
      setError(result.error || 'Failed to remove domain');
    }
  };

  // If no domain exists, show add domain form
  if (!domain) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Add Custom Domain</h2>
        <p className="text-gray-600 mb-6">
          Connect your own domain to your Pets Friendz profile. Note: Only www subdomains are supported (e.g., www.yourdomain.com).
        </p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
            {success}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
              Domain
            </label>
            <input
              type="text"
              id="domain"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="www.yourdomain.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            />
            <p className="mt-1 text-sm text-gray-500">
              Must start with www (e.g., www.yourdomain.com)
            </p>
          </div>

          <button
            onClick={handleAddDomain}
            disabled={loading || !inputValue}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Adding...' : 'Add Domain'}
          </button>
        </div>
      </div>
    );
  }

  // Domain exists - show status and instructions
  const isActive = domain.status === 'active';
  const isPending = domain.status === 'pending' || domain.status === 'verifying';

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{domain.domain}</h2>
            <div className="flex items-center gap-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  isActive
                    ? 'bg-green-100 text-green-800'
                    : isPending
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {isActive ? 'Active' : isPending ? 'Pending Verification' : 'Error'}
              </span>
            </div>
          </div>
          <button
            onClick={handleRemove}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Remove Domain
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
            {success}
          </div>
        )}

        {domain.error_message && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
            <strong>Error:</strong> {domain.error_message}
          </div>
        )}

        {isActive && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800">
              Your custom domain is active! Your profile is now accessible at{' '}
              <a
                href={`https://${domain.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                {domain.domain}
              </a>
            </p>
          </div>
        )}
      </div>

      {/* DNS Instructions (show if not active) */}
      {!isActive && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-semibold mb-4">DNS Configuration</h3>
          <p className="text-gray-600 mb-6">
            Add the following DNS record at your domain registrar to verify your domain:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Type</p>
                  <p className="font-mono bg-white px-3 py-2 rounded border border-gray-300">CNAME</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Name</p>
                  <p className="font-mono bg-white px-3 py-2 rounded border border-gray-300">www</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Value</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono bg-white px-3 py-2 rounded border border-gray-300 flex-1">
                      cname.vercel-dns.com
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('cname.vercel-dns.com');
                        setSuccess('Copied to clipboard!');
                        setTimeout(() => setSuccess(null), 2000);
                      }}
                      className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">TTL</p>
                <p className="text-gray-600">Auto (or 3600)</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> DNS changes can take anywhere from a few minutes to 48 hours to
              propagate, though it&apos;s usually much faster (1-5 minutes).
            </p>
          </div>

          <button
            onClick={handleVerify}
            disabled={verifying}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {verifying ? 'Verifying...' : 'Verify DNS Configuration'}
          </button>
        </div>
      )}
    </div>
  );
}
