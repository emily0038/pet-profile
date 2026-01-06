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

### CTABox Component

Use the `CTABox` component to create call-to-action sections with text and an optional image.

**Basic Usage (No Image):**
```mdx
<CTABox
  heading="Ready to grow your business?"
  body="Join our waitlist to create your professional profile in minutes."
  buttonText="Join the Waitlist"
  buttonUrl="/waitlist"
/>
```

**With Image (Right Side):**
```mdx
<CTABox
  heading="Ready to build your website but not sure where to start?"
  body="Choose one of our free templates and build a custom page with Pets Friendz in minutes."
  buttonText="Browse Templates"
  buttonUrl="/editor"
  imageSrc="/template-selector.png"
  imageAlt="Template selection interface"
  imageWidth={300}
  imageHeight={200}
/>
```

**With Image on Left:**
```mdx
<CTABox
  heading="Your heading here"
  body="Your message here."
  buttonText="Click Here"
  buttonUrl="/page"
  imageSrc="/your-image.png"
  imageAlt="Image description"
  imagePosition="left"
/>
```

**Custom Text Color:**
```mdx
<CTABox
  heading="Custom styled CTA"
  body="This has a custom text color!"
  buttonText="Learn More"
  buttonUrl="/about"
  textColor="#8B0000"
/>
```

**With JSX Body:**
```mdx
<CTABox
  heading="Advanced Example"
  body={
    <>
      <p>You can use <strong>any JSX</strong> in the body!</p>
      <ul>
        <li>Bullet points</li>
        <li>Links</li>
        <li>Anything you need</li>
      </ul>
    </>
  }
  buttonText="Get Started"
  buttonUrl="/signup"
/>
```

**Props:**
- `heading` (required): Main heading text
- `body` (required): Body text or JSX content
- `buttonText` (optional): CTA button text
- `buttonUrl` (optional): Button destination URL
- `imageSrc` (optional): Path to image
- `imageAlt` (optional): Image alt text
- `imageWidth` (optional): Image width in pixels (default: 300)
- `imageHeight` (optional): Image height in pixels (default: 200)
- `textColor` (optional): Text color hex (default: '#000000')
- `imagePosition` (optional): 'left' or 'right' (default: 'right')

**Fixed Styling:**
- Background color is always light purple (#E4E1FF)
- Button is always styled with white text on purple (#9185FF) background

**Features:**
- Responsive 2-column grid (stacks on mobile)
- Rounded corners with padding
- Customizable colors and layout
- Optional image and button
- Supports JSX in body content

### BlogImage Component

Use the `BlogImage` component to add images to your blog posts with floating and caption support.

**Basic Usage (Centered):**
```mdx
<BlogImage
  src="/blog/my-image.jpg"
  alt="Description of image"
  width={600}
  height={400}
/>
```

**Float Right (Text wraps on left):**
```mdx
<BlogImage
  src="/blog/my-image.jpg"
  alt="Description of image"
  width={400}
  height={300}
  float="right"
/>
```

**Float Left (Text wraps on right):**
```mdx
<BlogImage
  src="/blog/my-image.jpg"
  alt="Description of image"
  width={400}
  height={300}
  float="left"
/>
```

**With Custom Caption:**
```mdx
<BlogImage
  src="/blog/my-image.jpg"
  alt="Description of image"
  width={500}
  height={350}
  float="right"
  caption="This is a custom caption that appears below the image"
/>
```

**Props:**
- `src` (required): Path to image (usually in `/public/blog/`)
- `alt` (required): Alt text for accessibility
- `width` (optional): Image width in pixels (default: 400)
- `height` (optional): Image height in pixels (default: 300)
- `float` (optional): 'left', 'right', or 'none' (default: 'none')
- `caption` (optional): Custom caption text (if omitted, uses alt text)

**Image Features:**
- Automatically responsive (max-width: 100%)
- Rounded corners
- Subtle shadow
- Optimized with Next.js Image component
- Caption displayed in italic gray text below image

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

## Image Organization

**Recommended Structure:**
```
public/
└── blog/
    ├── best-app-for-pet-sitters.png     (hero images)
    ├── rover-screenshot.jpg              (inline images)
    ├── wag-app-interface.png
    └── ...
```

**Hero Images:**
- Specified in frontmatter: `heroImage: "/blog/image-name.jpg"`
- Displayed at top of blog post
- Should be high quality (min 1200px wide)

**Inline Images:**
- Used with `<BlogImage>` component
- Store in `/public/blog/` directory
- Reference with `/blog/image-name.jpg`

## Next Steps

- Add blog post images to `/public/blog/`
- Add more blog posts in `/content/blog/`
- Customize styling in `mdx-components.tsx`
- Optionally add MDX plugins (like syntax highlighting) in `next.config.ts`

## Tips

- MDX file names become the URL slug (e.g., `my-post.mdx` → `/blog/my-post`)
- You can use any React component in MDX by importing it
- Frontmatter fields must match the `BlogPost` interface in `/lib/mdx.ts`
- The dev server will hot-reload when you edit MDX files
