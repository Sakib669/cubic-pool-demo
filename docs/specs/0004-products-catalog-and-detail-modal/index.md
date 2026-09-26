# 0004. Products Catalog and Detail Modal

**Date**: 2026-09-26
**Status**: Accepted

## Summary

This specification defines the products catalog and detail modal experience for Cubic Pools Group. It delivers an interactive product gallery with category filter tabs, responsive product cards, and an accessible modal dialog synchronized with URL search parameters. Visitors can filter pools by style, inspect architectural dimensions, zoom into high resolution photography, and proceed directly to an enquiry with the pool model prefilled.

## Requirements

**User stories**:
- As a prospective luxury pool buyer, I want to browse pools by category, view technical specifications, and zoom into high resolution photography so that I can evaluate pool models for my property.
- As an architect or builder partner, I want to inspect exact dimensions, water volume, shell materials, and warranty details so that I can assess engineering feasibility.
- As a client interested in a specific pool model, I want to click an enquiry button that links to the contact form with the pool prefilled so that I can ask for a quotation without retyping details.
- As a user sharing a pool model with a partner or bookmarking it, I want the URL to reflect the open modal so that opening the link displays the pool immediately.

**Acceptance criteria**:
- **AC-1**: Catalog page at `/products` fetches and displays all products in a responsive grid using Server Components for initial data load.
- **AC-2**: Category filter navigation tabs display all categories plus an All Pools option, highlighting the active tab based on `?category=slug` URL search param.
- **AC-3**: Clicking a category filter tab updates the URL search param `?category=slug` without a full page reload and instantly filters the displayed product cards.
- **AC-4**: When a category contains no matching products, a friendly empty state is displayed with a reset button that clears the category filter.
- **AC-5**: Each product card displays the primary cover image, category name badge resolved from the category list, product name, tagline, dimensions summary (length, width, depth), starting price tier, and an accessible link to view details with `href="/products/[slug]"`.
- **AC-6**: Clicking a product card or its view details button intercepts navigation on the client, updates the URL with `?product=slug`, and opens the product detail modal without reloading the page.
- **AC-7**: Direct navigation or bookmarking to `/products?product=slug` opens the catalog page with the detail modal open for that product, regardless of any active category filter.
- **AC-8**: The detail modal is fully accessible, featuring a focus trap, `aria-modal="true"`, `aria-labelledby` referencing the title, closing on Escape key press or overlay backdrop click, and returning focus to the triggering element upon close.
- **AC-9**: The detail modal displays an interactive multi image gallery with a large main preview, a clickable thumbnail selector strip when two or more images exist, and a full size lightbox zoom overlay on image click.
- **AC-10**: The detail modal presents the pool description, a high contrast technical specs table displaying length, width, depth, water volume, shell material, and warranty years, alongside the pool features checklist.
- **AC-11**: The detail modal includes a prominent primary call to action button linking to `/contact?product=slug`.
- **AC-12**: Direct navigation to `/products/[slug]` serves a dedicated full page fallback for clients or search engines accessing the product directly without query parameters.

## Decision

**Chosen option**: Option 1: Catalog with URL synced query modal and dedicated page fallback

An interactive catalog page with URL query parameter synchronization (`?product=slug` and `?category=slug`) using Radix UI Dialog primitives for accessibility focus management, paired with a dedicated page route at `/products/[slug]` for direct bookmarking and search engine crawlers.

**Implementation skills**: `vercel-react-best-practices` (`vercel-labs/agent-skills`, `.agents/skills/vercel-react-best-practices/`)

## Rationale

Reasoning and options: see [rationale.md](rationale.md).

## Feature design

**Data model sketch**:
Uses domain schemas defined in `src/types/index.ts`:
- `Product`: `id` (PK), `slug` (Unique), `name`, `tagline`, `description`, `categoryId` (FK to `Category.id`), `priceTier` (`$` to `$$$$`), `dimensions` (`lengthMeters`, `widthMeters`, `depthMeters`), `waterVolumeLiters`, `shellMaterial`, `warrantyYears`, `features` (string array), `isFeatured` (boolean), `images` (`ImageObject` array with `url`, `alt`, `width`, `height`).
- `Category`: `id` (PK), `slug` (Unique), `name`, `description`, `icon` (optional string).

