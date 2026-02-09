'use client';

import { Profile, GalleryPhoto } from '@/lib/templates/types';
import Image from 'next/image';

interface FriendlyAboutProps {
  profile: Profile;
  aboutPhotos: GalleryPhoto[];
}

export default function FriendlyAbout({ profile, aboutPhotos }: FriendlyAboutProps) {
  // Split the about text into paragraphs
  const aboutText = profile.about_business || '';
  const paragraphs = aboutText.split('\n').filter(p => p.trim());

  return (
    <section className="friendly-about">
      <div className="friendly-about-wrapper">
        <div className="friendly-about-image">
          {aboutPhotos[0]?.photo_url ? (
            <Image
              src={aboutPhotos[0].photo_url}
              alt={aboutPhotos[0].pet_details || 'About photo'}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 968px) 100vw, 50vw"
            />
          ) : (
            <span style={{ fontSize: '100px' }}>🐕‍🦺</span>
          )}
        </div>
        <div className="friendly-about-content">
          <h2>Why Choose {profile.business_name}?</h2>
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <>
              <p>
                I believe every pet deserves personalized attention and care. Whether your dog needs daily walks,
                your cat requires companionship while you&apos;re away, or your pets need overnight care,
                I&apos;m here to help maintain their routine and keep them happy.
              </p>
              <p>
                I&apos;m fully insured, bonded, and certified in pet first aid.
                Your pets&apos; safety and wellbeing are my top priorities.
              </p>
            </>
          )}
          <a href="#services" className="friendly-learn-btn">Learn More</a>
        </div>
      </div>
    </section>
  );
}
