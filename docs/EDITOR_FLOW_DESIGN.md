# Updated Editor Flow Design

## Overview
A new, streamlined editor experience that allows users to select a template, preview it, and then edit content organized by sections that match the template structure.

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

#### Features
- Card-based template selection
- Thumbnail preview on each card
- "Preview" button opens full scrollable preview in modal
- "Select" button proceeds to editor for that template
- Template cards show key features/highlights

### 2. Template Preview Modal

#### Layout
```
┌─────────────────────────────────────────────────┐
│  Pro Template Preview              [X] Close    │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │  [Full scrollable iframe/preview]        │  │
│  │                                          │  │
│  │  Shows complete template with sample     │  │
│  │  data, all sections visible              │  │
│  │                                          │  │
│  │  ↕️ Scroll to see entire template        │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  [Cancel]                    [Select Template]  │
└─────────────────────────────────────────────────┘
```

#### Features
- Full-height modal with scrollable content area
- Shows template with realistic sample data
- Mobile-responsive preview toggle
- Close button to return to selection
- Select button proceeds to editor

### 3. Pro Template Editor

#### Navigation Structure
Section-based accordion or tab navigation:
1. Header
2. Hero
3. About
4. Services
5. Service Areas
6. Reviews
7. Contact
8. FAQs
9. Policies

#### Section Details

##### Header Section
```
┌─────────────────────────────────────────────────┐
│ Header                                    [Save] │
├─────────────────────────────────────────────────┤
│                                                  │
│ Logo                                            │
│ ┌─────────────────────────────────────┐        │
│ │ [Upload Image]    [Preview]         │        │
│ └─────────────────────────────────────┘        │
│                                                  │
│ Business Name                                   │
│ ┌─────────────────────────────────────┐        │
│ │ [Text Input]                         │        │
│ └─────────────────────────────────────┘        │
└─────────────────────────────────────────────────┘
```

Fields:
- `logo_url` (image upload)
- `business_name` (text input)

##### Hero Section
```
┌─────────────────────────────────────────────────┐
│ Hero                                      [Save] │
├─────────────────────────────────────────────────┤
│                                                  │
│ Business Tagline                                │
│ ┌─────────────────────────────────────┐        │
│ │ [Text Input]                         │        │
│ └─────────────────────────────────────┘        │
│                                                  │
│ Featured Images (2 required)                    │
│ ┌──────────┐  ┌──────────┐                     │
│ │[Upload 1]│  │[Upload 2]│                     │
│ │          │  │          │                     │
│ └──────────┘  └──────────┘                     │
└─────────────────────────────────────────────────┘
```

Fields:
- `business_tagline` (text input, 100 char limit)
- Featured gallery photos (2 images, category='featured')

##### About Section
```
┌─────────────────────────────────────────────────┐
│ About                                     [Save] │
├─────────────────────────────────────────────────┤
│                                                  │
│ Business Pitch                                  │
│ ┌─────────────────────────────────────┐        │
│ │ [Textarea - 300 words max]           │        │
│ │                                      │        │
│ └─────────────────────────────────────┘        │
│                                                  │
│ Day-to-Day Images (4 recommended)               │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐               │
│ │[1]  │ │[2]  │ │[3]  │ │[4]  │               │
│ └─────┘ └─────┘ └─────┘ └─────┘               │
└─────────────────────────────────────────────────┘
```

Fields:
- `about_business` (textarea, rich text editor)
- Day-to-day gallery photos (up to 4, category='day-to-day')

##### Personal Section
```
┌─────────────────────────────────────────────────┐
│ Personal                                  [Save] │
├─────────────────────────────────────────────────┤
│                                                  │
│ Profile Photo                                   │
│ ┌──────────┐                                    │
│ │[Upload]  │                                    │
│ │          │                                    │
│ └──────────┘                                    │
│                                                  │
│ Personal Tagline                                │
│ ┌─────────────────────────────────────┐        │
│ │ [Text Input]                         │        │
│ └─────────────────────────────────────┘        │
│                                                  │
│ Personal Bio                                    │
│ ┌─────────────────────────────────────┐        │
│ │ [Textarea - 200 words max]           │        │
│ │                                      │        │
│ └─────────────────────────────────────┘        │
└─────────────────────────────────────────────────┘
```

