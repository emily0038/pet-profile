# Updated Editor Flow Design v2

## Overview
A template-specific editor experience where each template has its own styled editor matching the template's design language. The editor is organized by sections with required/optional field indicators.

## Key Design Principles

1. **Template-Specific Styling**: Each template editor uses the template's color palette and design language
2. **Component Parameters**: Reusable editor components accept template-specific parameters (colors, required image counts, etc.)
3. **Required vs Optional**: Clear visual indicators for required vs optional fields
4. **Smart Contact Fields**: Phone/email checkboxes control whether to use account defaults or alternative values
5. **Pre-defined Policies**: Users select from curated policy templates and write their own copy
6. **Photo Upload Progress**: Visual indicators showing (0/2) with placeholder outlines

## Flow Stages

### 1. Template Selection Screen

#### Layout
```
┌─────────────────────────────────────────────────┐
│  Choose Your Template                           │
│  Select the perfect design for your business    │
│                                                  │
│  ┌─────────────┐  ┌─────────────┐              │
│  │   Pro       │  │  Classic    │              │
│  │  Template   │  │  Template   │              │
│  │             │  │             │              │
│  │  [Preview]  │  │  [Preview]  │              │
│  │  [Select]   │  │  [Select]   │              │
│  └─────────────┘  └─────────────┘              │
└─────────────────────────────────────────────────┘
```

### 2. Template Preview Modal

```
┌─────────────────────────────────────────────────┐
│  Pro Template Preview              [X] Close    │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │  <iframe src="petsfriendz.com/emilyw">   │  │
│  │                                          │  │
│  │  Full scrollable preview of Pro template │  │
│  │  with real example data                  │  │
│  │                                          │  │
│  │  ↕️ Scroll to view all sections          │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  [Cancel]                    [Select Template]  │
└─────────────────────────────────────────────────┘
```

#### Implementation
- Iframe source: `petsfriendz.com/emilyw` for Pro template
- Future templates will have their own example URLs
- Modal is full-screen on mobile, large modal on desktop

### 3. Pro Template Editor

#### Editor Shell
The Pro template editor uses the Pro template's design system:
- Colors: `#2d5f4f` (primary), `#e8956b` (accent), `#faf7f4` (cream)
- Font: DM Sans for body, Crimson Pro for headings
- Border radius: 15-20px
- Spacing: 2rem padding

#### Navigation
Section-based with progress indicators:
```
┌─────────────────────────────────────────────────┐
│ Emily's Pet Sitting                       [75%] │
├─────────────────────────────────────────────────┤
│ ✓ Header      ⚠ Hero       ✓ About             │
│ ✓ Services    ⚠ Reviews    ✓ Contact           │
│ ○ FAQs        ○ Policies                        │
├─────────────────────────────────────────────────┤
│                                                  │
│ [Section content appears here]                  │
│                                                  │
└─────────────────────────────────────────────────┘

Legend:
✓ = Complete (all required fields filled)
⚠ = Incomplete (missing required fields)
○ = Optional section (not started)
```

## Section Details

### Header Section

```
┌─────────────────────────────────────────────────┐
│ Header                          [Saving...]      │
├─────────────────────────────────────────────────┤
│                                                  │
│ Logo *                                          │
│ ┌─────────────────────────────────────┐        │
│ │  ┌───────────┐                      │        │
│ │  │  ┌─────┐  │  Your logo here      │        │
│ │  │  │ IMG │  │  (PNG, SVG, or JPG)  │        │
│ │  │  └─────┘  │  Max 2MB             │        │
│ │  │ [Upload]  │                      │        │
│ │  └───────────┘                      │        │
│ └─────────────────────────────────────┘        │
│                                                  │
│ Business Name *                                 │
│ ┌─────────────────────────────────────┐        │
│ │ Emily's Pet Sitting                  │        │
│ └─────────────────────────────────────┘        │
│                                                  │
│ * Required field                                │
└─────────────────────────────────────────────────┘
```

