// Template-specific editor configuration
// Each template can define what fields/features it supports

export interface TemplateEditorConfig {
  id: string;
  name: string;

  // Styling
  colors: {
    primary: string;
    hover: string;
    accent?: string;
  };
  fonts: {
    heading: string;
    body: string;
  };

  // Header section
  header: {
    isRequired: boolean;
    showLogo: boolean;
    logoRequired?: boolean;
    businessNameMaxLength: number;
  };

  // Hero section
  hero: {
    isRequired: boolean;
    taglineMaxLength: number;
    featuredImageCount: number;
    featuredImageRequired: boolean;
  };

  // About section
  about: {
    isRequired: boolean;
    pitchMaxWords: number;
    dayToDayImageCount: number;
    dayToDayImageRequired: boolean;
  };

  // Personal section
  personal: {
    enabled: boolean;
    isRequired: boolean;
    showProfilePhoto: boolean;
    showTagline: boolean;
    taglineMaxLength?: number;
    showBio: boolean;
    bioMaxLength?: number;
  };

  // Services section
  services: {
    isRequired: boolean;
    showCategoryImage: boolean;
    categoryImageRequired?: boolean;
    showDescription: boolean;
    showPricing: boolean;
    showAddOnOption: boolean;
  };

  // Service Areas section
  serviceAreas: {
    enabled: boolean;
    isRequired: boolean;
    showDescription: boolean;
    descriptionMaxLength?: number;
  };

  // Reviews section
  reviews: {
    isRequired: boolean;
    showPetPhoto: boolean;
    petPhotoRequired?: boolean;
    showPetNameBreed: boolean;
    petNameBreedRequired?: boolean;
    reviewMaxLength: number;
    showOwnerName: boolean;
    ownerNameRequired?: boolean;
  };

  // Contact section
  contact: {
    isRequired: boolean;
    showPhone: boolean;
    phoneRequired: boolean;
    showEmail: boolean;
    emailRequired: boolean;
  };

  // FAQs section
  faqs: {
    enabled: boolean;
    isRequired: boolean;
    allowReorder: boolean;
  };

  // Policies section
  policies: {
    enabled: boolean;
    isRequired: boolean;
    templates: Array<{
      id: string;
      emoji: string;
      title: string;
    }>;
  };
}

// Pro Template Configuration
export const proTemplateConfig: TemplateEditorConfig = {
  id: 'pro',
  name: 'Professional',

  colors: {
    primary: '#9185FF',
    hover: '#5B4FC6',
    accent: '#2d5f4f',
  },
  fonts: {
    heading: "'Roboto Slab', serif",
    body: "'Roboto Flex', sans-serif",
  },

  header: {
    isRequired: true,
    showLogo: true,
    logoRequired: false,
    businessNameMaxLength: 50,
  },

  hero: {
    isRequired: true,
    taglineMaxLength: 100,
    featuredImageCount: 2,
    featuredImageRequired: true,
  },

  about: {
    isRequired: true,
    pitchMaxWords: 300,
    dayToDayImageCount: 4,
    dayToDayImageRequired: true,
  },

  personal: {
    enabled: true,
    isRequired: false,
    showProfilePhoto: true,
    showTagline: true,
    taglineMaxLength: 80,
    showBio: true,
    bioMaxLength: 500,
  },

  services: {
    isRequired: false,
    showCategoryImage: true,
    categoryImageRequired: false,
    showDescription: true,
    showPricing: true,
    showAddOnOption: true,
  },

  serviceAreas: {
    enabled: true,
    isRequired: false,
    showDescription: true,
    descriptionMaxLength: 200,
  },

  reviews: {
    isRequired: false,
    showPetPhoto: true,
    petPhotoRequired: false,
    showPetNameBreed: true,
    petNameBreedRequired: false,
    reviewMaxLength: 250,
    showOwnerName: true,
    ownerNameRequired: false,
  },

  contact: {
    isRequired: false,
    showPhone: true,
    phoneRequired: false,
    showEmail: true,
    emailRequired: false,
  },

  faqs: {
    enabled: true,
    isRequired: false,
    allowReorder: true,
  },

  policies: {
    enabled: true,
    isRequired: false,
    templates: [
      { id: 'meetgreet', emoji: '🤝', title: 'Meet & Greet' },
      { id: 'payment', emoji: '💳', title: 'Payment' },
      { id: 'health', emoji: '🏥', title: 'Health & Safety' },
      { id: 'bookings', emoji: '📅', title: 'Bookings & Cancellations' },
      { id: 'weather', emoji: '🌧️', title: 'Inclement Weather' },
      { id: 'access', emoji: '🔑', title: 'Home Access & Security' },
    ],
  },
};