Fields:
- `profile_photo_url` (image upload)
- `personal_tagline` (text input, 80 char limit)
- `about_me` (textarea)

##### Services Section
```
┌─────────────────────────────────────────────────┐
│ Services                    [Add Service] [Save] │
├─────────────────────────────────────────────────┤
│                                                  │
│ ┌─ Service 1 ─────────────────────────[Delete]─┐│
│ │                                              ││
│ │ Service Image                                ││
│ │ ┌──────────┐                                 ││
│ │ │[Upload]  │                                 ││
│ │ └──────────┘                                 ││
│ │                                              ││
│ │ Service Type                                 ││
│ │ ┌────────────────────────────────┐          ││
│ │ │ [Text Input]                    │          ││
│ │ └────────────────────────────────┘          ││
│ │                                              ││
│ │ Description                                  ││
│ │ ┌────────────────────────────────┐          ││
│ │ │ [Textarea]                      │          ││
│ │ └────────────────────────────────┘          ││
│ │                                              ││
│ │ Menu Items              [Add Item]           ││
│ │ ┌─ Item 1 ──────────────────[Delete Item]─┐ ││
│ │ │ Name: [Input]  Price: [$Input]          │ ││
│ │ │ ☐ Add-on only                           │ ││
│ │ └─────────────────────────────────────────┘ ││
│ └──────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

Fields (per service):
- `photo_url` (NEW - image upload)
- `type` (text input)
- `description` (textarea)
- Menu items:
  - `name` (text input)
  - `price` (number input)
  - `is_add_on_only` (checkbox)

##### Service Areas Section
```
┌─────────────────────────────────────────────────┐
│ Service Areas         [Add Area] [Save]         │
├─────────────────────────────────────────────────┤
│                                                  │
│ ┌─ Area 1 ──────────────────────────[Delete]─┐ │
│ │                                             │ │
│ │ Area Name                                   │ │
│ │ ┌────────────────────────────────┐         │ │
│ │ │ [Text Input]                    │         │ │
│ │ └────────────────────────────────┘         │ │
│ │                                             │ │
│ │ Description (optional)                      │ │
│ │ ┌────────────────────────────────┐         │ │
│ │ │ [Textarea]                      │         │ │
│ │ └────────────────────────────────┘         │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

Fields (per area):
- `name` (text input)
- `description` (textarea, optional)

