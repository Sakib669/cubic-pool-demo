# 0004. Products Catalog and Detail Modal (Rationale)

## Context

Cubic Pools Group designs and builds bespoke luxury swimming pools for high end residential estates and commercial clients. The products catalog serves as the primary visual and technical showcase for pool models. Prospective clients need to quickly browse pool designs by aesthetic style, evaluate physical dimensions against their property boundary lines, inspect engineering shell materials and warranties, and zoom in on high resolution photography.

Architects and landscape designers also consult the catalog for technical specifications including water capacity, coping stone materials, and structural warranties before recommending pool models to clients. The browsing experience must convey quiet luxury, effortless responsiveness, and impeccable attention to detail.

From an engineering and user experience standpoint, browsing a visual catalog is most engaging when users can inspect a model in depth without losing their visual position in the grid. However, users must also be able to copy the URL from their browser address bar to share a specific pool with their partner or architect. Additionally, search engines and users navigating directly from external links require a reliable standalone page that loads the product details without depending on client side javascript execution.

## Options considered

### Option 1: Catalog with URL synced query modal and dedicated page fallback

An interactive catalog grid where clicking a product opens an accessible modal dialog while updating the URL to `?product=slug` using client side history navigation. In addition, each card renders standard `<a href="/products/[slug]">` links that search engine crawlers can index without javascript. A dedicated server rendered route is provided at `/products/[slug]` that shares the same presentation subcomponents.

**Pros**:
- Preserves browsing scroll position when opening and closing pool models.
- Generates shareable, bookmarkable URLs that open the exact pool model immediately.
- Provides dedicated server rendered URLs for search engine indexation and direct linking.
- Highly responsive feel with zero full page reload latency when inspecting multiple models.
- Standard crawler links guarantee full SEO discoverability.

**Cons**:
- Requires coordinating URL search parameters with modal state.
- Requires building both the modal wrapper and the dedicated page layout using shared subcomponents.

### Option 2: Dedicated product detail page route only without modal

Every product card links directly to `/products/[slug]`. There is no modal dialog. Clicking a product performs a standard route navigation to a standalone detail page, and returning to the catalog uses browser back navigation or breadcrumbs.

**Pros**:
- Simpler routing architecture with standard Next.js page conventions.
- No modal focus trap or backdrop scroll locking needed.

**Cons**:
- Interrupts the visual browsing flow and loses scroll position when returning to the catalog.
- Higher visual friction when users want to quickly compare three or four pool models.
- Slower perceived responsiveness during exploratory browsing.

### Option 3: Client only modal with local state and no URL sync

A modal dialog controlled purely by React state without reflecting the open product in the browser address bar.

**Pros**:
- Simplest implementation with no URL parameter synchronization logic.
- Fast opening and closing with zero routing overhead.

**Cons**:
- Users cannot share or bookmark a specific pool detail view.
- Refreshing the page closes the modal and loses the user selection.
- Search engine crawlers cannot discover individual product details from the catalog.

## Rationale

Option 1 is selected because it balances luxury visual fluidity with deep linkability and search engine visibility. Luxury pool buyers often review several pool options in a single browsing session. Forcing full page navigations across dozens of models introduces unnecessary friction. With Option 1, visitors can browse seamlessly, open a pool detail modal with keyboard or click, inspect high resolution gallery images, and dismiss it to return immediately to their exact spot in the grid.

Synchronizing the modal state to `?product=slug` ensures that links shared via messaging apps or email restore the exact view intended by the sender. Pairing this with a dedicated server rendered route at `/products/[slug]` ensures that search engine crawlers and direct bookmarks have permanent, indexable addresses that load instantly. Cards render real anchor tags to `/products/[slug]` so crawlers follow them, while client interactions intercept to open the modal smoothly. Shared subcomponents (`ProductGallery`, `ProductSpecsTable`) keep the codebase DRY and maintainable across both display modes.
