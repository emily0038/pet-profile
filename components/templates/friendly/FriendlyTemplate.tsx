'use client';

import { TemplateData } from '@/lib/templates/types';
import FriendlyNav from './FriendlyNav';
import FriendlyHero from './FriendlyHero';
import FriendlyAbout from './FriendlyAbout';
import FriendlyOwner from './FriendlyOwner';
import FriendlyServices from './FriendlyServices';
import FriendlyReviews from './FriendlyReviews';
import FriendlyPolicies from './FriendlyPolicies';
import FriendlyFAQs from './FriendlyFAQs';
import FriendlyContact from './FriendlyContact';
import FriendlyFooter from './FriendlyFooter';
import './styles.css';

interface FriendlyTemplateProps {
  data: TemplateData;
}

export default function FriendlyTemplate({ data }: FriendlyTemplateProps) {
  const { profile, services, galleryPhotos, faqs, policies, reviews } = data;

  // Get hero images (category 'hero')
  const heroPhotos = galleryPhotos.filter(p => p.category === 'hero').slice(0, 3);

  // Get about images (category 'about')
  const aboutPhotos = galleryPhotos.filter(p => p.category === 'about').slice(0, 1);

  // Determine which sections to show in nav
  const sections: string[] = [];

  // Services only if populated
  if (services && services.length > 0) {
    sections.push('services');
  }

  // Reviews only if populated
  if (reviews && reviews.length > 0) {
    sections.push('reviews');
  }

  // Contact is always shown
  sections.push('contact');

  return (
    <div className="friendly-template">
      <FriendlyNav
        businessName={profile.business_name || profile.display_name}
        logoUrl={profile.logo_url}
        sections={sections}
      />
      <FriendlyHero profile={profile} heroPhotos={heroPhotos} />
      <FriendlyAbout profile={profile} aboutPhotos={aboutPhotos} />
      <FriendlyOwner profile={profile} />
      {services && services.length > 0 && (
        <FriendlyServices
          services={services}
          businessName={profile.business_name || profile.display_name}
        />
      )}
      {reviews && reviews.length > 0 && (
        <FriendlyReviews reviews={reviews} />
      )}
      {policies && policies.length > 0 && (
        <FriendlyPolicies policies={policies} />
      )}
      {faqs && faqs.length > 0 && (
        <FriendlyFAQs faqs={faqs} />
      )}
      <FriendlyContact profile={profile} services={services} />
      <FriendlyFooter profile={profile} services={services} />
    </div>
  );
}
