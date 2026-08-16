import { TemplateData } from '@/lib/templates/types';
import BasicCustomSection from './BasicCustomSection';
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

const BASIC_THEMES: Record<string, { primary: string; accent: string; gradient: string }> = {
  ocean:  { primary: '#247878', accent: '#E5F5F5', gradient: '#1d6060' },
  sunny:  { primary: '#D4843F', accent: '#FDF3EB', gradient: '#b06e34' },
  forest: { primary: '#478557', accent: '#EEF5F0', gradient: '#3a6d47' },
  coral:  { primary: '#C9694F', accent: '#FDF0ED', gradient: '#a85740' },
};

interface BasicTemplateProps {
  data: TemplateData;
}

export default function BasicTemplate({ data }: BasicTemplateProps) {
  const { profile, services, galleryPhotos, serviceAreas, reviews } = data;

  const theme = profile.theme ? BASIC_THEMES[profile.theme] : null;
  const themeStyle = theme ? {
    '--basic-primary': theme.primary,
    '--basic-accent': theme.accent,
    '--basic-gradient': theme.gradient,
  } as React.CSSProperties : undefined;

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
    <div className={`basic-template${theme ? ' basic-template--themed' : ''}`} style={themeStyle}>
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

      <BasicCustomSection
        heading={profile.custom_section_heading}
        body={profile.custom_section_body}
      />

      <BasicGallery reviews={reviews} />

      <BasicServiceAreas serviceAreas={serviceAreas} />

      <BasicReviews reviews={reviews} />

      <BasicContact profile={profile} />

      <BasicFooter businessName={profile.business_name || profile.display_name} />
    </div>
  );
}
