'use client';

import { Review } from '@/lib/templates/types';
import Image from 'next/image';

interface FriendlyReviewsProps {
  reviews: Review[];
}

export default function FriendlyReviews({ reviews }: FriendlyReviewsProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section id="reviews" className="friendly-reviews">
      <div className="friendly-reviews-header">
        <h2>Happy Pets, Happy Families</h2>
        <p>See what real clients have to say</p>
      </div>
      <div className="friendly-reviews-grid">
        {reviews.slice(0, 3).map((review) => (
          <div key={review.id} className="friendly-review-card">
            <div className="friendly-review-image">
              {review.photo_url ? (
                <Image
                  src={review.photo_url}
                  alt={review.pet_name || 'Pet photo'}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="180px"
                />
              ) : (
                <span style={{ fontSize: '60px' }}>🐾</span>
              )}
            </div>
            <p className="friendly-review-text">&ldquo;{review.review}&rdquo;</p>
            {review.owner_name && (
              <p className="friendly-review-author">{review.owner_name}</p>
            )}
            {review.pet_name && (
              <p className="friendly-review-location">{review.pet_name}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