// Bubbly Template Configuration (example for future template)
export const bubblyTemplateConfig: TemplateEditorConfig = {
  id: 'bubbly',
  name: 'Bubbly',

  colors: {
    primary: '#FF6B9D',
    hover: '#E55A8A',
    accent: '#FFC93C',
  },
  fonts: {
    heading: "'Roboto Slab', serif",
    body: "'Roboto Flex', sans-serif",
  },

  header: {
    isRequired: true,
    showLogo: true,
    logoRequired: false,
    businessNameMaxLength: 50,
  },

  hero: {
    isRequired: true,
    taglineMaxLength: 120,
    featuredImageCount: 3,
    featuredImageRequired: true,
  },

  about: {
    isRequired: true,
    pitchMaxWords: 250,
    dayToDayImageCount: 6,
    dayToDayImageRequired: true,
  },

  personal: {
    enabled: true,
    isRequired: false,
    showProfilePhoto: true,
    showTagline: true,
    taglineMaxLength: 100,
    showBio: true,
    bioMaxLength: 400,
  },

  services: {
    isRequired: false,
    showCategoryImage: false, // Bubbly doesn't show service images
    showDescription: true,
    showPricing: true,
    showAddOnOption: false, // No add-on option
  },

  serviceAreas: {
    enabled: true,
    isRequired: false,
    showDescription: false, // Just names, no descriptions
  },

  reviews: {
    isRequired: false,
    showPetPhoto: false, // No pet photos in Bubbly template
    showPetNameBreed: true,
    petNameBreedRequired: true,
    reviewMaxLength: 200,
    showOwnerName: true,
    ownerNameRequired: true,
  },

  contact: {
    isRequired: false,
    showPhone: true,
    phoneRequired: true,
    showEmail: true,
    emailRequired: true,
  },

  faqs: {
    enabled: true,
    isRequired: false,
    allowReorder: false, // Fixed order
  },

  policies: {
    enabled: true,
    isRequired: false,
    templates: [
      { id: 'payment', emoji: '💳', title: 'Payment' },
      { id: 'cancellation', emoji: '❌', title: 'Cancellation' },
      { id: 'emergency', emoji: '🚨', title: 'Emergency Contact' },
    ],
  },
};

// Sleek Template Configuration (example for future template)
export const sleekTemplateConfig: TemplateEditorConfig = {
  id: 'sleek',
  name: 'Sleek',

  colors: {
    primary: '#000000',
    hover: '#1F2937',
    accent: '#FFFFFF',
  },
  fonts: {
    heading: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
  },

  header: {
    isRequired: true,
    showLogo: false, // Sleek uses text-only branding
    businessNameMaxLength: 40,
  },

  hero: {
    isRequired: true,
    taglineMaxLength: 80,
    featuredImageCount: 1, // Single hero image
    featuredImageRequired: true,
  },

  about: {
    isRequired: true,
    pitchMaxWords: 200,
    dayToDayImageCount: 3,
    dayToDayImageRequired: false,
  },

  personal: {
    enabled: false, // No personal section in Sleek
    isRequired: false,
    showProfilePhoto: false,
    showTagline: false,
    showBio: false,
  },

  services: {
    isRequired: false,
    showCategoryImage: true,
    categoryImageRequired: true, // Required in Sleek
    showDescription: false, // Minimal text
    showPricing: true,
    showAddOnOption: false,
  },

  serviceAreas: {
    enabled: false, // No service areas in Sleek
    isRequired: false,
    showDescription: false,
  },

  reviews: {
    isRequired: false,
    showPetPhoto: true,
    petPhotoRequired: true,
    showPetNameBreed: false, // Just photos and reviews
    reviewMaxLength: 150,
    showOwnerName: false, // Anonymous reviews
  },

  contact: {
    isRequired: false,
    showPhone: false, // Email only
    phoneRequired: false,
    showEmail: true,
    emailRequired: true,
  },

  faqs: {
    enabled: false, // No FAQs in Sleek template
    isRequired: false,
    allowReorder: false,
  },

  policies: {
    enabled: false, // No policies section in Sleek
    isRequired: false,
    templates: [],
  },
};

// Template Registry
export const templateConfigs: Record<string, TemplateEditorConfig> = {
  pro: proTemplateConfig,
  bubbly: bubblyTemplateConfig,
  sleek: sleekTemplateConfig,
};

// Helper function to get config by template ID
export function getTemplateConfig(templateId: string): TemplateEditorConfig {
  const config = templateConfigs[templateId];
  if (!config) {
    throw new Error(`Template config not found for: ${templateId}`);
  }
  return config;
}

// Helper function to get all available templates
export function getAllTemplateConfigs(): TemplateEditorConfig[] {
  return Object.values(templateConfigs);
}