**Fields:**
- `logo_url` (image upload, required)
- `business_name` (text input, required)

**Validation:**
- Logo: PNG/SVG/JPG, max 2MB, recommended 500x500px
- Business name: 3-50 characters

---

### Hero Section

```
┌─────────────────────────────────────────────────┐
│ Hero                            [Saving...]      │
├─────────────────────────────────────────────────┤
│                                                  │
│ Business Tagline *                              │
│ ┌─────────────────────────────────────┐        │
│ │ Professional, loving care for your   │        │
│ │ furry family members                 │        │
│ └─────────────────────────────────────┘        │
│ 65/100 characters                               │
│                                                  │
│ Featured Images * (1/2)                         │
│ ┌──────────┐  ┌──────────┐                     │
│ │  ┌────┐  │  │  ┌────┐  │                     │
│ │  │IMG │  │  │  │ +  │  │  Add square images  │
│ │  │    │  │  │  │    │  │  (500x500px min)    │
│ │  └────┘  │  │  └────┘  │                     │
│ │[Replace] │  │[Upload]  │                     │
│ └──────────┘  └──────────┘                     │
│                                                  │
│ * Required fields                               │
└─────────────────────────────────────────────────┘
```

**Fields:**
- `business_tagline` (text input, 100 char max, required)
- Featured gallery photos (2 images, category='featured', required)

**Image Placeholders:**
- Dotted border outline: `2px dashed #2d5f4f`
- Plus icon in center
- Upload button below
- Once uploaded, shows preview with "Replace" button

**Validation:**
- Tagline: 10-100 characters
- Images: JPG/PNG, min 500x500px, max 5MB each

---

### About Section

```
┌─────────────────────────────────────────────────┐
│ About                           [Saving...]      │
├─────────────────────────────────────────────────┤
│                                                  │
│ Business Pitch *                                │
│ ┌─────────────────────────────────────┐        │
│ │ Tell visitors about your business,   │        │
│ │ experience, and what makes you       │        │
│ │ special...                           │        │
│ │                                      │        │
│ │                                      │        │
│ └─────────────────────────────────────┘        │
│ 150/300 words                                   │
│                                                  │
│ Day-to-Day Images * (2/4)                       │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐               │
│ │IMG  │ │IMG  │ │ +   │ │ +   │               │
│ │     │ │     │ │     │ │     │               │
│ └─────┘ └─────┘ └─────┘ └─────┘               │
│ [Edit]  [Edit]  [Upload] [Upload]              │
│                                                  │
│ Upload 4:5 ratio images (400x500px min)         │
│                                                  │
│ * Required fields                               │
└─────────────────────────────────────────────────┘
```

**Fields:**
- `about_business` (textarea, 300 words max, required)
- Day-to-day gallery photos (4 images, category='day-to-day', required)

**Validation:**
- Pitch: 50-300 words
- Images: JPG/PNG, 4:5 ratio recommended, min 400x500px

---

### Personal Section

```
┌─────────────────────────────────────────────────┐
│ Personal (Optional)             [Saving...]      │
├─────────────────────────────────────────────────┤
│                                                  │
│ Profile Photo (0/1)                             │
│ ┌──────────┐                                    │
│ │  ┌────┐  │                                    │
│ │  │ +  │  │  Add your photo                    │
│ │  │    │  │  (Square format)                   │
│ │  └────┘  │                                    │
│ │[Upload]  │                                    │
│ └──────────┘                                    │
│                                                  │
│ Personal Tagline                                │
│ ┌─────────────────────────────────────┐        │
│ │ e.g., "Certified Pet Sitter since..." │        │
│ └─────────────────────────────────────┘        │
│ 0/80 characters                                 │
│                                                  │
│ Personal Bio                                    │
│ ┌─────────────────────────────────────┐        │
│ │ Share your experience, qualifications,│        │
│ │ and passion for pet care...          │        │
│ │                                      │        │
│ └─────────────────────────────────────┘        │
│ 0/200 words                                     │
│                                                  │
│ This section is optional but recommended        │
└─────────────────────────────────────────────────┘
```

