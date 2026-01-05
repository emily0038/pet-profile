'use client';

import { Review } from '@/lib/templates/types';
import Image from 'next/image';

interface BubblyGalleryProps {
  reviews: Review[];
}

export default function BubblyGallery({ reviews }: BubblyGalleryProps) {
  // Filter for review photos to display in gallery

  if (reviews.length === 0) {
    return null;
  }

  const gradients = [
    'linear-gradient(135deg, #ff6b9d 0%, #ffc93c 100%)',
    'linear-gradient(135deg, #6eb5ff 0%, #e0d4f7 100%)',
    'linear-gradient(135deg, #90ee90 0%, #ffc93c 100%)',
    'linear-gradient(135deg, #ffb5a7 0%, #ff6b9d 100%)',
    'linear-gradient(135deg, #ffc93c 0%, #ffb5a7 100%)',
    'linear-gradient(135deg, #e0d4f7 0%, #6eb5ff 100%)',
  ];

  return (
    <section
      style={{
        padding: '100px 24px',
        background: 'linear-gradient(135deg, var(--bubbly-peach) 0%, var(--bubbly-lavender) 50%, var(--bubbly-cream) 100%)',
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
          Furry Friends 🐾
        </h2>
        <p
          style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '60px',
          }}
        >
          Meet some of my favorite clients
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
          }}
        >
          {reviews.map((review, index) => (
            <div
              key={review.id}
              style={{
                aspectRatio: '1',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '100px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s',
                overflow: 'hidden',
                position: 'relative',
                background: gradients[index % gradients.length],
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05) rotate(3deg)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1) rotate(0deg)')}
            >
              {review.photo_url ? (
                <Image
                  src={review.photo_url}
                  alt={review.pet_name || 'Pet photo'}
                  fill
                  style={{ objectFit: 'cover', border: '8px solid white', borderRadius: '32px' }}
                />
              ) : (
                <span>{['🐕', '😺', '🐶', '🐱', '🦮', '😸'][index]}</span>
              )}
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
