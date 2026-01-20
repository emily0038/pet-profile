'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface BasicNavProps {
  businessName: string;
  logoUrl?: string;
  sections: string[];
}

export default function BasicNav({ businessName, logoUrl, sections }: BasicNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionLabels: Record<string, string> = {
    services: 'Services',
    reviews: 'Reviews',
    contact: 'Contact',
  };

  return (
    <nav className={`basic-nav ${isScrolled ? 'basic-nav--scrolled' : ''}`}>
      <div className="basic-nav__brand">
        {logoUrl && (
          <Image
            src={logoUrl}
            alt={`${businessName} logo`}
            width={40}
            height={40}
            className="basic-nav__logo-image"
          />
        )}
        <span className="basic-nav__logo">{businessName}</span>
      </div>
      <ul className="basic-nav__links">
        {sections.map((section) => (
          <li key={section}>
            <button
              onClick={() => scrollToSection(section)}
              className="basic-nav__link"
            >
              {sectionLabels[section] || section}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