**Fields:**
- `profile_photo_url` (image upload, optional)
- `personal_tagline` (text input, 80 char max, optional)
- `about_me` (textarea, 200 words max, optional)

---

### Services Section

```
┌─────────────────────────────────────────────────┐
│ Services                [Add Service] [Saving...]│
├─────────────────────────────────────────────────┤
│                                                  │
│ ┌─ Dog Walking ──────────────────────[Delete]─┐│
│ │                                              ││
│ │ Service Image * (1/1)                        ││
│ │ ┌──────────┐                                 ││
│ │ │  ┌────┐  │                                 ││
│ │ │  │IMG │  │  Landscape format                ││
│ │ │  │    │  │  (400x250px min)                ││
│ │ │  └────┘  │                                 ││
│ │ │[Replace] │                                 ││
│ │ └──────────┘                                 ││
│ │                                              ││
│ │ Service Name *                               ││
│ │ ┌────────────────────────────────┐          ││
│ │ │ Dog Walking                     │          ││
│ │ └────────────────────────────────┘          ││
│ │                                              ││
│ │ Description *                                ││
│ │ ┌────────────────────────────────┐          ││
│ │ │ 30-60 minute walks tailored...  │          ││
│ │ └────────────────────────────────┘          ││
│ │ 85/200 words                                 ││
│ │                                              ││
│ │ Menu Items              [Add Item]           ││
│ │ ┌─ 30-Minute Walk ───────────[Delete Item]─┐││
│ │ │ Name: 30-Minute Walk   Price: $25        │││
│ │ │ ☐ Add-on only                           │││
│ │ └─────────────────────────────────────────┘││
│ │ ┌─ 60-Minute Walk ───────────[Delete Item]─┐││
│ │ │ Name: 60-Minute Walk   Price: $40        │││
│ │ │ ☐ Add-on only                           │││
│ │ └─────────────────────────────────────────┘││
│ └──────────────────────────────────────────────┘│
│                                                  │
│ * Required fields                               │
└─────────────────────────────────────────────────┘
```

**Fields (per service):**
- `photo_url` (image upload, required)
- `type` (text input, required)
- `description` (textarea, 200 words max, required)
- Menu items (at least 1 required):
  - `name` (text input, required)
  - `price` (number input, optional)
  - `is_add_on_only` (checkbox)

---

### Service Areas Section

```
┌─────────────────────────────────────────────────┐
│ Service Areas         [Add Area] [Saving...]    │
├─────────────────────────────────────────────────┤
│                                                  │
│ ┌─ Mission District ────────────────[Delete]─┐ │
│ │                                             │ │
│ │ Area Name *                                 │ │
│ │ ┌────────────────────────────────┐         │ │
│ │ │ Mission District                │         │ │
│ │ └────────────────────────────────┘         │ │
│ │                                             │ │
│ │ Description (Optional)                      │ │
│ │ ┌────────────────────────────────┐         │ │
│ │ │ Including Dolores Park and...   │         │ │
│ │ └────────────────────────────────┘         │ │
│ │ 45/150 words                                │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ * Required field                                │
└─────────────────────────────────────────────────┘
```

**Fields (per area):**
- `name` (text input, required)
- `description` (textarea, 150 words max, optional)

---

### Reviews Section

