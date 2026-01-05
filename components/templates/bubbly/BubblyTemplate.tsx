'use client';

import { TemplateData } from '@/lib/templates/types';
import BubblyNav from './BubblyNav';
import BubblyHero from './BubblyHero';
import BubblyAbout from './BubblyAbout';
import BubblyOwner from './BubblyOwner';
import BubblyServices from './BubblyServices';
import BubblyReviews from './BubblyReviews';
import BubblyGallery from './BubblyGallery';
import BubblyContact from './BubblyContact';
import BubblyFAQs from './BubblyFAQs';
import BubblyPolicies from './BubblyPolicies';
import BubblyFooter from './BubblyFooter';
import './styles.css';

interface BubblyTemplateProps {
  data: TemplateData;
}

export default function BubblyTemplate({ data }: BubblyTemplateProps) {
  const { profile, services, galleryPhotos, faqs, policies, serviceAreas, reviews } = data;

  // Get hero images (category 'hero')
  const heroPhotos = galleryPhotos.filter(p => p.category === 'hero').slice(0, 3);

  // Get about images (category 'about')
  const aboutPhotos = galleryPhotos.filter(p => p.category === 'about').slice(0, 1);

  // Determine which sections to show in nav
  const sections: string[] = [];

  // About is always shown
  sections.push('about');

  // Services only if populated
  if (services && services.length > 0) {
    sections.push('services');
  }

  // Contact is always shown
  sections.push('contact');

  // FAQs only if populated
  if (faqs && faqs.length > 0) {
    sections.push('faq');
  }

  return (
    <div className="bubbly-template">
      <BubblyNav
        businessName={profile.business_name || profile.display_name}
        logoUrl={profile.logo_url}
        sections={sections}
      />
      <BubblyHero profile={profile} heroPhotos={heroPhotos} />
      <BubblyAbout profile={profile} aboutPhotos={aboutPhotos} />
      {profile.personal_tagline || profile.about_me ? (
        <BubblyOwner profile={profile} />
      ) : null}
      <BubblyServices services={services} />
      <BubblyReviews reviews={reviews} />
      <BubblyGallery reviews={reviews} />
      <BubblyContact profile={profile} serviceAreas={serviceAreas} />
      {faqs && faqs.length > 0 && <BubblyFAQs faqs={faqs} />}
      {policies && policies.length > 0 && <BubblyPolicies policies={policies} />}
      <BubblyFooter profile={profile} serviceAreas={serviceAreas} />
    </div>
  );
}
