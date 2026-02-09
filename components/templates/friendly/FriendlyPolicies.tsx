'use client';

import { Policy } from '@/lib/templates/types';

interface FriendlyPoliciesProps {
  policies: Policy[];
}

export default function FriendlyPolicies({ policies }: FriendlyPoliciesProps) {
  if (!policies || policies.length === 0) return null;

  return (
    <section className="friendly-policies">
      <div className="friendly-policies-header">
        <h2>Our Policies</h2>
        <p>Important information before you book a service</p>
      </div>
      <div className="friendly-policies-grid">
        {policies.map((policy) => (
          <div key={policy.id} className="friendly-policy-item">
            <h4>{policy.icon} {policy.title}</h4>
            <p>{policy.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
