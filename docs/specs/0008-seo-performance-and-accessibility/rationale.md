# Rationale: SEO, Performance and Accessibility

## Context and Problem

High net worth clients, architects, and estate builders discover prestige contractors through organic search and social sharing. A luxury brand requires immaculate presentation across Google search results, social previews, and assistive technologies. Furthermore, when unhandled errors or missing pages occur, the experience must remain dignified and guide visitors back into core service pathways.

## Alternatives Considered

### Option 1: Basic static HTML metadata
- Static meta tags placed manually in HTML head.
- Downside: Fails to dynamically reflect product additions, lacks structured schema for Google Rich Results, misses Open Graph image previews.

### Option 2: Heavy external SEO tracking plugins
- Third party scripts injecting runtime schema.
- Downside: Performance degradation, Core Web Vitals penalties, potential script blocking by privacy extensions.

### Option 3 (Chosen): Native Next.js 16 metadata, sitemaps, and server rendered JSON-LD schemas
- Native `sitemap.ts` and `robots.ts` generated during build and runtime.
- Server rendered `<script type="application/ld+json">` components adhering to Schema.org standards for LocalBusiness, Product, and ImageGallery.
- Native React 19 error boundaries (`error.tsx`, `global-error.tsx`, `not-found.tsx`) preserving accessible navigation without full page crashes.