```
┌─────────────────────────────────────────────────┐
│ Reviews (Optional)      [Add Review] [Saving...] │
├─────────────────────────────────────────────────┤
│                                                  │
│ ┌─ Review from Sarah ───────────────[Delete]─┐ │
│ │                                             │ │
│ │ Review Photo (1/1)                          │ │
│ │ ┌──────────┐                                │ │
│ │ │  ┌────┐  │                                │ │
│ │ │  │IMG │  │  Square format                 │ │
│ │ │  │    │  │  (200x200px min)               │ │
│ │ │  └────┘  │                                │ │
│ │ │[Replace] │                                │ │
│ │ └──────────┘                                │ │
│ │                                             │ │
│ │ Review Text                                 │ │
│ │ ┌────────────────────────────────┐         │ │
│ │ │ Sarah and her team are amazing! │         │ │
│ │ │ Max loves his walks...          │         │ │
│ │ └────────────────────────────────┘         │ │
│ │ 87/150 words                                │ │
│ │                                             │ │
│ │ Owner Name                                  │ │
│ │ ┌────────────────────────────────┐         │ │
│ │ │ Jennifer Davis                  │         │ │
│ │ └────────────────────────────────┘         │ │
│ │                                             │ │
│ │ Pet Details                                 │ │
│ │ ┌────────────────────────────────┐         │ │
│ │ │ Milo, Welsh Corgi               │         │ │
│ │ └────────────────────────────────┘         │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ This section is optional                        │
└─────────────────────────────────────────────────┘
```

**Fields (per review):**
- `photo_url` (image upload, optional)
- `review` (textarea, 150 words max, required if adding review)
- `owner` (text input, required if adding review)
- `pet_details` (text input, optional)

---

### Contact Section

```
┌─────────────────────────────────────────────────┐
│ Contact                         [Saving...]      │
├─────────────────────────────────────────────────┤
│                                                  │
│ Phone Number *                                  │
│ ☑ Use account phone (555-123-4567)              │
│ ┌────────────────────────────────┐             │
│ │ 555-123-4567 (auto-filled)      │             │
│ └────────────────────────────────┘             │
│                                                  │
│ OR uncheck to use different number:             │
│ ☐ Use account phone (555-123-4567)              │
│ ┌────────────────────────────────┐             │
│ │ (415) 555-9876                  │             │
│ └────────────────────────────────┘             │
│                                                  │
│ ─────────────────────────────────────────       │
│                                                  │
│ Email *                                         │
│ ☑ Use account email (emily@example.com)         │
│ ┌────────────────────────────────┐             │
│ │ emily@example.com (auto-filled) │             │
│ └────────────────────────────────┘             │
│                                                  │
│ Booking Link                                    │
│ ┌────────────────────────────────┐             │
│ │ https://calendly.com/emilypets  │             │
│ └────────────────────────────────┘             │
│                                                  │
│ Social Links (Optional)                         │
│ Instagram  ┌──────────────────────┐            │
│            │ @emilypetsitting      │            │
│            └──────────────────────┘            │
│ Facebook   ┌──────────────────────┐            │
│            │ /emilypetsitting      │            │
│            └──────────────────────┘            │
│                                                  │
│ * Required fields                               │
└─────────────────────────────────────────────────┘
```

**Logic:**
- **Checkbox checked**: Use account default (phone_number or email from account)
- **Checkbox unchecked**: Save entered value to `phone_number_alt` or `email_alt`
- **On load**: If `phone_number_alt` exists, uncheck box and show alt value
- **On save**:
  - If checkbox checked: Save account value to display field, clear alt field
  - If checkbox unchecked: Save entered value to alt field

**Fields:**
- `phone_number` (text input, required) - from account or alt
- `phone_number_alt` (stored when checkbox unchecked)
- `email` (text input, required) - from account or alt
- `email_alt` (stored when checkbox unchecked)
- `booking_link` (URL input, optional)
- `instagram_link`, `facebook_link`, `twitter_link`, `tiktok_link` (URL inputs, optional)

---

### FAQs Section

