'use client';

import { Profile, ServiceArea } from '@/lib/templates/types';

interface ProFooterProps {
  profile: Profile;
  sections: string[];
  serviceAreas: ServiceArea[];
}

export default function ProFooter({ profile, sections, serviceAreas }: ProFooterProps) {
  const currentYear = new Date().getFullYear();

  // Format phone number for display
  const formatPhoneForDisplay = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  // Get service area neighborhoods or fallback to profile service_area
  const serviceAreaDisplay = serviceAreas.length > 0
    ? serviceAreas.map(area => area.name).join(', ')
    : profile.service_area;

  return (
    <footer
      style={{
        background: 'var(--primary)',
        color: 'white',
        padding: '4rem 2rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}
      >
        {/* Company Info */}
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'white' }}>
            {profile.business_name || profile.display_name}
          </h3>
          <p style={{ opacity: 0.9, lineHeight: 1.7, color: 'white' }}>
            {profile.tagline || ''}
          </p>
          {(profile.instagram_link || profile.facebook_link || profile.twitter_link || profile.tiktok_link) && (
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              {profile.facebook_link && (
                <a
                  href={profile.facebook_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '45px',
                    height: '45px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.3rem',
                    transition: 'background 0.3s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
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
                    width: '45px',
                    height: '45px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.3rem',
                    transition: 'background 0.3s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
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
                    width: '45px',
                    height: '45px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.3rem',
                    transition: 'background 0.3s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
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
                    width: '45px',
                    height: '45px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.3rem',
                    transition: 'background 0.3s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
                >
                  💼
                </a>
              )}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'white' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {sections.includes('home') && (
              <li style={{ marginBottom: '0.75rem' }}>
                <a
                  href="#home"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: 0.9,
                    transition: 'opacity 0.3s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
                >
                  Home
                </a>
              </li>
            )}
            {sections.includes('about') && (
              <li style={{ marginBottom: '0.75rem' }}>
                <a
                  href="#about"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: 0.9,
                    transition: 'opacity 0.3s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
                >
                  About Us
                </a>
              </li>
            )}
            {sections.includes('services') && (
              <li style={{ marginBottom: '0.75rem' }}>
                <a
                  href="#services"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: 0.9,
                    transition: 'opacity 0.3s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
                >
                  Services
                </a>
              </li>
            )}
            {sections.includes('faqs') && (
              <li style={{ marginBottom: '0.75rem' }}>
                <a
                  href="#faqs"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: 0.9,
                    transition: 'opacity 0.3s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
                >
                  FAQs
                </a>
              </li>
            )}
            {sections.includes('contact') && (
              <li style={{ marginBottom: '0.75rem' }}>
                <a
                  href="#contact"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: 0.9,
                    transition: 'opacity 0.3s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
                >
                  Contact
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'white' }}>Contact</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {profile.phone_number_alt && (
              <li style={{ marginBottom: '0.75rem', opacity: 0.9 }}>📞 {formatPhoneForDisplay(profile.phone_number_alt)}</li>
            )}
            {profile.email && (
              <li style={{ marginBottom: '0.75rem', opacity: 0.9 }}>✉️ {profile.email}</li>
            )}
            {serviceAreaDisplay && (
              <li style={{ marginBottom: '0.75rem', opacity: 0.9 }}>📍 {serviceAreaDisplay}</li>
            )}
          </ul>
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          opacity: 0.8,
        }}
      >
        <p style={{color: 'white'}}>
          &copy; {currentYear} {profile.business_name || profile.display_name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
