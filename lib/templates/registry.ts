import { TemplateConfig, TemplateData, Profile } from './types';
import ProTemplate from '@/components/templates/pro/ProTemplate';
import BubblyTemplate from '@/components/templates/bubbly/BubblyTemplate';
import BasicTemplate from '@/components/templates/basic/BasicTemplate';

// Template registry - central configuration for all templates
export const TEMPLATES: Record<string, TemplateConfig> = {
  'pro': {
    id: 'pro',
    name: 'Professional',
    description: 'Comprehensive business template with FAQs, policies, and service areas',
    thumbnail: '/templates/pro-preview.png',
    requiredFields: ['business_name', 'display_name', 'service_area'],
    optionalFields: [
      'personal_tagline',
      'tagline',
      'about_business',
      'address',
      'booking_link',
      'instagram_link',
      'facebook_link',
      'tiktok_link',
      'twitter_link',
      'google_business_link'
    ],
    supportsFeatures: {
      faqs: true,
      policies: true,
      serviceAreas: true,
      teamMembers: false, // Will add later
      gallery: true,
      reviews: true,
    },
  },

  'bubbly': {
    id: 'bubbly',
    name: 'Bubbly',
    description: 'Fun and colorful template with playful design perfect for pet care businesses',
    thumbnail: '/templates/bubbly-preview.png',
    requiredFields: ['business_name', 'display_name'],
    optionalFields: [
      'tagline',
      'about_business',
      'personal_tagline',
      'about_me',
      'service_area',
      'booking_link',
      'instagram_link',
      'facebook_link',
      'tiktok_link',
      'twitter_link',
    ],
    supportsFeatures: {
      faqs: true,
      policies: true,
      serviceAreas: true,
      teamMembers: false,
      gallery: true,
      reviews: true,
    },
  },

  // Placeholder for existing profile template
  'classic': {
    id: 'classic',
    name: 'Classic',
    description: 'Simple, clean profile layout (current default)',
    thumbnail: '/templates/classic-preview.png',
    requiredFields: ['display_name'],
    optionalFields: ['about_me', 'service_area'],
    supportsFeatures: {
      faqs: false,
      policies: false,
      serviceAreas: false,
      teamMembers: false,
      gallery: true,
      reviews: true,
    },
  },

  'basic': {
    id: 'basic',
    name: 'Basic',
    description: 'Clean, minimalist template with elegant typography',
    thumbnail: '/templates/basic-preview.png',
    requiredFields: ['business_name', 'display_name'],
    optionalFields: [
      'tagline',
      'about_business',
      'service_area',
      'booking_link',
      'instagram_link',
      'facebook_link',
      'tiktok_link',
      'twitter_link',
    ],
    supportsFeatures: {
      faqs: false,
      policies: false,
      serviceAreas: true,
      teamMembers: false,
      gallery: true,
      reviews: true,
    },
  },
};

// Component mapping - maps template IDs to their React components
export const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<{ data: TemplateData }>> = {
  'pro': ProTemplate,
  'bubbly': BubblyTemplate,
  'basic': BasicTemplate,
  // 'classic': ClassicTemplate, // Will implement later
};

// Get template configuration by ID
export function getTemplate(templateId: string): TemplateConfig | null {
  return TEMPLATES[templateId] || null;
}

// Get all available templates
export function getAllTemplates(): TemplateConfig[] {
  return Object.values(TEMPLATES);
}

// Get template component by ID
export function getTemplateComponent(templateId: string): React.ComponentType<{ data: TemplateData }> | null {
  return TEMPLATE_COMPONENTS[templateId] || null;
}

// Validate if profile has required fields for template
export function validateProfileForTemplate(
  profile: Partial<Profile>,
  templateId: string
): { valid: boolean; missingFields: string[] } {
  const template = getTemplate(templateId);

  if (!template) {
    return { valid: false, missingFields: ['Invalid template'] };
  }

  const missingFields = template.requiredFields.filter(
    (field) => {
      const value = profile[field];
      return !value || (typeof value === 'string' && value.trim() === '');
    }
  );

  return {
    valid: missingFields.length === 0,
    missingFields,
  };
}
