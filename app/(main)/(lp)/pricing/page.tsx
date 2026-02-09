import Link from 'next/link';
import PublicHeader from '@/components/publicHeader';
import Footer from '@/components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - Pets Friendz',
  description: 'Choose the plan that works for you. Start free or unlock premium features with a 30-day trial.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <PublicHeader />

      {/* Hero Section */}
      <section
        className="text-center"
        style={{
          padding: '5rem 2rem 3rem',
          background: 'linear-gradient(to bottom, #F9FAFB 0%, white 100%)',
        }}
      >
        <h1
          className="font-slab"
          style={{
            fontSize: '3rem',
            fontWeight: 700,
            color: '#000000',
            lineHeight: 1.2,
            marginBottom: '1rem',
          }}
        >
          Plans & Pricing
        </h1>
        <p className="text-xl text-gray-700 mb-10 max-w-[700px] mx-auto font-flex">
          We offer two plans to accommodate all types of pet care providers
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-4xl mx-auto px-8 py-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-lg p-10 border-2 border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
            <h2 className="font-slab text-2xl font-bold text-center mb-4">Free (Always!)</h2>
            <div className="font-slab text-5xl font-bold text-center mb-8 text-black">$0</div>

            <ul className="mb-8 space-y-3">
              {[
                'Basic template',
                'Custom subdomain',
                'Fast, built-in hosting',
                'User-friendly editing',
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-base">
                  <span className="text-black font-bold text-xl flex-shrink-0">&#10003;</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/signup?plan=free"
              className="block w-full py-3.5 px-6 rounded text-center font-medium text-base bg-[#E4E1FF] text-black hover:bg-[#9185FF] hover:text-white transition-all"
            >
              Start Plan
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-b from-[#F9FAFB] to-white rounded-lg p-10 border-2 border-[#9185FF] hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
            <h2 className="font-slab text-2xl font-bold text-center mb-4">Premium</h2>
            <div className="font-slab text-5xl font-bold text-center mb-8 text-black">
              $5<span className="text-lg text-gray-500">/month</span>
            </div>

            <ul className="mb-8 space-y-3">
              {[
                'Basic template',
                'Premium templates',
                'Custom subdomain',
                'Custom domain connection',
                'Fast, built-in hosting',
                'User-friendly editing',
                'GA4 setup',
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-base">
                  <span className="text-[#9185FF] font-bold text-xl flex-shrink-0">&#10003;</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/signup?plan=premium"
              className="block w-full py-3.5 px-6 rounded text-center font-medium text-base bg-[#9185FF] text-white hover:bg-[#5B4FC6] transition-all"
            >
              Try Free for 30 Days
            </Link>
            <p className="text-center text-sm text-gray-500 mt-3">No card required</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
