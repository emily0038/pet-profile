# MDX Blog Setup Guide

Your blog is now set up to use MDX files! Here's what was installed and how to use it.

## What Was Installed

1. **MDX Dependencies** (already installed):
   - `@next/mdx` - Next.js MDX integration
   - `@mdx-js/loader` - MDX file loader
   - `@mdx-js/react` - React MDX components
   - `next-mdx-remote` - For rendering MDX content
   - `gray-matter` - For parsing frontmatter (metadata)

2. **Configuration**:
   - Updated `next.config.ts` to enable MDX support
   - Created `/lib/mdx.ts` with helper functions
   - Created `/components/mdx-components.tsx` for custom MDX components

## File Structure

```
pet-profile/
├── content/
│   └── blog/
│       └── getting-started-pet-sitting.mdx  (example post)
├── lib/
│   └── mdx.ts  (helper functions)
├── components/
│   └── mdx-components.tsx  (custom components for MDX)
└── app/
    └── blog/
        ├── page.tsx  (blog listing - updated to use MDX)
        └── [slug]/
            └── page.tsx  (blog post page - updated to use MDX)
```

## How to Create a New Blog Post

1. Create a new `.mdx` file in `/content/blog/` with the slug as the filename (e.g., `my-new-post.mdx`)

2. Add frontmatter at the top:

```mdx
---
title: "Your Post Title"
date: "2024-12-09"
author: "Your Name"
readTime: "5 min read"
category: "Guide"
excerpt: "A short description of your post"
heroImage: "/path-to-image.jpg"
---
```

3. Write your content using Markdown and JSX:

```mdx
## This is a heading

Regular paragraph text here.

### Subheading

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

**Bold text** and *italic text*

[Link text](/path)

<Callout>
This is a callout box with custom styling!
</Callout>
```

## Available Custom Components

You can use these React components directly in your MDX:

### Callout Component
```mdx
<Callout>
Your important message here with **markdown** support!
</Callout>
```

### BlogFAQ Component
```mdx
<BlogFAQ items={[
  {
    question: "What is pet sitting?",
    answer: <p>Pet sitting is...</p>
  },
  {
    question: "How much does it cost?",
    answer: <p>Prices vary...</p>
  }
]} />
```

## How It Works

1. **Blog Listing** (`/blog`):
   - Calls `getAllPosts()` from `/lib/mdx.ts`
   - Displays all blog posts sorted by date

2. **Individual Post** (`/blog/[slug]`):
   - Calls `getPostBySlug(slug)` from `/lib/mdx.ts`
   - Renders MDX content using `MDXRemote` component
   - Applies custom styling from `mdx-components.tsx`

## Styling

All MDX content is styled through:
- `/components/mdx-components.tsx` - Component-level styling
- `/app/globals.css` - Global prose styling
- Inline styles in the blog post page

## Next Steps

- Replace `/logo.svg` with actual blog post hero images
- Add more blog posts in `/content/blog/`
- Customize styling in `mdx-components.tsx`
- Optionally add MDX plugins (like syntax highlighting) in `next.config.ts`

## Tips

- MDX file names become the URL slug (e.g., `my-post.mdx` → `/blog/my-post`)
- You can use any React component in MDX by importing it
- Frontmatter fields must match the `BlogPost` interface in `/lib/mdx.ts`
- The dev server will hot-reload when you edit MDX files
