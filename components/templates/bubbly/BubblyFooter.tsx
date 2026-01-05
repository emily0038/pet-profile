'use client';

import { Profile, ServiceArea } from '@/lib/templates/types';

interface BubblyFooterProps {
  profile: Profile;
  serviceAreas: ServiceArea[];
}

export default function BubblyFooter({ profile, serviceAreas }: BubblyFooterProps) {
  const currentYear = new Date().getFullYear();

    // Format phone number for display
  const formatPhoneForDisplay = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  const serviceAreaDisplay = serviceAreas?.length > 0
    ? serviceAreas.map(area => area.name).join(', ')
    : null;

  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, var(--bubbly-primary) 0%, var(--bubbly-secondary) 100%)',
        padding: '40px 24px',
        color: 'white',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Footer Top - Logo and Quick Links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '40px',
            marginBottom: '40px',
          }}
        >
          {/* Logo / Business Name + Contact Info */}
          <div>
            <div
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '28px',
                fontWeight: 700,
                color: 'white',
                marginBottom: '16px',
              }}
            >
              {profile.business_name || profile.display_name}
            </div>
            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15px', alignItems: 'flex-start' }}>
              {profile.email && (
                <div style={{ color: 'white', opacity: 0.9 }}>
                  📧 {profile.email}
                </div>
              )}
              {profile.phone_number_alt && (
                <div style={{ color: 'white', opacity: 0.9 }}>
                  📞 {formatPhoneForDisplay(profile.phone_number_alt)}
                </div>
              )}
              {serviceAreaDisplay && (
                <div style={{ color: 'white', opacity: 0.9 }}>
                  📍 {serviceAreaDisplay}
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '18px',
                fontWeight: 700,
                color: 'white',
                marginBottom: '16px',
                margin: 0,
              }}
            >
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start'}}>
              <a
                href="#about"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '15px',
                  opacity: 0.9,
                  transition: 'opacity 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
              >
                About
              </a>
              <a
                href="#services"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '15px',
                  opacity: 0.9,
                  transition: 'opacity 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
              >
                Services
              </a>
              <a
                href="#contact"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '15px',
                  opacity: 0.9,
                  transition: 'opacity 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
              >
                Contact
              </a>
              <a
                href="#faq"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '15px',
                  opacity: 0.9,
                  transition: 'opacity 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
              >
                FAQs
              </a>
              <a
                href="#policies"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '15px',
                  opacity: 0.9,
                  transition: 'opacity 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
              >
                Policies
              </a>
            </div>
          </div>
        </div>

        {/* Social Links */}
        {(profile.facebook_link || profile.instagram_link || profile.twitter_link || profile.tiktok_link) && (
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
            {profile.facebook_link && (
              <a
                href={profile.facebook_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                📘
              </a>
            )}
            {profile.instagram_link && (
              <a
                href={profile.instagram_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                📷
              </a>
            )}
            {profile.twitter_link && (
              <a
                href={profile.twitter_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                🐦
              </a>
            )}
            {profile.tiktok_link && (
              <a
                href={profile.tiktok_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                ��
              </a>
            )}
          </div>
        )}

        {/* Copyright */}
        <p style={{ color: 'white', width: '100%', textAlign: 'center', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '20px' }}>
          © {currentYear} {profile.business_name || profile.display_name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
