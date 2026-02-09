'use client';

import { Profile } from '@/lib/templates/types';
import Image from 'next/image';

interface FriendlyOwnerProps {
  profile: Profile;
}

export default function FriendlyOwner({ profile }: FriendlyOwnerProps) {
  // Only show if there's personal content
  if (!profile.about_me && !profile.personal_tagline) return null;

  const displayName = profile.display_name || profile.first_name || 'the Owner';

  // Split the about_me text into paragraphs
  const aboutText = profile.about_me || '';
  const paragraphs = aboutText.split('\n').filter(p => p.trim());

  return (
    <section className="friendly-owner">
      <div className="friendly-owner-wrapper">
        {profile.profile_photo_url && (
          <div className="friendly-owner-image">
            <Image
              src={profile.profile_photo_url}
              alt={displayName}
              fill
              style={{ objectFit: 'cover' }}
              sizes="280px"
            />
          </div>
        )}
        <h2>Meet {displayName}</h2>
        {profile.personal_tagline && (
          <p className="friendly-owner-tagline">{profile.personal_tagline}</p>
        )}
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
