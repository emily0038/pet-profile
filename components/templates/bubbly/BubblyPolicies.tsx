'use client';

import { Policy } from '@/lib/templates/types';

interface BubblyPoliciesProps {
  policies: Policy[];
}

export default function BubblyPolicies({ policies }: BubblyPoliciesProps) {
  const populatedPolicies = policies.filter(
  (policy) => policy.description && policy.description.trim() !== ''
  );

  if (populatedPolicies.length === 0) {
    return null;
  }

  return (
    <section
      id="policies"
      style={{
        padding: '100px 24px',
        background: 'var(--bubbly-bg-white)',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '42px',
            fontWeight: 700,
            marginBottom: '16px',
            color: 'var(--bubbly-text-dark)',
            textAlign: 'center',
          }}
        >
          My Policies
        </h2>
        <p
          style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '60px',
            textAlign: 'center',
          }}
        >
          Important information to know before booking
        </p>

        <div
          style={{
            background: 'var(--bubbly-cream)',
            padding: '48px',
            borderRadius: '32px',
            border: '4px solid white',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          }}
        >
          {populatedPolicies.map((policy, index) => (
            <div
              key={policy.id}
              style={{
                marginBottom: index < populatedPolicies.length - 1 ? '32px' : '0',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '22px',
                  fontWeight: 700,
                  color: 'var(--bubbly-primary)',
                  marginBottom: '12px',
                }}
              >
                {policy.title}
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: 'var(--bubbly-text-dark)',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line',
                }}
              >
                {policy.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
