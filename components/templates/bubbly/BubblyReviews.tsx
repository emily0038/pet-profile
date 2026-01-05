'use client';

import { Review } from '@/lib/templates/types';

interface BubblyReviewsProps {
  reviews: Review[];
}

export default function BubblyReviews({ reviews }: BubblyReviewsProps) {

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section
      id="reviews"
      style={{
        padding: '100px 24px',
        background: 'linear-gradient(135deg, var(--bubbly-lavender) 0%, var(--bubbly-cream) 100%)',
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
          Glowing Reviews
        </h2>
        <p
          style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '60px',
          }}
        >
          Real testimonials from happy pet parents
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              style={{
                background: 'var(--bubbly-secondary)',
                borderRadius: '24px',
                padding: '36px 32px',
                textAlign: 'left',
                boxShadow: '0 8px 30px rgba(255, 201, 60, 0.2)',
              }}
            >
              {review.review && (
                <p
                  style={{
                    fontSize: '16px',
                    color: 'var(--bubbly-text-dark)',
                    lineHeight: 1.8,
                    marginBottom: '24px',
                  }}
                >
                  &quot;{review.review}&quot;
                </p>
              )}
              <div>
                {review.owner_name && (
                  <h4
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: 'var(--bubbly-text-dark)',
                      marginBottom: '2px',
                    }}
                  >
                    {review.owner_name}
                  </h4>
                )}
                {review.pet_name && (
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#666',
                      margin: 0,
                    }}
                  >
                    {review.pet_name}
                  </p>
                )}
              </div>
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
