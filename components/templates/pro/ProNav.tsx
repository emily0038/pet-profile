'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProNavProps {
  businessName: string;
  logoUrl?: string;
  sections: string[]; // Array of section IDs that exist on the page
}

export default function ProNav({ businessName, logoUrl, sections }: ProNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Map section IDs to display names
  const sectionNames: Record<string, string> = {
    home: 'Home',
    about: 'About',
    owner: 'Meet the Owner',
    services: 'Services',
    area: 'Service Area',
    reviews: 'Reviews',
    faqs: 'FAQs',
    contact: 'Contact',
    policies: 'Policies',
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="pro-nav">
      <div className="nav-container">
        <div className="logo">
          {logoUrl ? (
            <div className="logo-icon">
              <Image
                src={logoUrl}
                alt={businessName}
                width={40}
                height={40}
                style={{ objectFit: 'cover', width: '40px', height: '40px' }}
              />
            </div>
          ) : (
            <div className="logo-icon">🐾</div>
          )}
          <span>{businessName}</span>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {sections.map((sectionId) => (
            <li key={sectionId}>
              <a href={`#${sectionId}`} onClick={closeMenu}>
                {sectionNames[sectionId] || sectionId}
              </a>
            </li>
          ))}
        </ul>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>
      </div>
    </nav>
  );
}
