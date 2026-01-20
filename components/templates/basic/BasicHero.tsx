import Image from 'next/image';
import { GalleryPhoto } from '@/lib/templates/types';

interface BasicHeroProps {
  businessName: string;
  tagline?: string;
  serviceArea?: string;
  featuredPhoto?: GalleryPhoto;
}

export default function BasicHero({ businessName, tagline, serviceArea, featuredPhoto }: BasicHeroProps) {
  return (
    <section id="home" className="basic-hero">
      <div className="basic-hero__content">
        <h1 className="basic-hero__title">{businessName}</h1>
        {tagline && <p className="basic-hero__tagline">{tagline}</p>}
        {serviceArea && <p className="basic-hero__location">Serving {serviceArea}</p>}
      </div>
      <div className="basic-hero__image">
        {featuredPhoto ? (
          <Image
            src={featuredPhoto.photo_url}
            alt={`${businessName} featured photo`}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        ) : (
          <div className="basic-hero__placeholder">
            Featured photo
          </div>
        )}
      </div>
    </section>
  );
}
