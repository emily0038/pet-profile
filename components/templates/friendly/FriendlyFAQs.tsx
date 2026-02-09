'use client';

import { FAQ } from '@/lib/templates/types';

interface FriendlyFAQsProps {
  faqs: FAQ[];
}

export default function FriendlyFAQs({ faqs }: FriendlyFAQsProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="friendly-faq">
      <div className="friendly-faq-wrapper">
        <div className="friendly-faq-header">
          <h2>FAQs</h2>
          <p>Find answers to common questions before you reach out.</p>
        </div>
        {faqs.map((faq) => (
          <details key={faq.id} className="friendly-faq-item">
            <summary className="friendly-faq-question">
              {faq.question}
              <span>▼</span>
            </summary>
            <div className="friendly-faq-answer">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
