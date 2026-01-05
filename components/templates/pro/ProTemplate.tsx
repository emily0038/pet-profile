import { TemplateData } from '@/lib/templates/types';
import ProNav from './ProNav';
import ProHero from './ProHero';
import ProAbout from './ProAbout';
import ProServices from './ProServices';
import ProReviews from './ProReviews';
import ProFAQs from './ProFAQs';
import ProContact from './ProContact';
import ProPolicies from './ProPolicies';
import ProFooter from './ProFooter';
import './styles.css';

interface ProTemplateProps {
  data: TemplateData;
}

export default function ProTemplate({ data }: ProTemplateProps) {
  const { profile, services, galleryPhotos, faqs, policies, serviceAreas, reviews } = data;

  // Categorize photos
  const featuredPhotos = galleryPhotos.filter((p) => p.category === 'hero');
  const dayToDayPhotos = galleryPhotos.filter((p) => p.category === 'about');

  // Simplified navigation - only show About, Services, FAQs, and Contact
  const sections: string[] = [];

  if (profile.about_business || dayToDayPhotos.length > 0) {
    sections.push('about');
  }

  if (services.length > 0) {
    sections.push('services');
  }

  sections.push('contact');

  if (faqs.length > 0) {
    sections.push('faqs');
  }

  return (
    <div className="pro-template">
      <ProNav
        businessName={profile.business_name || profile.display_name}
        logoUrl={profile.logo_url || "/logo.svg"}
        sections={sections}
      />

      <ProHero
        businessName={profile.business_name || profile.display_name}
        businessTagline={profile.tagline}
        featuredPhotos={featuredPhotos}
      />

      <ProAbout
        businessName={profile.business_name || profile.display_name}
        aboutBusiness={profile.about_business}
        dayToDayPhotos={dayToDayPhotos}
        ownerName={profile.display_name || `${profile.first_name} ${profile.last_name}`.trim()}
        ownerTitle={profile.personal_tagline}
        ownerBio={profile.about_me}
        profilePhotoUrl={profile.profile_photo_url}
      />

      <ProServices services={services} serviceAreas={serviceAreas} profileServiceArea={profile.service_area} />

      {/* Reviews Section */}
      <ProReviews reviews={reviews} />

      {/* Contact Section */}
      <ProContact profile={profile} serviceAreas={serviceAreas} />

      {/* FAQs Section */}
      <ProFAQs faqs={faqs} />

      {/* Policies Section */}
      <ProPolicies policies={policies} />

      {/* Footer */}
      <ProFooter profile={profile} sections={sections} serviceAreas={serviceAreas} />
    </div>
  );
}
