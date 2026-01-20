import Image from 'next/image';
import { Review } from '@/lib/templates/types';

interface BasicGalleryProps {
  reviews: Review[];
}

export default function BasicGallery({ reviews }: BasicGalleryProps) {
  // Filter reviews that have photos
  const reviewsWithPhotos = reviews.filter((r) => r.photo_url);

  if (reviewsWithPhotos.length === 0) {
    return null;
  }

  // Show up to 8 photos in the gallery
  const displayReviews = reviewsWithPhotos.slice(0, 8);

  return (
    <section className="basic-gallery">
      <div className="basic-gallery__title">
        <h2>Happy Pets, Happy Families</h2>
        <p>See some of our furry friends enjoying their time with us</p>
      </div>
      <div className="basic-gallery__grid">
        {displayReviews.map((review) => (
          <div key={review.id} className="basic-gallery__item">
            <Image
              src={review.photo_url}
              alt={review.pet_name || 'Pet photo'}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