**State transitions**:
- Catalog view state:
  - Initial state: all products loaded, active category is null (All Pools).
  - Select category: active category set to selected slug, URL updated to `?category=slug`.
  - Open modal: active product set to selected slug, URL updated to `?product=slug` (retaining category param if present).
  - Close modal: active product cleared, `?product` param removed from URL, focus restored to card trigger, category filter remains unchanged.
  - Image gallery inside modal: active image index defaults to 0, thumbnail click updates active index, clicking active image toggles full screen zoom overlay. When a product has only 1 image, the thumbnail strip is hidden.

**API surface**:
| Surface | Method / Type | Key inputs | Key outputs | Auth | Key errors |
|---|---|---|---|---|---|
| `/products` | Page (Server Component) | `searchParams`: `{ category?: string, product?: string }` | HTML rendered catalog with initial filtered data | Public | 500 server error |
| `/products/[slug]` | Page (Server Component) | `params`: `{ slug: string }` | Dedicated product detail page | Public | 404 not found if slug invalid |
| `getCmsAdapter().getProducts` | TypeScript Async Function | `filter?: { categorySlug?: string }` | `Product[]` | Internal | Empty array on no match |
| `getCmsAdapter().getProductBySlug` | TypeScript Async Function | `slug: string` | `Product \| null` | Internal | Returns null if slug not found |
| `getCmsAdapter().getCategories` | TypeScript Async Function | none | `Category[]` | Internal | Empty array if none |

**Value sourcing**:
| Action | Value produced / displayed | Source |
|---|---|---|
| Render catalog grid | Product list | `getCmsAdapter().getProducts({ categorySlug })` |
| Render category tabs | Category list with count or icon | `getCmsAdapter().getCategories()` |
| Display active filter | Active tab indicator | `searchParams.category` or client state |
| Render product card | Cover image | `product.images[0]` |
| Render product card | Category name badge | Derived from `categories.find(c => c.id === product.categoryId)?.name` |
| Render product card | Product name, tagline | `product.name`, `product.tagline` |
| Render product card | Dimensions summary (L x W x D) | Formatted string from `product.dimensions` |
| Render product card | Price tier badge | `product.priceTier` |
| Render product card | Link target for crawler discoverability | `/products/${product.slug}` |
| Open modal | Product detail data | Matched product by slug from preloaded list or `getProductBySlug(slug)` |
| Modal overview | Full description | `product.description` |
| Modal image gallery | Multiple angles, active preview, zoom | `product.images` array |
| Technical specs table | Length, width, depth, water volume, shell material, warranty | `product.dimensions`, `product.waterVolumeLiters`, `product.shellMaterial`, `product.warrantyYears` |
| Technical specs table | Features checklist | `product.features` array |
| Enquiry button href | `/contact?product=slug` | Derived from `product.slug` |
| Clear filters action | Reset catalog to all products | Navigation to `/products` with empty search parameters |

**Key invariants**:
- The catalog page must render initial products on the server for immediate visual rendering and search indexing.
- Product cards must render real `<a href="/products/[slug]">` links so search engine crawlers discover dedicated product pages without javascript.
- Modal dialog must trap keyboard focus, prevent background page scrolling while open, and close on Escape key.
- URL search parameters must remain in sync with the open modal so refreshing or sharing retains the selected product.
- If `?product=slug` is present in the URL, the modal opens for that product regardless of any active `?category=slug` filter.
- If a product slug in `?product=slug` is invalid, the catalog remains usable without crashing, displaying a notice or quietly ignoring the invalid parameter.
- When a product contains only one image, the thumbnail selector strip is hidden to avoid redundant single thumbnail displays.
- Touch targets on buttons, category tabs, and thumbnails must measure at least 44 pixels by 44 pixels conforming to WCAG 2.2 AA.

