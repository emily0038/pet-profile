// Template-specific editor configuration
// Each template can define what fields/features it supports

// Shared policy templates used across all templates
export const DEFAULT_POLICY_TEMPLATES: Array<{
  id: string;
  emoji: string;
  title: string;
}> = [
  { id: 'meetgreet', emoji: '🤝', title: 'Meet & Greet' },
  { id: 'payment', emoji: '💳', title: 'Payment' },
  { id: 'health', emoji: '🏥', title: 'Health & Safety' },
  { id: 'bookings', emoji: '📅', title: 'Bookings & Cancellations' },
  { id: 'weather', emoji: '🌧️', title: 'Inclement Weather' },
  { id: 'access', emoji: '🔑', title: 'Home Access & Security' },
];

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

  // Header section (kept for future extensibility)
  // Constants: always required, logo always shown but optional, businessNameMaxLength = 50
  header: object;

  // Hero section (always required, taglineMaxLength = 100)
  hero: {
    featuredImageCount: number;
    featuredImageRequired: boolean;
  };

  // About section (always required, pitchMaxWords = 300)
  about: {
    dayToDayImageCount: number;
    dayToDayImageRequired: boolean;
  };

  // Personal section (never required, taglineMaxLength = 100, bioMaxWords = 300)
  personal: {
    enabled: boolean;
    showProfilePhoto: boolean;
    showTagline: boolean;
    showBio: boolean;
  };

  // Services section (never required, showCategoryImage = categoryImageRequired)
  services: {
    categoryImageRequired: boolean;
    showDescription: boolean;
    showPricing: boolean;
    showAddOnOption: boolean;
  };

  // Service Areas section (never required, descriptionMaxLength = 200)
  serviceAreas: {
    enabled: boolean;
    showDescription: boolean;
  };

  // Reviews section (never required, reviewMaxLength = 500, ownerNameRequired = showOwnerName)
  reviews: {
    showPetPhoto: boolean;
    petPhotoRequired?: boolean;
    showPetNameBreed: boolean;
    petNameBreedRequired?: boolean;
    showOwnerName: boolean;
  };

  // Contact section
  contact: {
    isRequired: boolean;
    showPhone: boolean;
    phoneRequired: boolean;
    showEmail: boolean;
    emailRequired: boolean;
  };

  // FAQs section (never required, allowReorder = true)
  faqs: {
    enabled: boolean;
  };

  // Policies section (never required)
  policies: {
    enabled: boolean;
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

  header: {},

  hero: {
    featuredImageCount: 2,
    featuredImageRequired: true,
  },

  about: {
    dayToDayImageCount: 4,
    dayToDayImageRequired: true,
  },

  personal: {
    enabled: true,
    showProfilePhoto: true,
    showTagline: true,
    showBio: true,
  },

  services: {
    categoryImageRequired: false,
    showDescription: true,
    showPricing: true,
    showAddOnOption: true,
  },

  serviceAreas: {
    enabled: true,
    showDescription: true,
  },

  reviews: {
    showPetPhoto: true,
    petPhotoRequired: false,
    showPetNameBreed: true,
    petNameBreedRequired: false,
    showOwnerName: true,
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
  },

  policies: {
    enabled: true,
    templates: DEFAULT_POLICY_TEMPLATES,
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

  header: {},

  hero: {
    featuredImageCount: 3,
    featuredImageRequired: true,
  },

  about: {
    dayToDayImageCount: 6,
    dayToDayImageRequired: true,
  },

  personal: {
    enabled: true,
    showProfilePhoto: true,
    showTagline: true,
    showBio: true,
  },

  services: {
    categoryImageRequired: false, // Bubbly doesn't show service images
    showDescription: true,
    showPricing: true,
    showAddOnOption: false, // No add-on option
  },

  serviceAreas: {
    enabled: true,
    showDescription: false, // Just names, no descriptions
  },

  reviews: {
    showPetPhoto: true,
    showPetNameBreed: true,
    petNameBreedRequired: true,
    showOwnerName: true,
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
  },

  policies: {
    enabled: true,
    templates: DEFAULT_POLICY_TEMPLATES,
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

  header: {},

  hero: {
    featuredImageCount: 1, // Single hero image
    featuredImageRequired: true,
  },

  about: {
    dayToDayImageCount: 3,
    dayToDayImageRequired: false,
  },

  personal: {
    enabled: false, // No personal section in Sleek
    showProfilePhoto: false,
    showTagline: false,
    showBio: false,
  },

  services: {
    categoryImageRequired: true, // Required in Sleek
    showDescription: false, // Minimal text
    showPricing: true,
    showAddOnOption: false,
  },

  serviceAreas: {
    enabled: false, // No service areas in Sleek
    showDescription: false,
  },

  reviews: {
    showPetPhoto: true,
    petPhotoRequired: true,
    showPetNameBreed: false, // Just photos and reviews
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
  },

  policies: {
    enabled: false, // No policies section in Sleek
    templates: DEFAULT_POLICY_TEMPLATES,
  },
};

// Basic Template Configuration
export const basicTemplateConfig: TemplateEditorConfig = {
  id: 'basic',
  name: 'Basic',

  // Will need to change colors
  colors: {
    primary: '#161617',
    hover: '#5B4FC6',
    accent: '#2d5f4f',
  },
  fonts: {
    heading: "'Roboto Slab', serif",
    body: "'Roboto Flex', sans-serif",
  },

  header: {},

  hero: {
    featuredImageCount: 1,
    featuredImageRequired: true,
  },

  about: {
    dayToDayImageCount: 1,
    dayToDayImageRequired: true,
  },

  personal: {
    enabled: false,
    showProfilePhoto: false,
    showTagline: false,
    showBio: false,
  },

  services: {
    categoryImageRequired: false,
    showDescription: true,
    showPricing: true,
    showAddOnOption: true,
  },

  serviceAreas: {
    enabled: true,
    showDescription: true,
  },

  reviews: {
    showPetPhoto: true,
    petPhotoRequired: false,
    showPetNameBreed: true,
    petNameBreedRequired: false,
    showOwnerName: true,
  },

  contact: {
    isRequired: false,
    showPhone: true,
    phoneRequired: false,
    showEmail: true,
    emailRequired: false,
  },

  faqs: {
    enabled: false,
  },

  policies: {
    enabled: false,
    templates: DEFAULT_POLICY_TEMPLATES,
  },
};

// Friendly Template Configuration
export const friendlyTemplateConfig: TemplateEditorConfig = {
  id: 'friendly',
  name: 'Friendly',

  colors: {
    primary: '#FF6B6B',
    hover: '#E55A5A',
    accent: '#FFF8F0',
  },
  fonts: {
    heading: "'Fraunces', serif",
    body: "'Inter', sans-serif",
  },

  header: {},

  hero: {
    featuredImageCount: 3,
    featuredImageRequired: true,
  },

  about: {
    dayToDayImageCount: 1,
    dayToDayImageRequired: true,
  },

  personal: {
    enabled: true,
    showProfilePhoto: true,
    showTagline: true,
    showBio: true,
  },

  services: {
    categoryImageRequired: true,
    showDescription: true,
    showPricing: true,
    showAddOnOption: false,
  },

  serviceAreas: {
    enabled: false,
    showDescription: false,
  },

  reviews: {
    showPetPhoto: true,
    petPhotoRequired: true,
    showPetNameBreed: true,
    petNameBreedRequired: false,
    showOwnerName: true,
  },

  contact: {
    isRequired: false,
    showPhone: true,
    phoneRequired: false,
    showEmail: true,
    emailRequired: true,
  },

  faqs: {
    enabled: true,
  },

  policies: {
    enabled: true,
    templates: DEFAULT_POLICY_TEMPLATES,
  },
};

// Template Registry
export const templateConfigs: Record<string, TemplateEditorConfig> = {
  pro: proTemplateConfig,
  bubbly: bubblyTemplateConfig,
  basic: basicTemplateConfig,
  sleek: sleekTemplateConfig,
  friendly: friendlyTemplateConfig,
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
