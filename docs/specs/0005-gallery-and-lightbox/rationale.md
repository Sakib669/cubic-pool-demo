# 0005. Gallery and Lightbox (Rationale)

## Context

Cubic Pools Group designs and constructs bespoke luxury pools for private estates and commercial properties. A core conversion driver for prospective clients is the design gallery, showcasing completed installations across Australia in authentic residential environments.

Visitors expect to browse pool designs by aesthetic style (such as Infinity, Modern Geometric, Natural Oasis, Architectural Lap, and Indoor Sanctuary). When inspecting a project, clients want to examine high resolution photography in a distraction free, full screen environment. They also want to understand the design context: the project location, year of completion, unique construction features, and which pool model served as the foundation for the installation.

Architects and clients frequently share individual project photos while discussing concepts. Therefore, opening a project in the lightbox must update the browser URL to `?project=slug` so direct links can be emailed or messaged. Furthermore, the viewer must support intuitive mobile gestures (touch swipe) as well as desktop keyboard navigation (arrow keys and Escape).

## Options considered

### Option 1: Gallery with URL query synchronized lightbox and related product referral

An interactive gallery grid where clicking any project opens an accessible full screen lightbox modal, updating the URL to `?project=slug` via client side history navigation. The lightbox includes keyboard arrow controls, touch swipe gesture handling, a thumbnail selector strip, project narrative, architectural feature list, and a direct link to the related pool model in the catalog.

**Pros**:
- Preserves the visitor browsing position and active style filter when opening or closing the lightbox.
- Produces shareable, bookmarkable links that restore the open project immediately.
- Creates an intuitive bridge between inspiration photography and product specification pages.
- Native keyboard navigation and touch gestures provide an effortless luxury feel.

**Cons**:
- Requires coordinating URL query state with modal open and close events.
- Requires robust event listener cleanup for keyboard and touch events.

### Option 2: Dedicated project case study pages only without lightbox

Clicking a project navigates to a standalone route `/gallery/[slug]` displaying the project photos and narrative. Returning to the gallery requires back navigation.

**Pros**:
- Simpler routing architecture with standard Next.js page conventions.
- No modal focus trap or touch swipe listeners needed.

**Cons**:
- Slower exploratory browsing with page transition latency between projects.
- Loses the user scroll position and filter state when returning to the gallery.
- Less immersive photographic presentation compared to an edge to edge black lightbox.

### Option 3: Client only lightbox modal without URL synchronization

A modal controlled entirely by local component state without reflecting the active project in the browser URL.

**Pros**:
- Simplest implementation with no URL manipulation.
- Fast open and close mechanics.

**Cons**:
- Projects cannot be shared or bookmarked directly via URL.
- Refreshing the browser page dismisses the viewer.

## Rationale

Option 1 is chosen because it combines immediate photographic immersion with deep linkability and high conversion design. For a luxury swimming pool builder, visual photography is the primary emotional hook for clients. Allowing visitors to browse seamlessly, enter full screen photography with one click, swipe through construction details, and immediately jump to the underlying pool model (`/products?product=slug`) provides an integrated journey from inspiration to enquiry. Synchronizing `?project=slug` to the URL ensures clients and architects can share specific projects with zero friction.