**Security model**:
- All product information is public read only content.
- No user authentication required for browsing or viewing specifications.
- Input validation on `slug` and `category` parameters sanitizes input against regex pattern `/^[a-z0-9-]+$/`.

**Configuration required**:
- None. Uses existing mock CMS adapter data and environment variables.

**Critical test scenarios**:
- Happy path: User loads `/products`, filters by Infinity Edge Pools, clicks Azure Horizon Infinity, views specifications in modal, clicks zoom, and clicks enquire button, verifies **AC-1**, **AC-2**, **AC-3**, **AC-5**, **AC-6**, **AC-9**, **AC-10**, **AC-11**.
- Direct URL access: User visits `/products?product=azure-horizon-infinity` directly, catalog renders with detail modal immediately open, verifies **AC-7**, **AC-8**.
- Dedicated page fallback: User visits `/products/azure-horizon-infinity` directly, receives full dedicated server rendered page, verifies **AC-12**.
- Empty category filter: User filters by a category with zero products, views empty state message and clicks reset filters, verifies **AC-4**.
- Accessibility and focus trap: Keyboard user tabs into product card, presses Enter to open modal, tabs through modal elements without escaping to background, presses Escape to close modal, focus returns to originating card, verifies **AC-8**.
- Single image gallery: Product with only one image renders main preview cleanly without a thumbnail strip, verifies **AC-9**.

## Build plan

Following the Tracer Bullet build approach, tasks are structured in an end to end vertical sequence:

- [x] 1. Create category filter tabs and product card presentation components (`CategoryFilter`, `ProductCard`) with accessible markup, crawler links, and hover states, satisfies **AC-2**, **AC-5**.
- [x] 2. Build interactive product catalog client container (`ProductCatalog`) managing URL search parameter synchronization for category filtering, category name lookup map, and empty state handling, satisfies **AC-1**, **AC-3**, **AC-4**.
- [x] 3. Create accessible product detail modal dialog (`ProductDetailModal`) utilizing accessible modal markup with focus trap, backdrop blur, Escape close, and body scroll lock, satisfies **AC-6**, **AC-8**.
- [x] 4. Build interactive product image gallery component (`ProductGallery`) with main preview, thumbnail navigation strip, single image fallback, and full size lightbox zoom overlay, satisfies **AC-9**.
- [x] 5. Build technical specifications table and features checklist component (`ProductSpecsTable`) with description, dimensions, materials, and enquiry button linking to `/contact?product=slug`, satisfies **AC-10**, **AC-11**.
- [x] 6. Implement server rendered products page at `src/app/products/page.tsx` prefetching categories and products from CMS adapter, passing search params and categories to client catalog, satisfies **AC-1**, **AC-7**.
- [x] 7. Implement dedicated product detail route at `src/app/products/[slug]/page.tsx` supporting direct links, search engines, and no javascript clients, satisfies **AC-12**.
- [x] 8. Write comprehensive component tests and accessibility verification suite covering filtering, modal open close mechanics, URL updates, and keyboard navigation, satisfies **AC-1**, **AC-2**, **AC-3**, **AC-4**, **AC-5**, **AC-6**, **AC-7**, **AC-8**, **AC-9**, **AC-10**, **AC-11**, **AC-12**.

## Consequences

**Positive**:
- Fast client side filtering without losing shareable URLs or back button support.
- Fully accessible modal dialog satisfying WCAG 2.2 AA focus management and touch target standards.
- Dual modal and dedicated route approach guarantees optimal user experience on desktop and flawless crawlability for search engines.
- Rich technical specifications, full descriptions, and clear enquiry call to action directly serve prospective buyers and professional architects.

**Negative / tradeoffs**:
- Maintaining both the modal view and dedicated page route requires shared subcomponents to avoid duplication.
- URL search param manipulation in Next.js App Router client components requires careful coordination with `useRouter` and `useSearchParams`.

**Neutral**:
- Image lightbox zoom overlay requires high resolution photography which is already supplied by Unsplash luxury pool fixtures in the mock adapter.

## Follow-up

- [ ] Connect enquiry button prefill parameter handling on the contact form in Slice 4.
