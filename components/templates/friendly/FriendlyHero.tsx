'use client';

import { Profile, GalleryPhoto } from '@/lib/templates/types';
import Image from 'next/image';

interface FriendlyHeroProps {
  profile: Profile;
  heroPhotos: GalleryPhoto[];
}

export default function FriendlyHero({ profile, heroPhotos }: FriendlyHeroProps) {
  return (
    <section className="friendly-hero">
      <div className="friendly-hero-content">
        <h1>{profile.tagline || 'Tail-wagging, purrfect place for your pets!'}</h1>
        <p>
          {profile.about_business
            ? profile.about_business.split('.').slice(0, 2).join('.') + '.'
            : `Professional pet sitting and dog walking services${profile.service_area ? ` in ${profile.service_area}` : ''}. Your pets deserve the best care while you're away.`}
        </p>
        <a href="#contact" className="friendly-hero-btn">Book now</a>
      </div>
      <div className="friendly-hero-circles">
        <div className="friendly-circle-frame friendly-circle-1">
          {heroPhotos[0]?.photo_url ? (
            <Image
              src={heroPhotos[0].photo_url}
              alt={heroPhotos[0].pet_details || 'Pet photo'}
              fill
              style={{ objectFit: 'cover' }}
              sizes="380px"
            />
          ) : (
            <span style={{ fontSize: '80px' }}>🐕</span>
          )}
        </div>
        <div className="friendly-circle-frame friendly-circle-2">
          {heroPhotos[1]?.photo_url ? (
            <Image
              src={heroPhotos[1].photo_url}
              alt={heroPhotos[1].pet_details || 'Pet photo'}
              fill
              style={{ objectFit: 'cover' }}
              sizes="320px"
            />
          ) : (
            <span style={{ fontSize: '60px' }}>🐈</span>
          )}
        </div>
        <div className="friendly-circle-frame friendly-circle-3">
          {heroPhotos[2]?.photo_url ? (
            <Image
              src={heroPhotos[2].photo_url}
              alt={heroPhotos[2].pet_details || 'Pet photo'}
              fill
              style={{ objectFit: 'cover' }}
              sizes="280px"
            />
          ) : (
            <span style={{ fontSize: '50px' }}>🐾</span>
          )}
        </div>
      </div>
    </section>
  );
}
