import { Review } from '@/lib/templates/types';

interface BasicReviewsProps {
  reviews: Review[];
}

export default function BasicReviews({ reviews }: BasicReviewsProps) {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <section id="reviews" className="basic-reviews">
      <div className="basic-reviews__container">
        <div className="basic-section-title">
          <h2>Client Reviews</h2>
          <p>What pet parents are saying</p>
        </div>
        <div className="basic-reviews__grid">
          {reviews.map((review) => (
            <div key={review.id} className="basic-review-card">
              <p className="basic-review-card__text">&ldquo;{review.review}&rdquo;</p>
              <p className="basic-review-card__author">
                &mdash; {review.owner_name}
                {review.pet_name && ` & ${review.pet_name}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
