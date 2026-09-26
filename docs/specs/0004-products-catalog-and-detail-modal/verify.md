# Verify: Products catalog and detail modal · spec 0004 · created 2026-09-26
_Steps derived from spec 0004 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

## Commands
- [ ] `pnpm test` → Vitest unit tests pass across product catalog filtering, category tabs, product card, modal focus management, and specifications table → AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8, AC-9, AC-10, AC-11, AC-12
- [ ] `pnpm build` → Next.js production build succeeds with clean TypeScript check and valid products route static rendering → AC-1, AC-7, AC-12
- [ ] `pnpm lint` → ESLint runs across all catalog components with zero errors or accessibility warnings → AC-8

## Acceptance criteria coverage
- AC-1 Catalog page at /products fetches and displays all products in a responsive grid using Server Components
- AC-2 Category filter navigation tabs display all categories plus an All Pools option
- AC-3 Clicking a category filter tab updates the URL search param ?category=slug without full page reload
- AC-4 Friendly empty state displayed with reset button when a category contains no products
- AC-5 Each product card displays cover image, category badge, name, tagline, dimensions summary, and starting price tier
- AC-6 Clicking a product card or view details button updates the URL with ?product=slug and opens modal
- AC-7 Direct navigation or bookmarking to /products?product=slug opens catalog with modal open
- AC-8 Fully accessible detail modal featuring focus trap, aria-modal, Escape key close, and return focus
- AC-9 Interactive multi image gallery with main preview, thumbnail selector strip, and lightbox zoom
- AC-10 High contrast technical specs table displaying dimensions, volume, shell material, and warranty
- AC-11 Detail modal includes prominent primary call to action button linking to /contact?product=slug
- AC-12 Direct navigation to /products/[slug] serves a dedicated full page fallback
