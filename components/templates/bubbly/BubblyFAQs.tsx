'use client';

import { FAQ } from '@/lib/templates/types';

interface BubblyFAQsProps {
  faqs: FAQ[];
}

export default function BubblyFAQs({ faqs }: BubblyFAQsProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section
      id="faq"
      style={{
        padding: '100px 24px',
        background: 'linear-gradient(135deg, var(--bubbly-cream) 0%, var(--bubbly-bg-white) 100%)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '42px',
            fontWeight: 700,
            marginBottom: '16px',
            color: 'var(--bubbly-text-dark)',
          }}
        >
          Frequently Asked Questions
        </h2>
        <p
          style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '60px',
          }}
        >
          Got questions? We&apos;ve got answers!
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '32px',
            textAlign: 'left',
          }}
        >
          {faqs.map((faq) => (
            <div
              key={faq.id}
              style={{
                background: 'white',
                padding: '32px',
                borderRadius: '24px',
                border: '4px solid var(--bubbly-lavender)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                transition: 'all 0.3s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 107, 157, 0.15)';
                e.currentTarget.style.borderColor = 'var(--bubbly-primary)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = 'var(--bubbly-lavender)';
              }}
            >
              <h3
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '22px',
                  fontWeight: 700,
                  color: 'var(--bubbly-primary)',
                  marginBottom: '12px',
                  lineHeight: 1.3,
                }}
              >
                {faq.question}
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.7,
                  color: 'var(--bubbly-text-dark)',
                  whiteSpace: 'pre-line',
                }}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <style jsx>{`
          @media (max-width: 968px) {
            div[style*="grid-template-columns"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
