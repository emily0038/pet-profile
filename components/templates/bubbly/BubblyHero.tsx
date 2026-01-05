'use client';

import { Profile, GalleryPhoto } from '@/lib/templates/types';
import Image from 'next/image';

interface BubblyHeroProps {
  profile: Profile;
  heroPhotos: GalleryPhoto[];
}

export default function BubblyHero({ profile, heroPhotos }: BubblyHeroProps) {
  const gradients = [
    'linear-gradient(135deg, var(--bubbly-primary) 0%, var(--bubbly-peach) 100%)',
    'linear-gradient(135deg, var(--bubbly-accent-blue) 0%, var(--bubbly-lavender) 100%)',
    'linear-gradient(135deg, var(--bubbly-accent-green) 0%, var(--bubbly-secondary) 100%)',
  ];

  return (
    <section
      className="bubbly-hero"
      style={{
        background: 'linear-gradient(135deg, var(--bubbly-cream) 0%, var(--bubbly-lavender) 100%)',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="bubbly-hero-container"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
        }}
      >
        {/* Hero Content - Left Side */}
        <div className="bubbly-hero-content" style={{ position: 'relative', zIndex: 1 }}>
          <h1
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '40px',
              color: 'var(--bubbly-text-dark)',
            }}
          >
            {profile.tagline || `The Best Pet Care for Your Furry Friend`}
          </h1>
          <a
            href="#contact"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, var(--bubbly-primary) 0%, #ff8fb4 100%)',
              color: 'white',
              padding: '18px 48px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '18px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(255, 107, 157, 0.3)',
              transition: 'all 0.3s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 107, 157, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 107, 157, 0.3)';
            }}
          >
            Book Now
          </a>
        </div>

        {/* Hero Images - Right Side */}
        <div
          className="bubbly-hero-images"
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          {/* Main large image */}
          <div
            style={{
              width: '320px',
              height: '400px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              border: '6px solid white',
              transition: 'transform 0.3s',
              background: gradients[0],
              position: 'relative',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {heroPhotos[0]?.photo_url ? (
              <Image
                src={heroPhotos[0].photo_url}
                alt={heroPhotos[0].pet_details || 'Pet photo'}
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '80px',
                }}
              >
                🐶
              </div>
            )}
          </div>

          {/* Two smaller images stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                width: '180px',
                height: '192px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                border: '5px solid white',
                transition: 'transform 0.3s',
                background: gradients[1],
                position: 'relative',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {heroPhotos[1]?.photo_url ? (
                <Image
                  src={heroPhotos[1].photo_url}
                  alt={heroPhotos[1].pet_details || 'Pet photo'}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '60px',
                  }}
                >
                  🐱
                </div>
              )}
            </div>

            <div
              style={{
                width: '180px',
                height: '192px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                border: '5px solid white',
                transition: 'transform 0.3s',
                background: gradients[2],
                position: 'relative',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {heroPhotos[2]?.photo_url ? (
                <Image
                  src={heroPhotos[2].photo_url}
                  alt={heroPhotos[2].pet_details || 'Pet photo'}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '60px',
                  }}
                >
                  🐰
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
