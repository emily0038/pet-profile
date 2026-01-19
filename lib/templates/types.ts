// Template system types

export interface Profile {
  id: string;
  user_id: string;
  email: string;
  email_alt: string;
  domain: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  phone_number_alt: string;
  business_name: string;
  display_name: string;
  profile_photo_url: string;
  logo_url: string;

  // Content fields
  about_me: string;
  personal_tagline: string;
  tagline: string;
  about_business: string;

  // Location
  service_area: string;
  address: string;

  // Pet preferences
  accepts_cats: boolean;
  accepts_dogs: boolean;
  max_weight: number;

  // External links
  booking_link: string;
  instagram_link: string;
  facebook_link: string;
  tiktok_link: string;
  twitter_link: string;
  google_business_link: string;

  // Template
  template_id: string;

  // Analytics
  google_measurement_id: string;

  created_at: string;
  updated_at: string;
}

export interface ServiceMenuItem {
  id: string;
  service_id: string;
  name: string;
  price: string;
  is_add_on_only: boolean;
}

export interface Service {
  id: string;
  profile_id: string;
  type: string;
  description: string;
  photo_url: string;
  menu_items: ServiceMenuItem[];
  created_at: string;
  updated_at: string;
}

export interface GalleryPhoto {
  id: string;
  profile_id: string;
  photo_url: string;
  pet_details: string;
  review: string;
  owner: string;
  category: 'hero' | 'about';
  order: number;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  profile_id: string;
  question: string;
  answer: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Policy {
  id: string;
  profile_id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceArea {
  id: string;
  profile_id: string;
  name: string;
  description: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  profile_id: string;
  pet_name: string;
  photo_url: string;
  owner_name: string;
  review: string
  order: number;
  created_at: string;
  updated_at: string;
}

export interface TemplateData {
  profile: Profile;
  services: Service[];
  galleryPhotos: GalleryPhoto[];
  faqs: FAQ[];
  policies: Policy[];
  serviceAreas: ServiceArea[];
  reviews: Review[]
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  requiredFields: (keyof Profile)[];
  optionalFields: (keyof Profile)[];
  supportsFeatures: {
    faqs: boolean;
    policies: boolean;
    serviceAreas: boolean;
    teamMembers: boolean;
    gallery: boolean;
    reviews: boolean;
  };
}
