'use client';

import { Profile, GalleryPhoto } from '@/lib/templates/types';
import Image from 'next/image';

interface BubblyAboutProps {
  profile: Profile;
  aboutPhotos: GalleryPhoto[];
}

export default function BubblyAbout({ profile, aboutPhotos }: BubblyAboutProps) {
  const aboutPhoto = aboutPhotos[0];

  return (
    <section
      id="about"
      className="bubbly-about"
      style={{
        padding: '100px 24px',
        background: 'var(--bubbly-bg-white)',
      }}
    >
      <div
        className="bubbly-about-container"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
      >
        {/* About Text */}
        <div>
          <h2
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: 'clamp(28px, 6vw, 42px)',
              fontWeight: 700,
              marginBottom: '24px',
              color: 'var(--bubbly-text-dark)',
            }}
          >
            {profile.business_name ? `Why Choose ${profile.business_name}?` : 'Why Choose Us?'} 🌟
          </h2>
          <div
            style={{
              fontSize: 'clamp(16px, 4vw, 18px)',
              color: '#555',
              lineHeight: 1.8,
            }}
          >
            {profile.about_business ? (
              <p style={{ whiteSpace: 'pre-line' }}>{profile.about_business}</p>
            ) : (
              <>
                <p style={{ marginBottom: '16px' }}>
                  We&apos;re not just pet sitters—we&apos;re pet parents too! With years of experience caring for dogs, cats, and small animals, we understand that leaving your furry family member is never easy.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  That&apos;s why we go above and beyond to provide personalized, loving care that keeps your pet happy, healthy, and entertained while you&apos;re away. From daily walks to overnight stays, we treat every pet like our own.
                </p>
                <p>
                  Our goal is simple: give you complete peace of mind knowing your best friend is in the best hands.
                </p>
              </>
            )}
          </div>
        </div>

        {/* About Image */}
        <div
          className="bubbly-about-image"
          style={{
            aspectRatio: '4/5',
            borderRadius: '32px',
            background: 'linear-gradient(135deg, var(--bubbly-peach) 0%, var(--bubbly-lavender) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '120px',
            border: '6px solid white',
            boxShadow: '0 20px 60px rgba(255, 107, 157, 0.2)',
            transform: 'rotate(3deg)',
            transition: 'transform 0.3s',
            overflow: 'hidden',
            position: 'relative',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'rotate(3deg)')}
        >
          {aboutPhoto?.photo_url ? (
            <Image
              src={aboutPhoto.photo_url}
              alt={aboutPhoto.pet_details || 'About us'}
              fill
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <span>🐾</span>
          )}
        </div>
      </div>
    </section>
  );
}
