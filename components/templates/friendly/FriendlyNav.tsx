'use client';

import Image from 'next/image';

interface FriendlyNavProps {
  businessName: string;
  logoUrl?: string;
  sections: string[];
}

export default function FriendlyNav({ businessName, logoUrl, sections }: FriendlyNavProps) {
  return (
    <nav className="friendly-nav">
      <div className="friendly-nav-logo">
        {logoUrl && (
          <Image
            src={logoUrl}
            alt={businessName}
            width={140}
            height={40}
            style={{ objectFit: 'contain', height: '40px', width: 'auto', marginRight: '12px' }}
          />
        )}
        <span>{businessName}</span>
      </div>
      <ul className="friendly-nav-links">
        {sections.includes('services') && (
          <li><a href="#services">Services</a></li>
        )}
        {sections.includes('reviews') && (
          <li><a href="#reviews">Reviews</a></li>
        )}
        <li><a href="#contact">Contact</a></li>
        <li><a href="#contact" className="friendly-nav-book-btn">Book now</a></li>
      </ul>
    </nav>
  );
}