##### Reviews Section
```
┌─────────────────────────────────────────────────┐
│ Reviews                 [Add Review] [Save]     │
├─────────────────────────────────────────────────┤
│                                                  │
│ ┌─ Review 1 ─────────────────────────[Delete]─┐│
│ │                                              ││
│ │ Review Photo                                 ││
│ │ ┌──────────┐                                 ││
│ │ │[Upload]  │                                 ││
│ │ └──────────┘                                 ││
│ │                                              ││
│ │ Review Text                                  ││
│ │ ┌────────────────────────────────┐          ││
│ │ │ [Textarea - 150 words max]      │          ││
│ │ └────────────────────────────────┘          ││
│ │                                              ││
│ │ Owner Name                                   ││
│ │ ┌────────────────────────────────┐          ││
│ │ │ [Text Input]                    │          ││
│ │ └────────────────────────────────┘          ││
│ │                                              ││
│ │ Pet Details (e.g., "Max, Golden Retriever")  ││
│ │ ┌────────────────────────────────┐          ││
│ │ │ [Text Input]                    │          ││
│ │ └────────────────────────────────┘          ││
│ └──────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

Fields (review gallery photos with category='review'):
- `photo_url` (image upload)
- `review` (textarea, 150 words max)
- `owner` (text input)
- `pet_details` (text input)

##### Contact Section
```
┌─────────────────────────────────────────────────┐
│ Contact                                   [Save] │
├─────────────────────────────────────────────────┤
│                                                  │
│ Phone Number                                    │
│ ┌────────────────────────────────┐             │
│ │ [Text Input]                    │             │
│ └────────────────────────────────┘             │
│ ☑ Use account phone (555-123-4567)              │
│                                                  │
│ Alternative Phone (optional)                    │
│ ┌────────────────────────────────┐             │
│ │ [Text Input]                    │             │
│ └────────────────────────────────┘             │
│                                                  │
│ Email                                           │
│ ┌────────────────────────────────┐             │
│ │ [Text Input]                    │             │
│ └────────────────────────────────┘             │
│ ☑ Use account email (user@example.com)          │
│                                                  │
│ Alternative Email (optional)                    │
│ ┌────────────────────────────────┐             │
│ │ [Text Input]                    │             │
│ └────────────────────────────────┘             │
│                                                  │
│ Booking Link                                    │
│ ┌────────────────────────────────┐             │
│ │ [URL Input]                     │             │
│ └────────────────────────────────┘             │
│                                                  │
│ Social Links                                    │
│ Instagram: [URL Input]                          │
│ Facebook:  [URL Input]                          │
│ Twitter:   [URL Input]                          │
│ TikTok:    [URL Input]                          │
└─────────────────────────────────────────────────┘
```

Fields:
- `phone_number` (text input with checkbox to use account default)
- `phone_number_alt` (NEW - text input, optional)
- `email` (text input with checkbox to use account default)
- `email_alt` (NEW - text input, optional)
- `booking_link` (URL input)
- Social links (all URL inputs)

##### FAQs Section
```
┌─────────────────────────────────────────────────┐
│ FAQs                         [Add FAQ] [Save]   │
├─────────────────────────────────────────────────┤
│                                                  │
│ ┌─ FAQ 1 ────────────────────────────[Delete]─┐│
│ │                                              ││
│ │ Question                                     ││
│ │ ┌────────────────────────────────┐          ││
│ │ │ [Text Input]                    │          ││
│ │ └────────────────────────────────┘          ││
│ │                                              ││
│ │ Answer                                       ││
│ │ ┌────────────────────────────────┐          ││
│ │ │ [Textarea]                      │          ││
│ │ └────────────────────────────────┘          ││
│ │                                              ││
│ │ [↑] [↓] Reorder                              ││
│ └──────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

Fields (per FAQ):
- `question` (text input)
- `answer` (textarea)
- `order` (drag to reorder)

