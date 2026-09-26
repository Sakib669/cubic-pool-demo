# Verify: Products catalog and detail modal · spec 0004 · updated 2026-09-26
_Steps derived from spec 0004 acceptance criteria and value sourcing. `/check verify` runs these; `/test` locks the durable ones._

## UI / manual
- [ ] Visit `/products` → expect responsive grid of all pool models with cover images, category badges, dimensions summary, and starting price tier → AC-1, AC-5
- [ ] Click on "Infinity Edge Pools" category tab → expect URL to update to `?category=infinity-pools` without page reload and grid to filter instantly → AC-2, AC-3
- [ ] Filter by a category with no matching pools → expect empty state message and "Reset to All Pools" button that restores catalog → AC-4
- [ ] Click "View Specifications" on "Azure Horizon Infinity" → expect URL to update to `?product=azure-horizon-infinity` and accessible modal to open → AC-6, AC-7
- [ ] In detail modal, press Tab repeatedly → expect focus to remain trapped within modal, and press Escape key → expect modal to close and focus to return to triggering element → AC-8
- [ ] In detail modal, click gallery thumbnails to switch active photo, and click main preview → expect full size lightbox zoom overlay to open with Escape close → AC-9
- [ ] In detail modal, inspect engineering specs table and inclusions checklist → expect dimensions, water volume, shell material, and warranty to match data source → AC-10
- [ ] In detail modal, click "Enquire About This Pool" button → expect link to point to `/contact?product=azure-horizon-infinity` → AC-11
- [ ] Directly load `/products/azure-horizon-infinity` in browser → expect dedicated full page fallback to render with breadcrumbs, gallery, and specs table → AC-12

## Commands
- [ ] `pnpm test` → Vitest test suite passes across all product components and routes with zero failures → AC-1 through AC-12
- [ ] `pnpm build` → Next.js production build succeeds with valid static generation for `/products` and `/products/[slug]` → AC-1, AC-12
- [ ] `pnpm lint` → ESLint runs across all files with zero errors and zero warnings → AC-8

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
