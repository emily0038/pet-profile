'use client';

import { useState } from 'react';
import Image from 'next/image';

interface BubblyNavProps {
  businessName: string;
  logoUrl: string;
  sections: string[];
}

export default function BubblyNav({ businessName, logoUrl, sections }: BubblyNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sectionNames: Record<string, string> = {
    about: 'About',
    owner: 'Meet the Owner',
    services: 'Services',
    reviews: 'Reviews',
    gallery: 'Gallery',
    contact: 'Contact',
    faq: 'FAQs',
    policies: 'Policies',
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bubbly-nav">
      <div className="bubbly-nav-container">
        <div className="bubbly-logo">
          <div className="bubbly-logo-icon">
            <Image
              src={logoUrl}
              alt={businessName}
              width={40}
              height={40}
              style={{ objectFit: 'cover', width: '40px', height: '40px' }}
            />
          </div>
          <span>{businessName}</span>
        </div>

        <ul className={`bubbly-nav-links ${isMenuOpen ? 'active' : ''}`}>
          {sections.map((sectionId) => (
            <li key={sectionId}>
              <a href={`#${sectionId}`} onClick={closeMenu}>
                {sectionNames[sectionId] || sectionId}
              </a>
            </li>
          ))}
        </ul>

        <button className="bubbly-mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>
      </div>
    </nav>
  );
}
