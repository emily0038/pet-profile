'use client';

import { useState } from 'react';
import { FAQ } from '@/lib/templates/types';

interface ProFAQsProps {
  faqs: FAQ[];
}

export default function ProFAQs({ faqs }: ProFAQsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (faqs.length === 0) {
    return null;
  }

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="section section-bg-cream">
      <div className="section-header">
        <h2>Frequently Asked Questions</h2>
        <p>Common questions about my pet care services, answered</p>
      </div>
      <div className="section-container" style={{ maxWidth: '900px' }}>
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            style={{
              background: 'white',
              borderRadius: '15px',
              marginBottom: '1.5rem',
              overflow: 'hidden',
              boxShadow: activeIndex === index ? '0 4px 20px var(--shadow)' : '0 2px 10px var(--shadow)',
              transition: 'box-shadow 0.3s',
            }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              style={{
                padding: '2rem',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                background: activeIndex === index ? 'var(--cream)' : 'transparent',
                transition: 'background 0.3s',
                textAlign: 'left',
              }}
            >
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', margin: 0 }}>
                {faq.question}
              </h3>
              <span
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0,
                  transition: 'transform 0.3s',
                  transform: activeIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                  marginLeft: '1rem',
                }}
              >
                +
              </span>
            </button>
            <div
              style={{
                maxHeight: activeIndex === index ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-out',
              }}
            >
              <div style={{ padding: '2rem 2rem 2rem 2rem', color: 'var(--text-light)', lineHeight: 1.8 }}>
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
