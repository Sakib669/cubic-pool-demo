# 0005. Gallery and Lightbox

**Date**: 2026-09-26
**Status**: Accepted

## Summary

This specification defines the pool design gallery and full screen lightbox experience for Cubic Pools Group. It delivers an interactive project showcase with style filter chips, responsive visual project cards, and a luxury photography lightbox synchronized with URL search parameters. Visitors can filter pool installations by architectural style, navigate high resolution photography with keyboard arrows or touch swipe gestures, inspect project captions and craftsmanship details, and follow direct links to the underlying pool models.

## Requirements

**User stories**:
- As a prospective pool buyer, I want to browse finished luxury pool installations by architectural style so that I can visualize possibilities for my estate.
- As an architect or builder partner, I want to view high resolution photography of construction details, weir channels, and stone coping in a full screen lightbox so that I can inspect craftsmanship.
- As a user viewing a project in the lightbox, I want to see the project location, year, design description, and a link to the related pool model so that I can easily find the underlying product specification.
- As a user sharing a project photograph with a collaborator, I want the URL to synchronize with the open lightbox so that opening the link displays the project immediately.

**Acceptance criteria**:
- **AC-1**: Gallery page at `/gallery` fetches and displays all completed pool projects in a responsive grid using Server Components for initial data load.
- **AC-2**: Style filter navigation chips display All Styles plus each unique style (Infinity, Modern Geometric, Natural Oasis, Architectural Lap, Indoor Sanctuary), highlighting the active chip based on `?style=slug`.
- **AC-3**: Clicking a style filter chip updates the URL search param `?style=slug` without a full page reload and instantly filters the displayed project cards.
- **AC-4**: Each gallery card displays the cover image with hover zoom, style badge, project title, location, completion year, and count of high resolution photos.
- **AC-5**: Clicking a gallery card opens the accessible full screen lightbox displaying the project photography, updates the URL to `?project=slug`, and preserves the active style filter.
- **AC-6**: Direct navigation or bookmarking to `/gallery?project=slug` opens the gallery with the lightbox immediately active for that project, falling back to the default gallery if the slug is invalid.
- **AC-7**: The lightbox provides an interactive image carousel with next and previous controls, keyboard arrow navigation (ArrowLeft, ArrowRight), touch swipe support, and Escape key dismissal.
- **AC-8**: The lightbox displays a thumbnail selector strip allowing one click jumps between project photos, and hides the strip when only one photo exists.
- **AC-9**: The lightbox presents a rich caption panel displaying the project title, location, completion year, design narrative, and architectural features checklist.
- **AC-10**: When a project has a related pool model, the lightbox caption panel displays a prominent link to the related pool model at `/products?product=[slug]`.
- **AC-11**: The lightbox is fully accessible with `aria-modal="true"`, focus trap, aria labels on navigation controls, and returns focus to the triggering card on close (or to the gallery heading if opened via direct URL).
- **AC-12**: When a style filter contains zero matching projects, a friendly empty state is displayed with a reset button restoring the gallery to All Styles.

## Decision

**Chosen option**: Option 1: Gallery with URL query synchronized lightbox and related product referral

An interactive gallery grid with client side style filtering and a full screen lightbox modal synchronized to `?project=slug` in the browser address bar, featuring keyboard navigation, thumbnail strip, rich project captions, and deep links to matching pool models.

**Implementation skills**: `vercel-react-best-practices` (`vercel-labs/agent-skills`, `.agents/skills/vercel-react-best-practices/`)

## Rationale

Reasoning and options: see [rationale.md](rationale.md).

## Feature design

**Data model sketch**:
Uses domain schemas defined in `src/types/index.ts`:
- `GalleryProject`: `id` (PK), `slug` (Unique), `title`, `style` (Union: `Infinity`, `Modern Geometric`, `Natural Oasis`, `Architectural Lap`, `Indoor Sanctuary`), `location`, `completionYear`, `description`, `features` (string array), `relatedProductId` (optional FK to `Product.id`), `coverImage` (`ImageObject`), `images` (`ImageObject` array).
- `Product`: Referenced by `relatedProductId` to extract product name and product slug for deep linking.

**State transitions**:
- Gallery view state:
  - Initial state: all projects loaded, active style is null (All Styles).
  - Select style: active style set to selected slug or name, URL updated to `?style=slug`.
  - Open lightbox: active project set to selected project slug, active photo index set to 0, URL updated to `?project=slug` (retaining style param).
  - Lightbox photo navigation: next or previous advances photo index (wrapping around), thumbnail click sets exact index.
  - Close lightbox: active project set to null, `?project` param removed from URL, focus restored to card trigger or heading fallback, style filter preserved.

**API surface**:
| Surface | Method / Type | Key inputs | Key outputs | Auth | Key errors |
|---|---|---|---|---|---|
| `/gallery` | Page (Server Component) | `searchParams`: `{ style?: string, project?: string }` | HTML rendered gallery with initial complete data | Public | 500 server error |
| `getCmsAdapter().getGalleryProjects` | TypeScript Async Function | none | `GalleryProject[]` | Internal | Empty array on no match |
| `getCmsAdapter().getProducts` | TypeScript Async Function | none | `Product[]` | Internal | Used to build lightweight model lookup map |

