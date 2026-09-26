# 0001. Adopt Next.js App Router and pnpm for Cubic Pools Group Website

**Date**: 2026-09-26
**Status**: Accepted

## Summary

This decision adopts Next.js App Router with TypeScript, Tailwind CSS, and shadcn accessible primitives as the core web stack for Cubic Pools Group. It uses pnpm for dependency management and establishes a typed local data adapter layer that easily swaps for a headless CMS. This foundation provides fast page loading, strong search engine visibility, accessible dialogs, and a clean maintainable project architecture.

## Decision

**Chosen option**: Option 1: Next.js App Router with TypeScript and Tailwind CSS

We adopt Next.js App Router with TypeScript, Tailwind CSS design tokens, shadcn UI primitives, pnpm package management, and a typed local CMS adapter layer.

## Proposed stack

| Layer | Choice | Reason |
|---|---|---|
| Language | TypeScript | Provides end to end type safety across data contracts, UI components, and API routes |
| Framework | Next.js App Router (React) | Supports static page generation, server API routes, metadata, and image optimization |
| Package Manager | pnpm | Fast, disk efficient package installation with strict dependency isolation |
| Styling | Tailwind CSS | Utility styling powered by luxury pool design tokens and CSS variables |
| UI Primitives | shadcn and Radix UI | Accessible headless dialogs, dropdowns, and form elements with full keyboard support |
| State and Data Fetching | TanStack Query and URL Params | Server generation with URL search parameters for filters and query caching for modals |
| Forms and Validation | React Hook Form and Zod | Type safe client form validation matching server route schema validation |
| Image Optimization | Next.js next/image | Automatic WebP conversion, responsive sizing, and lazy loading |
| Animation | Framer Motion | Smooth modal transitions and accessible micro interactions |
| Content Layer | Typed Local CMS Adapter | Decoupled interface with mock seed data, ready to swap for a headless CMS |
| Testing | Vitest and Playwright | Fast unit tests and browser end to end validation for interactive modals |

## Project layout and path aliases

The codebase adopts a domain driven folder structure under `src/` with `@/*` mapped to `./src/*` in `tsconfig.json`:

```
src/
  app/
    (marketing)/
      about/page.tsx
      gallery/page.tsx
      products/page.tsx
      contact/page.tsx
    api/
      contact/route.ts
      products/route.ts
  components/
    ui/          # shadcn primitives (button, dialog, card, badge, skeleton)
    layout/      # Header, Footer, Navigation, MobileMenu
    sections/    # Hero, TrustBar, ValuesGrid, TestimonialsCarousel
    products/    # ProductCard, ProductGrid, ProductModal
    gallery/     # GalleryGrid, Lightbox
  lib/
    data/        # CMS adapter interface and mock data providers
    hooks/       # useModal, useScrollLock, useMediaQuery, useFocusTrap
    utils/       # cn(), formatters, validators
  types/         # Shared TypeScript interfaces (Product, GalleryItem, Testimonial)
  styles/        # globals.css, theme tokens
```

## Contact and enquiry workflow

Contact submissions pass through `src/app/api/contact/route.ts` with:
- Zod schema validation matching client form constraints
- In memory IP rate limiting to prevent abuse
- Hidden honeypot field to filter automated spam bots
- Pluggable notification service interface (logs in development, connects to Resend or SendGrid in production)

## Consequences

**Positive**:
- Single unified codebase for marketing pages, interactive catalogs, and API endpoints
- Fast initial page loads via static site generation and automatic image optimization
- Headless accessible dialogs with focus trapping, scroll locking, and keyboard escape support
- Decoupled data layer allows future CMS migration without modifying UI components
- URL search parameter support enables shareable filter links and clean browser history

**Negative / tradeoffs**:
- Developers must maintain awareness of client versus server component execution boundaries
- Local mock seed data requires manual schema updates until live CMS synchronization is enabled

**Neutral**:
- Initial project scaffolding establishes strict path aliases and design token variables

## Follow-up

- [ ] Connect a live headless CMS adapter when remote content repository credentials are provisioned
- [ ] Connect transactional email service (such as Resend) for contact form notifications
- [ ] Configure production error monitoring and privacy friendly analytics
