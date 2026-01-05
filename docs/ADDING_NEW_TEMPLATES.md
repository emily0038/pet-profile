# Adding New Templates

This guide explains how to add a new website template to the Pets Friendz platform.

## Overview

The template system is configuration-based, meaning you define what fields and features each template supports in a config object, and the generic `TemplateEditor` component automatically renders the appropriate fields.

## Steps to Add a New Template

### 1. Create Template Configuration

Add your template config to `/lib/templates/editorConfig.ts`:

```typescript
export const myNewTemplateConfig: TemplateEditorConfig = {
  id: 'mynewtemplate',
  name: 'My New Template',

  // Define colors (used in editor UI)
  colors: {
    primary: '#FF0000',
    hover: '#CC0000',
    accent: '#00FF00',
  },

  // Define fonts (used in editor UI)
  fonts: {
    heading: "'Your Heading Font', serif",
    body: "'Your Body Font', sans-serif",
  },

  // Configure which fields to show in each section
  header: {
    showLogo: true,              // Show logo upload field?
    logoRequired: false,         // Is logo required?
    businessNameMaxLength: 50,   // Character limit
  },

  hero: {
    taglineMaxLength: 100,
    featuredImageCount: 2,       // How many hero images?
    featuredImageRequired: true,
  },

  about: {
    pitchMaxWords: 300,
    dayToDayImageCount: 4,       // How many day-to-day images?
    dayToDayImageRequired: true,
  },

  personal: {
    enabled: true,               // Show personal section at all?
    showProfilePhoto: true,
    showTagline: true,
    taglineMaxLength: 80,
    showBio: true,
    bioMaxLength: 500,
  },

  services: {
    showCategoryImage: true,     // Show image per service category?
    categoryImageRequired: false,
    showDescription: true,
    showPricing: true,
    showAddOnOption: true,
  },

  serviceAreas: {
    enabled: true,               // Show service areas section?
    showDescription: true,
    descriptionMaxLength: 200,
  },

  reviews: {
    showPetPhoto: true,          // Show pet photo upload?
    petPhotoRequired: false,
    showPetNameBreed: true,      // Show pet name/breed field?
    petNameBreedRequired: false,
    reviewMaxLength: 250,
    showOwnerName: true,         // Show owner name field?
    ownerNameRequired: false,
  },

  contact: {
    showPhone: true,
    phoneRequired: true,
    showEmail: true,
    emailRequired: true,
  },

  faqs: {
    enabled: true,               // Show FAQs section?
    allowReorder: true,          // Allow drag-to-reorder?
  },

  policies: {
    enabled: true,               // Show policies section?
    templates: [                 // Define which policy templates to show
      { id: 'payment', emoji: '💳', title: 'Payment' },
      { id: 'cancellation', emoji: '❌', title: 'Cancellation' },
      // Add more as needed
    ],
  },
};
```

### 2. Register the Template

Add your config to the template registry:

```typescript
export const templateConfigs: Record<string, TemplateEditorConfig> = {
  pro: proTemplateConfig,
  bubbly: bubblyTemplateConfig,
  sleek: sleekTemplateConfig,
  mynewtemplate: myNewTemplateConfig,  // Add here
};
```

### 3. Create Editor Page

Create a new page at `/app/editor/mynewtemplate/page.tsx`:

```typescript
'use client';

import { useRouter } from 'next/navigation';
import TemplateEditor from '@/components/editor/TemplateEditor';
import { myNewTemplateConfig } from '@/lib/templates/editorConfig';

export default function MyNewTemplateEditorPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/editor/templates');
  };

  const handlePreview = () => {
    console.log('Preview clicked');
  };

  return (
    <TemplateEditor
      config={myNewTemplateConfig}
      businessName="Emily's Pet Sitting"
      onBack={handleBack}
      onPreview={handlePreview}
    />
  );
}
```

### 4. Add to Template Selector

Update `/components/editor/TemplateSelector.tsx` to include your new template:

```typescript
const templates: Template[] = [
  // ... existing templates
  {
    id: 'mynewtemplate',
    name: 'My New Template',
    description: 'A brief description of your template',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
      'Feature 4',
    ],
    previewGradient: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
    previewUrl: 'https://example.com/preview', // or undefined
  },
];
```

## That's It!

Your new template is now fully integrated. The `TemplateEditor` component will:

- Automatically show/hide sections based on your config
- Render only the fields you've enabled
- Apply your custom colors and fonts
- Enforce your character limits and image counts
- Show the correct policy templates

## Examples of Different Configurations

### Minimalist Template (No Personal Section, No FAQs)
```typescript
personal: { enabled: false, ... },
faqs: { enabled: false, ... },
```

### Review-Only Photos (No Pet Names)
```typescript
reviews: {
  showPetPhoto: true,
  petPhotoRequired: true,
  showPetNameBreed: false,  // Hide pet name field
  showOwnerName: false,     // Anonymous reviews
  reviewMaxLength: 150,
},
```

### Text-Only Branding (No Logo)
```typescript
header: {
  showLogo: false,          // No logo upload
  businessNameMaxLength: 40,
},
```

### Single Hero Image
```typescript
hero: {
  featuredImageCount: 1,    // Just one image
  featuredImageRequired: true,
},
```

## Adding More Customization

If you need fields that aren't in the config yet:

1. Add the field to the `TemplateEditorConfig` interface in `editorConfig.ts`
2. Add conditional rendering logic in `TemplateEditor.tsx`
3. All existing templates will automatically get the new field (with default values)