**Value sourcing**:
| Action | Value produced / displayed | Source |
|---|---|---|
| Render gallery grid | Complete projects list | `getCmsAdapter().getGalleryProjects()` |
| Render style chips | Style options list | Derived from `GalleryStyleSchema.options` |
| Display active filter | Active style chip state | `searchParams.style` or client state |
| Render gallery card | Cover image, title, style badge | `project.coverImage`, `project.title`, `project.style` |
| Render gallery card | Location, completion year, photo count | `project.location`, `project.completionYear`, `project.images.length` |
| Open lightbox | Project photography and metadata | Matched project by slug from complete project list |
| Lightbox photo display | Main active photo | `project.images[activeIndex]` |
| Lightbox thumbnails | Thumbnail strip | `project.images` array |
| Lightbox captions | Narrative, location, year, features | `project.description`, `project.location`, `project.completionYear`, `project.features` |
| Lightbox model link | Related pool model link and title | Derived from `productMap.get(project.relatedProductId)` |
| Clear filter action | Reset gallery to All Styles | Navigation to `/gallery` with empty search parameters |

**Key invariants**:
- The gallery page must render initial projects on the server for instant visual loading and search crawler indexation.
- The Server Component passes the full unfiltered projects array to the client container so that style filtering operates instantly without subsequent network round trips.
- If `?project=slug` is active but conflicts with `?style=slug`, the lightbox opens successfully by matching against the complete project list, leaving the background grid filtered.
- If an invalid `?project=slug` is supplied in the URL, the gallery renders normally and dismisses or ignores the parameter without crashing.
- On closing the lightbox, if no card element was previously focused (such as direct bookmark entry), focus gracefully falls back to the main gallery heading.
- Full screen lightbox must trap keyboard focus, prevent background page scrolling while open, and close on Escape key.
- Touch swipe gestures on mobile screens (left swipe for next photo, right swipe for previous photo) must be supported.
- When a project has only one image, the thumbnail selector strip is hidden to keep the interface uncluttered.
- Touch targets on buttons, style chips, and thumbnails must measure at least 44 pixels by 44 pixels conforming to WCAG 2.2 AA.

**Security model**:
- All gallery projects and photography are public read only assets.
- No user authentication required for browsing or inspecting photography.
- Search parameter inputs are sanitized against alphanumeric slug characters.

**Configuration required**:
- None. Uses existing mock CMS adapter data and luxury Unsplash photography fixtures.

**Critical test scenarios**:
- Happy path: User visits `/gallery`, filters by Infinity style, clicks Whitsunday Cliff Residence, views photos in lightbox, advances with keyboard arrow, and clicks related pool model link, verifies **AC-1**, **AC-2**, **AC-3**, **AC-4**, **AC-5**, **AC-7**, **AC-9**, **AC-10**.
- Direct URL access: User visits `/gallery?project=toorak-minimalist-pavilion` directly, gallery renders with lightbox immediately open, verifies **AC-6**, **AC-11**.
- Invalid project slug: User visits `/gallery?project=non-existent-project`, gallery renders normally with no modal open and no runtime errors, verifies **AC-6**.
- Empty style filter: User filters by a style with zero matching projects, views friendly empty state and clicks reset button, verifies **AC-12**.
- Lightbox accessibility: Keyboard user tabs into card, presses Enter to open lightbox, verifies focus trapped, navigates photos with arrows, presses Escape to close, focus returns to originating card, verifies **AC-7**, **AC-11**.
- Single photo project: Project with a single image renders without a thumbnail strip, verifies **AC-8**.

## Build plan

Following the Tracer Bullet build approach, tasks are structured in an end to end vertical sequence:

- [x] 1. Create style filter chips component (`GalleryFilter`) with accessible markup, active state styling, and URL query synchronization, satisfies **AC-2**, **AC-3**.
- [x] 2. Create gallery project card component (`GalleryCard`) with hover zoom, style badge, location, completion year, photo count, and accessible button trigger, satisfies **AC-4**, **AC-5**.
- [x] 3. Create accessible full screen lightbox component (`GalleryLightbox`) with keyboard arrow navigation, touch swipe gestures, thumbnail strip, focus trap, Escape dismissal, and direct URL focus fallback, satisfies **AC-5**, **AC-7**, **AC-8**, **AC-11**.
- [x] 4. Create lightbox project caption panel with narrative description, location, year, architectural features checklist, and related pool model link, satisfies **AC-9**, **AC-10**.
- [x] 5. Build interactive gallery container component (`GalleryView`) managing complete data, style filtering, URL search parameter synchronization, empty state handling, and lightbox state, satisfies **AC-1**, **AC-3**, **AC-5**, **AC-6**, **AC-12**.
- [x] 6. Implement server rendered gallery page at `src/app/gallery/page.tsx` prefetching all gallery projects and pool models from CMS adapter, passing complete data to client gallery, satisfies **AC-1**, **AC-6**.
- [x] 7. Write comprehensive component tests and accessibility verification suite covering gallery filtering, card markup, lightbox keyboard navigation, photo switching, and related product referral, satisfies **AC-1**, **AC-2**, **AC-3**, **AC-4**, **AC-5**, **AC-6**, **AC-7**, **AC-8**, **AC-9**, **AC-10**, **AC-11**, **AC-12**.

## Consequences

**Positive**:
- Immersive visual experience for high end architectural pool installations.
- Fast client side filtering across the full project payload without server round trips.
- Shareable URLs (`?project=slug`) for collaborating between clients, architects, and partners.
- Seamless bridge connecting completed real world projects to the underlying pool models via related product links.
- Fully accessible keyboard and touch controls conforming to WCAG 2.2 AA.

**Negative / tradeoffs**:
- Full screen lightbox with touch swipe and keyboard listeners requires careful event cleanup to avoid memory leaks.
- Client side search parameter manipulation requires coordinating history state.

**Neutral**:
- High resolution photography fixtures are already provided by the CMS adapter.

## Follow-up

- [ ] Add category filter deep link referral from the homepage gallery teaser in Slice 5.
