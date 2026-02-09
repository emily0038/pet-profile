import Link from 'next/link';

export default function UpgradePage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-5"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      }}
    >
      <div className="w-full max-w-[500px] text-center">
        <div
          className="bg-white rounded-2xl p-10 shadow-lg"
          style={{ border: '1px solid #e2e8f0' }}
        >
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}
          >
            <span className="text-4xl">✨</span>
          </div>

          <h1
            className="text-3xl font-bold mb-3"
            style={{ color: '#1e293b' }}
          >
            Great to see you&apos;re enjoying the Premium plan!
          </h1>

          <p
            className="text-lg mb-6"
            style={{ color: '#64748b' }}
          >
            We&apos;ve received your upgrade request and will be in touch soon with Premium options.
          </p>

          <div
            className="rounded-xl p-5 mb-8"
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
            }}
          >
            <p className="text-sm font-medium mb-3" style={{ color: '#475569' }}>
              Premium includes:
            </p>
            <ul className="space-y-2 text-left">
              {[
                'All premium templates (Pro, Bubbly & more)',
                'Custom domain support',
                'Google Analytics integration',
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: '#64748b' }}
                >
                  <span style={{ color: '#8b5cf6' }}>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/editor"
              className="inline-block px-6 py-3 rounded-lg text-base font-medium transition-all"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
              }}
            >
              Back to Editor
            </Link>
            <Link
              href="/settings"
              className="inline-block text-sm font-medium transition-all"
              style={{ color: '#64748b' }}
            >
              View Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
