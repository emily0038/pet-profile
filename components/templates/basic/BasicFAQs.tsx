'use client';

import { useState } from 'react';
import { FAQ } from '@/lib/templates/types';

interface BasicFAQsProps {
  faqs: FAQ[];
}

export default function BasicFAQs({ faqs }: BasicFAQsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (faqs.length === 0) {
    return null;
  }

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="basic-faq">
      <div className="basic-faq__wrapper">
        <div className="basic-section-title">
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about our services</p>
        </div>
        <div className="basic-faq__container">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`basic-faq__item ${activeIndex === index ? 'basic-faq__item--active' : ''}`}
            >
              <button
                className="basic-faq__question"
                onClick={() => toggleFaq(index)}
                aria-expanded={activeIndex === index}
              >
                <h4>{faq.question}</h4>
                <span className="basic-faq__icon">+</span>
              </button>
              <div className="basic-faq__answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
