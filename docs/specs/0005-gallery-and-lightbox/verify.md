# Verify: Gallery and lightbox · spec 0005 · created 2026-09-26
_Steps derived from spec 0005 acceptance criteria and value sourcing. `/check verify` runs these; `/test` locks the durable ones._

## UI / manual
- [ ] Visit `/gallery` → expect responsive grid of all completed pool projects with cover photos, style badges, location, year, and photo count → AC-1, AC-4
- [ ] Click on "Infinity" style filter chip → expect URL to update to `?style=Infinity` without page reload and grid to filter instantly → AC-2, AC-3
- [ ] Filter by a style with zero matching projects → expect friendly empty state message and "Reset to All Styles" button that restores gallery → AC-12
- [ ] Click on a project card → expect URL to update to `?project=slug` and full screen lightbox to open with active project photos → AC-5, AC-6
- [ ] In lightbox, press ArrowRight and ArrowLeft keys → expect active photo to advance and return smoothly with wrapping → AC-7
- [ ] In lightbox, click thumbnails in selector strip → expect active photo to jump directly to selected image → AC-8
- [ ] In lightbox, inspect caption panel → expect title, location, year, design narrative, and signature inclusions checklist to display → AC-9
- [ ] In lightbox, click on the related pool model link → expect navigation to `/products?product=[slug]` with matching model details → AC-10
- [ ] In lightbox, press Escape key or click close button → expect lightbox to dismiss, URL `?project` param to clear, and focus to return to triggering card → AC-7, AC-11

## Commands
- [ ] `pnpm test` → Vitest test suite passes across all gallery components with zero failures → AC-1 through AC-12
- [ ] `pnpm build` → Next.js production build succeeds with clean static generation for `/gallery` → AC-1, AC-6
- [ ] `pnpm lint` → ESLint runs across all files with zero errors and zero warnings → AC-11

## Acceptance criteria coverage
- AC-1 Gallery page at /gallery fetches and displays all completed pool projects in a responsive grid
- AC-2 Style filter navigation chips display All Styles plus each unique style
- AC-3 Clicking a style filter chip updates the URL search param ?style=slug without page reload
- AC-4 Each gallery card displays cover image with hover zoom, style badge, title, location, and year
- AC-5 Clicking a gallery card opens accessible full screen lightbox and updates URL to ?project=slug
- AC-6 Direct navigation or bookmarking to /gallery?project=slug opens gallery with lightbox active
- AC-7 Lightbox provides keyboard arrow navigation, touch swipe support, and Escape key dismissal
- AC-8 Lightbox displays thumbnail selector strip, hiding strip when only one photo exists
- AC-9 Lightbox presents rich caption panel with narrative, location, year, and features checklist
- AC-10 Lightbox displays prominent link to related pool model at /products?product=[slug]
- AC-11 Lightbox is fully accessible with aria-modal, focus trap, and returns focus to card on close
- AC-12 Friendly empty state displayed with reset button when style filter has no matching projects