```
┌─────────────────────────────────────────────────┐
│ FAQs (Optional)              [Add FAQ] [Saving...]│
├─────────────────────────────────────────────────┤
│                                                  │
│ ┌─ FAQ 1 ──────────────────────────[Delete]──┐ │
│ │                                             │ │
│ │ Question                                    │ │
│ │ ┌────────────────────────────────┐         │ │
│ │ │ What are your hours?            │         │ │
│ │ └────────────────────────────────┘         │ │
│ │                                             │ │
│ │ Answer                                      │ │
│ │ ┌────────────────────────────────┐         │ │
│ │ │ I'm available 7 days a week...  │         │ │
│ │ └────────────────────────────────┘         │ │
│ │                                             │ │
│ │ [↑] [↓] Reorder                             │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ This section is optional                        │
└─────────────────────────────────────────────────┘
```

**Fields (per FAQ):**
- `question` (text input, required if adding FAQ)
- `answer` (textarea, required if adding FAQ)
- `order` (auto-generated, can drag to reorder)

---

### Policies Section

```
┌─────────────────────────────────────────────────┐
│ Policies (Optional)                    [Saving...]│
├─────────────────────────────────────────────────┤
│                                                  │
│ Select policies to add:                         │
│ ┌─────────────────────────────────────┐        │
│ │ ☐ Booking & Cancellation             │        │
│ │ ☐ Payment & Pricing                  │        │
│ │ ☐ Health & Safety                    │        │
│ │ ☐ Home Access & Security             │        │
│ │ ☐ Communication & Updates            │        │
│ │ ☐ Meet & Greet                       │        │
│ └─────────────────────────────────────┘        │
│                                                  │
│ ┌─ Booking & Cancellation ──────────[Remove]─┐ │
│ │                                             │ │
│ │ Title: Booking & Cancellation (fixed)       │ │
│ │                                             │ │
│ │ Your Policy                                 │ │
│ │ ┌────────────────────────────────┐         │ │
│ │ │ I require at least 24 hours     │         │ │
│ │ │ notice for all bookings.        │         │ │
│ │ │ Cancellations made with less    │         │ │
│ │ │ than 24 hours notice...         │         │ │
│ │ │                                 │         │ │
│ │ │                                 │         │ │
│ │ └────────────────────────────────┘         │ │
│ │                                             │ │
│ │ [↑] [↓] Reorder                             │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ This section is optional                        │
└─────────────────────────────────────────────────┘
```

**Policy Templates (User selects from checkboxes):**
1. Booking & Cancellation
2. Payment & Pricing
3. Health & Safety
4. Home Access & Security
5. Communication & Updates
6. Meet & Greet

**Fields (per selected policy):**
- `title` (fixed, based on selected template)
- `description` (textarea, user writes their own copy)
- `icon` (auto-assigned based on title)
- `order` (drag to reorder)

**Note:** No default text provided - user writes their own policy copy with proper formatting preserved.

---

## Template-Specific Configuration

### Editor Component Parameters

Each section editor component accepts template-specific configuration:

```typescript
interface EditorConfig {
  // Branding
  primaryColor: string;      // e.g., '#2d5f4f'
  accentColor: string;       // e.g., '#e8956b'
  backgroundColor: string;   // e.g., '#faf7f4'

  // Typography
  fontFamily: string;        // e.g., 'DM Sans'
  headingFont: string;       // e.g., 'Crimson Pro'

  // Image Requirements
  featuredImageCount: number;    // e.g., 2 for Pro
  dayToDayImageCount: number;    // e.g., 4 for Pro
  reviewPhotoRequired: boolean;  // e.g., true for Pro

  // Field Requirements
  requiredFields: {
    logo: boolean;
    businessName: boolean;
    tagline: boolean;
    aboutBusiness: boolean;
    // ... etc
  };

  // Styling
  borderRadius: string;      // e.g., '15px'
  spacing: string;           // e.g., '2rem'
  shadowStyle: string;       // e.g., '0 4px 20px rgba(45, 95, 79, 0.1)'
}
```