##### Policies Section
```
┌─────────────────────────────────────────────────┐
│ Policies                    [Add Policy] [Save] │
├─────────────────────────────────────────────────┤
│                                                  │
│ Pre-defined Templates:                          │
│ [+ Booking & Cancellation]                      │
│ [+ Payment & Pricing]                           │
│ [+ Health & Safety]                             │
│ [+ Home Access & Security]                      │
│ [+ Communication & Updates]                     │
│ [+ Meet & Greet]                                │
│                                                  │
│ Custom Policies:                                │
│                                                  │
│ ┌─ Policy 1: Booking & Cancellation [Delete]─┐ │
│ │                                             │ │
│ │ Title                                       │ │
│ │ ┌────────────────────────────────┐         │ │
│ │ │ Booking & Cancellation          │         │ │
│ │ └────────────────────────────────┘         │ │
│ │                                             │ │
│ │ Description                                 │ │
│ │ ┌────────────────────────────────┐         │ │
│ │ │ [Textarea with template text]   │         │ │
│ │ │ [User can edit]                 │         │ │
│ │ └────────────────────────────────┘         │ │
│ │                                             │ │
│ │ [↑] [↓] Reorder                             │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

Pre-defined Policy Templates:
1. **Booking & Cancellation**
   - Default text about booking requirements, cancellation policy, refunds
2. **Payment & Pricing**
   - Default text about payment methods, pricing structure, additional fees
3. **Health & Safety**
   - Default text about vaccination requirements, emergency protocols
4. **Home Access & Security**
   - Default text about key policies, home security, privacy
5. **Communication & Updates**
   - Default text about check-ins, photos, emergency contact
6. **Meet & Greet**
   - Default text about initial consultation requirements

Fields (per policy):
- `title` (text input, pre-filled for templates)
- `description` (textarea, pre-filled for templates, editable)
- `icon` (auto-assigned based on title)
- `order` (drag to reorder)

## Database Schema Updates

### New Fields in `profiles` table
```sql
ALTER TABLE profiles
ADD COLUMN phone_number_alt VARCHAR(20),
ADD COLUMN email_alt VARCHAR(255);
```

### New Field in `services` table
```sql
ALTER TABLE services
ADD COLUMN photo_url TEXT;
```

## Technical Implementation

### Components to Create

1. **TemplateSelector.tsx**
   - Grid of template cards
   - Preview and Select buttons
   - Template metadata display

2. **TemplatePreviewModal.tsx**
   - Full-screen modal with scrollable iframe
   - Sample data injection
   - Mobile/desktop toggle

3. **ProTemplateEditor.tsx**
   - Section-based accordion layout
   - Auto-save functionality
   - Live preview option

4. **Section Components** (one per section):
   - HeaderEditor.tsx
   - HeroEditor.tsx
   - AboutEditor.tsx
   - ServicesEditor.tsx
   - ServiceAreasEditor.tsx
   - ReviewsEditor.tsx
   - ContactEditor.tsx
   - FAQsEditor.tsx
   - PoliciesEditor.tsx

5. **Shared Editor Components**:
   - ImageUploader.tsx
   - RichTextEditor.tsx
   - ReorderableList.tsx
   - SaveIndicator.tsx

### State Management
- Use React Context for editor state
- Optimistic updates with rollback on error
- Auto-save with debouncing (2 seconds)
- Unsaved changes warning on navigation

### Validation Rules
- Required fields highlighted
- Character limits enforced
- Image size/format validation
- URL format validation
- Phone number format validation

## User Experience

### Progress Tracking
- Show completion percentage
- Highlight incomplete required sections
- "Publish" button only enabled when all required fields complete

### Auto-save
- Save indicator in header ("Saving...", "Saved", "Error")
- Auto-save every 2 seconds after changes
- Manual save button for immediate save

### Preview
- "Preview" button in header
- Opens template in new tab with current data
- Draft mode (not publicly visible)

### Mobile Responsive
- Stack sections vertically on mobile
- Touch-friendly drag handles
- Optimized image upload on mobile

## Policy Templates Content

### 1. Booking & Cancellation
```
We require at least 24 hours notice for all bookings. Cancellations made with less than 24 hours notice may be subject to a cancellation fee. We understand that emergencies happen - please contact us as soon as possible if you need to cancel or reschedule.
```

### 2. Payment & Pricing
```
Payment is due at the time of service unless other arrangements have been made in advance. We accept cash, credit cards, and digital payments. Prices are based on the services selected and the number of pets. Additional fees may apply for holidays, last-minute bookings, or special requests.
```

### 3. Health & Safety
```
All pets must be up to date on vaccinations and flea/tick prevention. Please inform us of any medical conditions, behavioral concerns, or special needs your pet may have. In case of emergency, we will contact you immediately and seek veterinary care if needed.
```

### 4. Home Access & Security
```
We treat your home with the utmost respect and care. All keys and access codes are kept secure and confidential. We ensure your home is locked and secure after each visit. Please provide clear instructions for alarm systems and any special access requirements.
```

### 5. Communication & Updates
```
We provide regular updates during each visit, including photos when possible. You can reach us anytime with questions or concerns. We'll confirm all bookings 24 hours in advance and provide a summary after each service.
```

### 6. Meet & Greet
```
We require a complimentary meet and greet before the first service. This allows us to meet your pet, learn about their routine and preferences, and answer any questions you may have. It's also a great opportunity for your pet to get comfortable with us!
```

## Next Steps

1. Create database migration for new fields
2. Build TemplateSelector component
3. Build TemplatePreviewModal component
4. Create ProTemplateEditor shell with navigation
5. Implement each section editor component
6. Add auto-save functionality
7. Implement validation and error handling
8. Add preview functionality
9. Test full flow end-to-end
10. Deploy and gather user feedback
