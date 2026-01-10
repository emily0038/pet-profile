# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pets Friendz is a Next.js 15 SaaS application that enables pet care professionals to create portfolio websites. Users select from multiple templates, customize their profile through a visual editor, and publish at a subdomain (e.g., `username.petsfriendz.com`).

**Tech Stack**: Next.js 15 (App Router), React 19, Supabase (PostgreSQL + Auth + Storage), Tailwind CSS v4, MDX for blog, Resend for email.

## Essential Commands

```bash
npm run dev           # Development server with Turbopack
npm run build         # Production build
npm run start         # Run production build locally
npm run lint          # ESLint checks
```

## Architecture Overview

### Routing Structure

```
/app
├── [username]/           # Public profile pages (dynamic route by domain field)
├── /editor               # Protected area with template selector
│   └── /[template]/      # Template-specific editors (pro, bubbly, sleek)
├── /blog                 # MDX-powered blog
├── /actions/             # Server actions for all mutations
└── /api/send             # Email endpoint (Resend)
```

**Key Routing Concept**: The `[username]` route uses the `profiles.domain` field (NOT user_id) to load public pages. In production, middleware rewrites `username.petsfriendz.com` → `/username` internally. Set `ENABLE_SUBDOMAINS=false` locally for path-based routing.

### Template System

Templates are defined in `lib/templates/`:
- **editorConfig.ts**: Defines what fields/features each template supports
- **registry.ts**: Maps template IDs to React components
- **types.ts**: Shared TypeScript interfaces

Each template lives in `components/templates/[template-name]/` with its own components and styles.

**To add a new template**:
1. Create config in `editorConfig.ts` (specify required fields, max lengths, enabled features)
2. Build component in `components/templates/`
3. Register in `registry.ts` (TEMPLATES metadata + TEMPLATE_COMPONENTS mapping)
4. Add editor route in `/app/editor/[template]/page.tsx`

### Database Schema (Supabase)

**Core tables**:
- `profiles`: User profile with business info, social links, and `template_id` (determines if published)
- `gallery_photos`: Photos categorized as 'hero' or 'about' with `order` for sorting
- `services` + `service_menu_items`: Services with pricing (one-to-many)
- `faqs`, `policies`, `service_areas`, `reviews`: Template-specific content with `order` fields

**Important**: Use `profiles.domain` for public routing, `profiles.user_id` for ownership checks.

### Editor System Architecture

The editor uses a section-based approach:

```
TemplateEditor (container)
  ├── Loads profile + gallery data on mount
  ├── Manages section expansion state
  └── Renders sections based on template config

Each Section Component:
  ├── Client component with 'use client'
  ├── Loads its own data from Supabase
  ├── Validates against template config (max lengths, required fields)
  ├── Calls server actions for mutations
  └── Uses useSaveStatus hook for save feedback
```

**Section files**: `components/editor/sections/[SectionName].tsx`

**Server actions**: `app/actions/editor.ts` - All mutations go through server actions, never direct Supabase calls from client.

### Data Flow

```
User Input → Client Component → Server Action → Supabase Update
  → revalidatePath() → ISR cache invalidation → Public page regenerates
```

Always call `revalidatePath()` after mutations to invalidate Next.js cache.

### Subdomain Routing

Controlled by `ENABLE_SUBDOMAINS` environment variable:
- **Local dev**: `false` - uses path-based URLs (`/username`)
- **Production**: `true` - uses subdomains (`username.petsfriendz.com`)

**How it works**: Middleware intercepts requests, extracts subdomain, rewrites to `/[username]` route. Old path-based URLs get 301 redirects.

**Reserved**: Subdomains `www`, `api`, `app`, `admin`, `blog` and paths `/editor`, `/login`, `/signup` are protected from profile routing.

**Utilities**: Use `getProfileUrl()` and `getProfilePath()` from `utils/url.ts` to generate correct URLs in both modes.

### Authentication & Authorization

