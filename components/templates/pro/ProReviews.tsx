import Image from 'next/image';
import { Review } from '@/lib/templates/types';

interface ProReviewsProps {
  reviews: Review[];
}

export default function ProReviews({ reviews }: ProReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section id="reviews" className="section section-bg-white">
      <div className="section-header">
        <h2>What Pet Parents Say</h2>
        <p>Real reviews from happy clients and their beloved pets</p>
      </div>
      <div className="section-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {reviews.map((review, index) => {
            // Cycle through border colors
            const borderColors = ['#a8c5ba', '#e8956b', '#2d5f4f', '#c5d8cf', '#f0ad85', '#598573'];
            const borderColor = borderColors[index % borderColors.length];

            return (
              <div
                key={review.id}
                style={{
                  background: 'white',
                  padding: '2.5rem',
                  borderRadius: '20px',
                  boxShadow: '0 4px 20px var(--shadow)',
                  position: 'relative',
                }}
              >
                <div style={{ fontSize: '3rem', color: 'var(--accent)', opacity: 0.3, position: 'absolute', top: '1rem', left: '1.5rem' }}>
                  &quot;
                </div>
                {review.review && (
                  <p style={{ color: 'var(--text-dark)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                    {review.review}
                  </p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(45, 95, 79, 0.1)' }}>
                  {review.photo_url && (
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        border: `3px solid ${borderColor}`,
                        overflow: 'hidden',
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      <Image
                        src={review.photo_url}
                        alt={review.owner_name || 'Pet photo'}
                        width={60}
                        height={60}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  )}
                  <div>
                    {review.owner_name && (
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '0.25rem', margin: 0 }}>
                        {review.owner_name}
                      </h4>
                    )}
                    {review.pet_name && (
                      <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', margin: 0 }}>
                        {review.pet_name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
