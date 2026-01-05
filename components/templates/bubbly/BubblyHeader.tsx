'use client';

import { Profile } from '@/lib/templates/types';
import Image from 'next/image';

interface BubblyHeaderProps {
  profile: Profile;
}

export default function BubblyHeader({ profile }: BubblyHeaderProps) {
  return (
    <header
      style={{
        background: 'var(--bubbly-bg-white)',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {/* Logo / Business Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {profile.logo_url && (
            <Image
              src={profile.logo_url}
              alt="Logo"
              width={40}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          )}
          <div
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '28px',
              fontWeight: 700,
              color: '#000000',
            }}
          >
            {profile.business_name || profile.display_name}
          </div>
        </div>

        {/* Navigation Links */}
        <ul
          style={{
            display: 'flex',
            gap: '32px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <a
              href="#about"
              style={{
                color: 'var(--bubbly-text-dark)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '15px',
                transition: 'all 0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--bubbly-primary)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'var(--bubbly-text-dark)')}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#services"
              style={{
                color: 'var(--bubbly-text-dark)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '15px',
                transition: 'all 0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--bubbly-primary)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'var(--bubbly-text-dark)')}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#reviews"
              style={{
                color: 'var(--bubbly-text-dark)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '15px',
                transition: 'all 0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--bubbly-primary)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'var(--bubbly-text-dark)')}
            >
              Reviews
            </a>
          </li>
          <li>
            <a
              href="#contact"
              style={{
                color: 'var(--bubbly-text-dark)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '15px',
                transition: 'all 0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--bubbly-primary)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'var(--bubbly-text-dark)')}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
