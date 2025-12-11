# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Deploy Faster is a website template marketplace built with Next.js 15, Sanity CMS, and deployed on Netlify. It sells professionally designed website templates with multi-currency support (NGN, USD, GBP) and includes a contact form system powered by Netlify Functions.

## Development Commands

### Running the Application

```bash
npm run dev          # Start Next.js development server on http://localhost:3000
npm run build        # Build production bundle
npm start            # Start production server
npm run lint         # Run ESLint
```

### Sanity Studio

- The Sanity Studio is mounted at `/app/studio/[[...tool]]/page.tsx`
- Access it at `http://localhost:3000/studio` when running dev server
- Sanity project ID: `wk0p7c5o`
- Dataset: `production`

## Architecture

### Content Management System

The application uses Sanity CMS as a headless CMS with two main content types:

1. **Template** (`sanity/schemaTypes/index.ts`): Website template listings

   - Multi-currency pricing (NGN, USD, GBP) stored in a `pricing` object
   - Legacy single-currency fields (`price`, `currency`) marked as deprecated
   - Cloudinary URLs for images (thumbnails and gallery)
   - Categories: Portfolio, E-commerce, Business, Restaurant, Agency, Blog, SaaS, Real Estate, Energy & Industrial

2. **Blog** (`sanity/schemaTypes/blog.ts`): Blog posts with rich text content
   - Uses Portable Text for content rendering
   - Sanity image assets with hotspot support

### Data Layer

- **Client-side Sanity client**: `lib/sanity.ts` - Uses `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
- **Server-side client**: Uses `SANITY_API_TOKEN` for authenticated operations
- **GROQ Queries**: Centralized in `lib/sanity-queries.ts`
  - `templatesQuery`: All templates ordered by featured status and creation date
  - `templateBySlugQuery`: Single template by slug with full details including `longDescription`
  - `featuredTemplatesQuery`: Only featured templates
  - `templatesByCategoryQuery`: Filter by category
  - `categoriesQuery` and `tagsQuery`: Get unique values for filters

### Currency System

The app implements a global currency switcher via React Context:

- **Context**: `contexts/CurrencyContext.tsx`
- Supported currencies: NGN (₦), USD ($), GBP (£)
- User preference stored in `localStorage` as `preferred-currency`
- `formatPrice()` function handles both new multi-currency pricing and legacy single-currency templates
- Legacy conversion rates (rough estimates): NGN → USD (÷500), NGN → GBP (÷545.45)

### Contact/Purchase Flow

Contact form submissions are handled via Netlify Functions:

- **Function**: `netlify/functions/contact.js`
- Uses **nodemailer** (not Resend, despite the API key in `.env.local`)
- **Environment variables required**:
  - `GMAIL_USER`: Gmail address for sending
  - `GMAIL_APP_PASSWORD`: Gmail app password
  - `ADMIN_EMAIL`: Where to send admin notifications
- Sends two emails in parallel:
  1. Admin notification with full request details
  2. Auto-reply to client confirming receipt
- Accepts template metadata (`templateId`, `templateTitle`, `templatePrice`, etc.) along with contact info
- Service types: `template-only` or full setup service
- Launch timelines: `3-6-days`, `1-2-weeks`, `2-3-weeks`

### Deployment

- **Platform**: Netlify
- **Functions directory**: `netlify/functions`
- **Config**: `netlify.toml` - Configures CORS headers for functions
- **Build**: Uses Next.js with `@netlify/plugin-nextjs`

## Component Structure

### Main Components

- **Header** (`components/Header.tsx`): Navigation with currency selector
- **Footer** (`components/Footer.tsx`): Site footer
- **TemplateCard** (`components/TemplateCard.tsx`): Template listing card
- **SearchAndFilter** (`components/SearchAndFilter.tsx`): Template filtering UI
- **ContactForm** (`components/ContactForm.tsx`): Contact/purchase form
- **CurrencySelector** (`components/CurrencySelector.tsx`): Currency dropdown

### Routing

- `/` - Homepage
- `/template/[slug]` - Individual template detail page
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog post
- `/studio` - Sanity Studio (CMS admin)

## Data Upload Scripts

Root-level Node.js scripts for bulk data operations:

- `upload-templates.js`: Bulk upload templates to Sanity
- `upload-blogs.js`: Bulk upload blog posts to Sanity
- `debug-templates.js`: Debug template data
- `delete-templates.js`: Delete templates from Sanity

These scripts use the server-side Sanity client with the API token.

## Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=wk0p7c5o
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<token>
RESEND_API_KEY=<key>        # Present but not actively used
ADMIN_EMAIL=<email>
```

For Netlify Functions to work:

```
GMAIL_USER=<gmail-address>
GMAIL_APP_PASSWORD=<app-password>
ADMIN_EMAIL=<admin-email>
```

## Image Handling

- **External images**: Hosted on Cloudinary
- **Next.js config**: Allows images from `images.unsplash.com`, `res.cloudinary.com`, `cdn.sanity.io`
- **Template thumbnails**: Direct Cloudinary URLs
- **Blog images**: Sanity image assets using `@sanity/image-url`

## Build Configuration

- **TypeScript**: Enabled but build errors ignored (`ignoreBuildErrors: true`)
- **ESLint**: Enabled but ignored during builds (`ignoreDuringBuilds: true`)
- **Font**: Inter from Google Fonts with CSS variable `--font-inter`
- **Styling**: Tailwind CSS v4 with PostCSS
- **React**: v19 with React Server Components

## Important Notes

1. **Multi-currency pricing**: New templates should use the `pricing: { ngn, usd, gbp }` structure. Legacy `price` and `currency` fields are deprecated.
2. **Email service**: Despite having a `RESEND_API_KEY`, the contact form uses nodemailer with Gmail SMTP.
3. **Content structure**: Templates can have a `longDescription` (Portable Text array) for detailed pages, separate from the short `description`.
4. **Slug generation**: Both templates and blogs use Sanity's slug type with auto-generation from title.
5. **Featured content**: Both templates and blogs have a `featured` boolean field for highlighting.

- Do not populate code files with excessive comments.
- Do not run the project automatically because I prefer running it myself.