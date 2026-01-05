import { Policy } from '@/lib/templates/types';

interface ProPoliciesProps {
  policies: Policy[];
}

// Policy template mapping - maps policy.icon (template id) to display info
const POLICY_TEMPLATES: Record<string, { emoji: string; title: string }> = {
  meetgreet: { emoji: '🤝', title: 'Meet & Greet' },
  payment: { emoji: '💳', title: 'Payment' },
  health: { emoji: '🏥', title: 'Health & Safety' },
  bookings: { emoji: '📅', title: 'Bookings & Cancellations' },
  weather: { emoji: '🌧️', title: 'Inclement Weather' },
  access: { emoji: '🔑', title: 'Home Access & Security' },
};

export default function ProPolicies({ policies }: ProPoliciesProps) {
  const populatedPolicies = policies.filter(
    (policy) => policy.description && policy.description.trim() !== ''
  );

  if (populatedPolicies.length === 0) {
    return null;
  }

  return (
    <section className="section section-bg-white">
      <div className="section-header">
        <h2>Policies</h2>
        <p>What to know about my services and policies before you book</p>
      </div>
      <div className="section-container" style={{ maxWidth: '1000px' }}>
        {populatedPolicies.map((policy) => {
          const template = POLICY_TEMPLATES[policy.icon];

          return (
            <div
              key={policy.id}
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '15px',
                marginBottom: '2rem',
                boxShadow: '0 4px 20px var(--shadow)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.5rem',
                  color: 'var(--primary)',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <span
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'var(--accent)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0,
                  }}
                >
                  {template?.emoji || '📋'}
                </span>
                {template?.title || policy.title}
              </h3>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{policy.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