### Pro Template Config

```typescript
const proEditorConfig: EditorConfig = {
  primaryColor: '#2d5f4f',
  accentColor: '#e8956b',
  backgroundColor: '#faf7f4',
  fontFamily: 'DM Sans, sans-serif',
  headingFont: 'Crimson Pro, serif',
  featuredImageCount: 2,
  dayToDayImageCount: 4,
  reviewPhotoRequired: true,
  requiredFields: {
    logo: true,
    businessName: true,
    tagline: true,
    aboutBusiness: true,
    dayToDayPhotos: true,
    services: true,
  },
  borderRadius: '15px',
  spacing: '2rem',
  shadowStyle: '0 4px 20px rgba(45, 95, 79, 0.1)',
};
```

### Future Classic Template Config

```typescript
const classicEditorConfig: EditorConfig = {
  primaryColor: '#4a7c9e',
  accentColor: '#ff6b6b',
  backgroundColor: '#f8f9fa',
  fontFamily: 'Inter, sans-serif',
  headingFont: 'Playfair Display, serif',
  featuredImageCount: 3,     // Different from Pro
  dayToDayImageCount: 6,     // Different from Pro
  reviewPhotoRequired: false,
  requiredFields: {
    logo: true,
    businessName: true,
    tagline: false,          // Different from Pro
    aboutBusiness: true,
    dayToDayPhotos: false,   // Different from Pro
    services: true,
  },
  borderRadius: '8px',
  spacing: '1.5rem',
  shadowStyle: '0 2px 8px rgba(0, 0, 0, 0.1)',
};
```

## Implementation Architecture

### Component Structure

```
components/
├── editor/
│   ├── shared/
│   │   ├── ImageUploader.tsx        // Accepts count, shows (X/Y)
│   │   ├── RichTextEditor.tsx       // Word count, validation
│   │   ├── ReorderableList.tsx      // Drag-to-reorder
│   │   ├── SaveIndicator.tsx        // Saving/Saved/Error
│   │   └── SectionHeader.tsx        // Title, save button, progress
│   │
│   ├── sections/
│   │   ├── HeaderEditor.tsx
│   │   ├── HeroEditor.tsx
│   │   ├── AboutEditor.tsx
│   │   ├── PersonalEditor.tsx
│   │   ├── ServicesEditor.tsx
│   │   ├── ServiceAreasEditor.tsx
│   │   ├── ReviewsEditor.tsx
│   │   ├── ContactEditor.tsx
│   │   ├── FAQsEditor.tsx
│   │   └── PoliciesEditor.tsx
│   │
│   ├── templates/
│   │   ├── ProTemplateEditor.tsx    // Styled for Pro
│   │   └── ClassicTemplateEditor.tsx // Styled for Classic
│   │
│   ├── TemplateSelector.tsx
│   ├── TemplatePreviewModal.tsx
│   └── EditorContext.tsx            // State management
│
└── types/
    └── editor.ts                     // EditorConfig, etc.
```

### State Management

```typescript
interface EditorState {
  template: 'pro' | 'classic';
  config: EditorConfig;
  data: {
    profile: Partial<Profile>;
    services: Service[];
    galleryPhotos: GalleryPhoto[];
    faqs: FAQ[];
    policies: Policy[];
    serviceAreas: ServiceArea[];
  };
  validation: {
    [section: string]: {
      isValid: boolean;
      errors: string[];
    };
  };
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  activeSection: string;
}
```

## Next Steps

1. ✅ Design specification complete
2. ✅ Database migration created
3. Create ImageUploader component with progress indicators
4. Create TemplatePreviewModal with iframe
5. Build ProTemplateEditor shell with config
6. Implement contact section checkbox logic
7. Create policy selection checkboxes
8. Add validation and progress tracking
9. Implement auto-save with debouncing
10. Test full flow end-to-end
