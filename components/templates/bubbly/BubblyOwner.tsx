'use client';

import { Profile } from '@/lib/templates/types';
import Image from 'next/image';

interface BubblyOwnerProps {
  profile: Profile;
}

export default function BubblyOwner({ profile }: BubblyOwnerProps) {
  return (
    <section
      id="owner"
      className="bubbly-owner"
      style={{
        padding: '100px 24px',
        background: 'linear-gradient(135deg, var(--bubbly-cream) 0%, var(--bubbly-bg-white) 100%)',
      }}
    >
      <div
        className="bubbly-owner-header"
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
          Meet the Owner! 👋
        </h2>
        <p
          style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '60px',
          }}
        >
          Get to know the person caring for your furry family!
        </p>

        <div
          className="bubbly-owner-container"
          style={{
            display: 'grid',
            gridTemplateColumns: '400px 1fr',
            gap: '60px',
            textAlign: 'left',
            alignItems: 'start',
          }}
        >
          {/* Owner Image */}
          <div
            className="bubbly-owner-image"
            style={{
              aspectRatio: '1',
              borderRadius: '32px',
              background: 'linear-gradient(135deg, var(--bubbly-primary) 0%, var(--bubbly-secondary) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '120px',
              border: '8px solid white',
              boxShadow: '0 24px 60px rgba(0,0,0,0.15)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {profile.profile_photo_url ? (
              <Image
                src={profile.profile_photo_url}
                alt={profile.display_name || 'Owner'}
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <span>👩‍🦰</span>
            )}
          </div>

          {/* Owner Bio */}
          <div className="bubbly-owner-content">
            <h3
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '32px',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--bubbly-text-dark)',
              }}
            >
              {profile.first_name} {profile.last_name}
            </h3>
            {profile.personal_tagline && (
              <p
                style={{
                  fontSize: '16px',
                  color: 'var(--bubbly-primary)',
                  fontWeight: 600,
                  marginBottom: '24px',
                }}
              >
                {profile.personal_tagline}
              </p>
            )}
            <div
              style={{
                fontSize: '17px',
                color: '#555',
                lineHeight: 1.8,
              }}
            >
              {profile.about_me ? (
                <p style={{ whiteSpace: 'pre-line' }}>{profile.about_me}</p>
              ) : (
                <>
                  <p style={{ marginBottom: '16px' }}>
                    Hi there! I&apos;ve been caring for pets professionally for over 8 years. I grew up with dogs, cats, rabbits, and even a parrot—so I&apos;ve seen it all!
                  </p>
                  <p>
                    I&apos;m certified in pet CPR and first aid, and I absolutely love what I do. There&apos;s nothing better than seeing a wagging tail or hearing a happy purr. I can&apos;t wait to meet you and your furry friend!
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
