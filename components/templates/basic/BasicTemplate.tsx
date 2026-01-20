import { TemplateData } from '@/lib/templates/types';
import BasicNav from './BasicNav';
import BasicHero from './BasicHero';
import BasicAbout from './BasicAbout';
import BasicServices from './BasicServices';
import BasicGallery from './BasicGallery';
import BasicServiceAreas from './BasicServiceAreas';
import BasicReviews from './BasicReviews';
import BasicContact from './BasicContact';
import BasicFooter from './BasicFooter';
import './styles.css';

interface BasicTemplateProps {
  data: TemplateData;
}

export default function BasicTemplate({ data }: BasicTemplateProps) {
  const { profile, services, galleryPhotos, serviceAreas, reviews } = data;

  // Categorize photos
  const featuredPhotos = galleryPhotos.filter((p) => p.category === 'hero');
  const dayToDayPhotos = galleryPhotos.filter((p) => p.category === 'about');

  // Build navigation sections based on available content
  const sections: string[] = [];

  if (services.length > 0) {
    sections.push('services');
  }

  if (reviews.length > 0) {
    sections.push('reviews');
  }

  sections.push('contact');

  return (
    <div className="basic-template">
      <BasicNav
        businessName={profile.business_name || profile.display_name}
        logoUrl={profile.logo_url}
        sections={sections}
      />

      <BasicHero
        businessName={profile.business_name || profile.display_name}
        tagline={profile.tagline}
        serviceArea={profile.service_area}
        featuredPhoto={featuredPhotos[0]}
      />

      <BasicAbout
        businessName={profile.business_name || profile.display_name}
        aboutBusiness={profile.about_business}
        aboutPhoto={dayToDayPhotos[0]}
      />

      <BasicServices services={services} />

      <BasicGallery reviews={reviews} />

      <BasicServiceAreas serviceAreas={serviceAreas} />

      <BasicReviews reviews={reviews} />

      <BasicContact profile={profile} />

      <BasicFooter businessName={profile.business_name || profile.display_name} />
    </div>
  );
}
