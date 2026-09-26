# 0008. SEO, Performance and Accessibility

**Date**: 2026-09-26
**Status**: Accepted

## Summary

This specification defines the comprehensive search engine optimization, web performance, and digital accessibility baseline for Cubic Pools Group. It delivers dynamic XML sitemaps, robots crawler directives, Open Graph and Twitter card metadata, Schema.org JSON-LD structured data for local business and luxury pool products, custom branded accessible error boundaries, and strict WCAG 2.2 AA compliance across all digital surfaces.

## Requirements

**User stories**:
- As a prospective luxury pool buyer searching Google for architectural pool builders in Sydney or Australia, I want rich search results displaying company credentials, reviews, and product specifications.
- As a user sharing a pool design link on LinkedIn, Messages, or WhatsApp, I want high quality Open Graph visual cards displaying the pool photography and concise title.
- As a search crawler, I want clear sitemaps and robots directives discovering every catalog product and gallery installation.
- As a visitor encountering a broken URL or application error, I want an accessible luxury branded error view with simple options to recover and browse active collections.

**Acceptance criteria**:
- **AC-1**: Dynamic sitemap at `src/app/sitemap.ts` returns XML metadata containing `/`, `/products`, `/gallery`, `/about`, `/contact`, and dynamic routes for each pool model (`/products/[slug]`).
- **AC-2**: Robots configuration at `src/app/robots.ts` allows crawler indexing, disallows `/api/`, and declares the sitemap reference.
- **AC-3**: Root metadata in `src/app/layout.tsx` defines `metadataBase`, Open Graph parameters (`locale: "en_AU"`, `type: "website"`), Twitter card configurations, and canonical URL handling.
- **AC-4**: Structured data components in `src/components/seo/` inject valid Schema.org JSON-LD scripts for `LocalBusiness`, `Product`, and `ImageGallery`.
- **AC-5**: Custom 404 page at `src/app/not-found.tsx` provides accessible, on brand recovery navigation back to products, gallery, and contact.
- **AC-6**: Route error boundary at `src/app/error.tsx` provides client side error catching, user friendly messaging, and a reset retry trigger.
- **AC-7**: Global error boundary at `src/app/global-error.tsx` catches root layout exceptions with accessible fallback HTML.
- **AC-8**: Color contrast ratios, focus indicator rings, minimum touch target dimensions of 44 by 44 pixels, and skip links adhere to WCAG 2.2 AA.
- **AC-9**: Automated test suite validates sitemap generation, robots rules, JSON-LD structure, and error boundary renderings.

## Decision

**Chosen option**: Native Next.js 16 metadata, sitemap, and robots route handlers paired with modular Schema.org JSON-LD components and branded error pages.

**Implementation skills**: `vercel-react-best-practices` (`vercel-labs/agent-skills`, `.agents/skills/vercel-react-best-practices/`)

## Rationale

Reasoning and options: see [rationale.md](rationale.md).

## Build plan

**Tasks**:
- [x] 1. Draft Spec 0008 (index.md, rationale.md, verify.md).
- [x] 2. Create Schema.org JSON-LD components in `src/components/seo/`:
  - `src/components/seo/local-business-jsonld.tsx`
  - `src/components/seo/product-jsonld.tsx`
  - `src/components/seo/image-gallery-jsonld.tsx`
  - `src/components/seo/index.ts`
- [x] 3. Create sitemap and robots in `src/app/`:
  - `src/app/sitemap.ts`
  - `src/app/robots.ts`
- [x] 4. Enhance metadata and embed LocalBusiness JSON-LD in `src/app/layout.tsx`.
- [x] 5. Create branded accessible error boundaries:
  - `src/app/not-found.tsx`
  - `src/app/error.tsx`
  - `src/app/global-error.tsx`
- [x] 6. Create unit and integration test suite `src/components/seo/__tests__/seo.test.tsx`.
- [x] 7. Run test suite, build, and linter to verify zero regressions.
