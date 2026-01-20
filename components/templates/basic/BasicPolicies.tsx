import { Policy } from '@/lib/templates/types';

interface BasicPoliciesProps {
  policies: Policy[];
}

export default function BasicPolicies({ policies }: BasicPoliciesProps) {
  if (policies.length === 0) {
    return null;
  }

  return (
    <section id="policies" className="basic-policies">
      <div className="basic-section-title">
        <h2>Policies</h2>
        <p>Important information for our services</p>
      </div>
      <div className="basic-policies__grid">
        {policies.map((policy) => (
          <div key={policy.id} className="basic-policy-item">
            <h4>
              {policy.icon && <span className="basic-policy-item__icon">{policy.icon}</span>}
              {policy.title}
            </h4>
            <p>{policy.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