- **Middleware** (`middleware.ts`): Refreshes Supabase session, protects `/editor` routes, handles subdomain routing
- **Protected routes**: `/editor/*` requires authentication (redirects to `/login`)
- **Public profiles**: Anyone can view if `template_id` is set; only owner can view unpublished profiles
- **Server actions**: Check `await supabase.auth.getUser()` for authorization

### MDX Blog System

Blog posts live in `/content/blog/*.mdx` with frontmatter:
- `draft: true` hides posts from public listing
- `getAllPosts()` reads files, parses with gray-matter, filters drafts
- Custom MDX components: `<Callout>`, `<BlogFAQ>`, `<CTABox>`, `<BlogImage>`

See `MDX_SETUP.md` for full component documentation.

## Important Patterns

### Photo Upload Flow

```typescript
// Client: PhotoUploadModal
1. User selects file
2. uploadPhoto() server action
   - Creates filename: `${user.id}/${timestamp}.${ext}`
   - Uploads to Supabase Storage bucket 'profile-photos'
   - Returns public URL
3. saveGalleryPhoto() creates DB record with category
```

### Publishing Flow

1. User selects template in `/editor`
2. Template editor auto-saves changes
3. `updateTemplateId()` sets `profiles.template_id`
4. Profile becomes public at `/{domain}`
5. Sitemap automatically includes published profiles (where `template_id IS NOT NULL`)

### Profile Access Control

```typescript
// In [username]/page.tsx
const isViewMode = user && user.id === profile.user_id
if (!profile.template_id && !isViewMode) {
  notFound() // Unpublished + not owner = 404
}
```

## File Organization

**Key directories**:
- `app/actions/` - All server actions (auth, editor operations, email)
- `components/editor/` - Editor UI and section components
- `components/templates/` - Template-specific rendering components
- `lib/templates/` - Template configurations and registry
- `utils/` - URL helpers, Supabase clients, username generation
- `hooks/` - Custom React hooks (useSaveStatus)
- `content/blog/` - MDX blog posts

## Environment Variables

Required in `.env.local`:
```
RESEND_API_KEY                    # Email service
NEXT_PUBLIC_SUPABASE_URL          # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Supabase public key
NEXT_PUBLIC_ROOT_DOMAIN           # petsfriendz.com
ENABLE_SUBDOMAINS                 # false (local), true (production)
```

## Common Development Tasks

**Adding a new profile field**:
1. Add to `Profile` interface in `lib/templates/types.ts`
2. Update database schema (Supabase dashboard or migration)
3. Add to relevant template configs in `editorConfig.ts`
4. Create/update editor section component
5. Add server action for saving
6. Update template rendering component to display field

**Creating a new editor section**:
1. Create `components/editor/sections/NewSection.tsx`
2. Follow existing section patterns (client component, useSaveStatus, server actions)
3. Add to TemplateEditor's `renderSectionContent()` switch statement
4. Add section to template config `sections` array in `editorConfig.ts`

**Modifying template behavior**:
- Change what's required/optional: Update template config in `editorConfig.ts`
- Change display/styling: Edit template component in `components/templates/[template]/`
- Change data structure: Update both config AND database schema

## Testing Subdomain Routing Locally

Set in `.env.local`:
```
ENABLE_SUBDOMAINS=true
NEXT_PUBLIC_ROOT_DOMAIN=localhost:3000
```

Access at `http://username.localhost:3000` (works in modern browsers without hosts file).

For production-like testing, use Vercel preview deployments with wildcard domains configured.

## Important Notes

- **Server Components by Default**: Only add `'use client'` when necessary (state, hooks, events)
- **Turbopack**: Dev server uses Turbopack for fast builds
- **No Direct DB Calls**: Client components must use server actions for mutations
- **Cache Invalidation**: Always call `revalidatePath()` after data changes
- **Domain vs Username**: The `profiles.domain` field is used for routing; it's a slugified unique identifier
- **Template Registry**: Always update `lib/templates/registry.ts` when adding templates
