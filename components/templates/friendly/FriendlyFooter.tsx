'use client';

import { Profile, Service } from '@/lib/templates/types';

interface FriendlyFooterProps {
  profile: Profile;
  services: Service[];
}

export default function FriendlyFooter({ profile, services }: FriendlyFooterProps) {
  const businessName = profile.business_name || profile.display_name;
  const currentYear = new Date().getFullYear();

  const hasSocialLinks = profile.instagram_link || profile.facebook_link || profile.twitter_link || profile.tiktok_link;

  return (
    <footer className="friendly-footer">
      <div className="friendly-footer-content">
        <div className="friendly-footer-brand">
          <h3>{businessName}</h3>
          <p>
            {profile.tagline
              ? profile.tagline
              : ''}
          </p>
        </div>
        {services && services.length > 0 && (
          <div className="friendly-footer-links">
            <h4>Services</h4>
            <ul>
              {services.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <a href="#services">{service.type}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="friendly-footer-links">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        {hasSocialLinks && (
          <div className="friendly-footer-links">
            <h4>Connect</h4>
            <ul>
              {profile.instagram_link && (
                <li><a href={profile.instagram_link} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              )}
              {profile.facebook_link && (
                <li><a href={profile.facebook_link} target="_blank" rel="noopener noreferrer">Facebook</a></li>
              )}
              {profile.twitter_link && (
                <li><a href={profile.twitter_link} target="_blank" rel="noopener noreferrer">Twitter</a></li>
              )}
              {profile.tiktok_link && (
                <li><a href={profile.tiktok_link} target="_blank" rel="noopener noreferrer">TikTok</a></li>
              )}
            </ul>
          </div>
        )}
      </div>
      <div className="friendly-footer-bottom">
        <p>&copy; {currentYear} {businessName}. All rights reserved.</p>
        {hasSocialLinks && (
          <div className="friendly-social-links">
            {profile.instagram_link && (
              <a href={profile.instagram_link} target="_blank" rel="noopener noreferrer">IG</a>
            )}
            {profile.facebook_link && (
              <a href={profile.facebook_link} target="_blank" rel="noopener noreferrer">FB</a>
            )}
            {profile.twitter_link && (
              <a href={profile.twitter_link} target="_blank" rel="noopener noreferrer">TW</a>
            )}
            {profile.tiktok_link && (
              <a href={profile.tiktok_link} target="_blank" rel="noopener noreferrer">TT</a>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
