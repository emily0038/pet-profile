import Image from 'next/image';
import { GalleryPhoto } from '@/lib/templates/types';

interface ProHeroProps {
  businessName: string;
  businessTagline?: string;
  featuredPhotos: GalleryPhoto[];
}

export default function ProHero({
  businessName,
  businessTagline,
  featuredPhotos,
}: ProHeroProps) {
  // Get up to 2 featured photos for the hero
  const heroPhoto1 = featuredPhotos[0]?.photo_url;
  const heroPhoto2 = featuredPhotos[1]?.photo_url;

  return (
    <section id="home" className="hero">
      <div className="hero-pattern"></div>
      <div className="hero-container">
        <div className="hero-content">
          <h1>{businessTagline || `Welcome to ${businessName}`}</h1>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">
              Book Now
            </a>
            <a href="#services" className="btn btn-secondary">
              View Services
            </a>
          </div>
        </div>
        <div className="hero-images">
          {heroPhoto1 && (
            <div className="hero-image">
              <Image
                src={heroPhoto1}
                alt="Featured pet care"
                fill
                sizes="(max-width: 968px) 48vw, 500px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          )}
          {heroPhoto2 && (
            <div className="hero-image">
              <Image
                src={heroPhoto2}
                alt="Happy pets"
                fill
                sizes="(max-width: 968px) 42vw, 420px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
