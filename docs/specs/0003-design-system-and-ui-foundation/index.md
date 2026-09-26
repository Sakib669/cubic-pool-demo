# 0003. Establish Design System and UI Foundation

**Date**: 2026-09-26
**Status**: Proposed

## Summary

This specification establishes the luxury design system tokens, accessible base user interface components, and responsive layout shell for Cubic Pools Group. It configures a luxury color palette inspired by deep ocean water and warm travertine stone using Tailwind CSS v4 custom theme tokens. It delivers reusable base primitives and a responsive header, mobile drawer navigation, and footer shell adhering strictly to WCAG 2.2 AA accessibility standards.

## Requirements

**User stories**:
- As a site visitor, I want a visually stunning, responsive layout with intuitive navigation so that I can easily discover luxury pools, view completed projects, and contact the builder.
- As a keyboard or screen reader user, I want full keyboard accessibility, visible focus indicators, skip navigation links, and semantic landmarks so that I can navigate without barriers.
- As a frontend engineer, I want consistent design tokens, typed component primitives, and unified layout wrappers so that future page slices can be built rapidly without duplicating styles.

**Acceptance criteria**:
- **AC-1**: Design tokens defined in `src/app/globals.css` using Tailwind CSS v4 `@theme` configure the luxury pool color palette (primary deep ocean navy `#0B192C`, luminous azure blue `#00A8CC`, warm travertine sand `#F7F5F0`, slate text `#1E293B`, and prestige gold `#C5A880`).
- **AC-2**: Typography system configures Inter for modern architectural body sans and Playfair Display for prestige serif display headings via `next/font/google`, with system fallbacks ensuring zero layout shift.
- **AC-3**: Accessible `Button` component in `src/components/ui/button.tsx` supports variants (`primary`, `secondary`, `outline`, `ghost`, `gold`), sizes (`sm`, `md`, `lg`), focus rings conforming to WCAG 2.2 AA, and minimum 44px touch targets.
- **AC-4**: Responsive `Container` and `Section` components provide consistent layout constraints (`max-w-7xl` default) and vertical rhythm padding (`py-16 md:py-24` default) across viewports.
- **AC-5**: `SectionHeading` component renders eyebrow badge, prestige serif heading, and descriptive subtitle with accessible heading level hierarchy (`h1` through `h4`).
- **AC-6**: `Badge` component renders status or category indicator tags with subtle border and color variants.
- **AC-7**: Sticky `Header` component renders brand logo, desktop navigation links (Products, Gallery, About Us, Contact), phone call CTA button, and accessible mobile menu toggle with backdrop glass blur and `z-40` stacking.
- **AC-8**: Accessible `MobileNav` drawer renders mobile navigation links and company contact details with keyboard focus trap, escape key dismissal, backdrop overlay, and `z-50` stacking.
- **AC-9**: Comprehensive `Footer` component renders company overview, quick links, pool categories, showroom opening hours, email, phone, address, and copyright notice with semantic `<footer>` landmark.
- **AC-10**: Root `layout.tsx` Server Component fetches CMS company info and categories, passing them to `Header` and `Footer`, while providing a skip link to `<main id="main-content" tabIndex={-1}>` for seamless keyboard navigation.

## Decision

**Chosen option**: Option 1: Tailored Luxury Theme with Tailwind CSS v4, Lucide Icons, and Accessible Base Primitives

We establish a bespoke luxury design system using Tailwind CSS v4 theme variables, Lucide React icons, and accessible Radix UI primitives.

**Implementation skills**: `vercel-react-best-practices` (`vercel-labs/agent-skills`, `.agents/skills/vercel-react-best-practices/`)

## Rationale

See [rationale.md](rationale.md) for context, options considered, and trade-off analysis.

## Feature design

**Data model sketch**:
This feature provides the UI shell and base components. It does not introduce new database tables. It consumes company information and category data from the CMS adapter established in spec 0002 (`src/lib/data/index.ts`).

**Server and Client Component boundaries**:
- Root `layout.tsx` is an asynchronous Server Component. It invokes `getCmsAdapter().getCompanyInfo()` and `getCmsAdapter().getCategories()` on the server side and forwards the data down as immutable props.
- `Header` and `MobileNav` are Client Components marked with `"use client"` because they manage interactive state (mobile menu open/closed, scroll detection for glass blur styling, and focus traps).
- Base UI components (`Button`, `Container`, `Section`, `SectionHeading`, `Badge`, `Footer`) are lightweight presentational components rendering cleanly on either server or client.

**Component surface and Props**:

| Component | Path | Key Props | Description |
|---|---|---|---|
| `Button` | `src/components/ui/button.tsx` | `variant`, `size`, `isLoading`, `asChild`, `children` | Accessible button with luxury styling and states |
| `Container` | `src/components/ui/container.tsx` | `size` (`sm`, `md`, `lg`, `xl`, `full`), `className`, `children` | Max width responsive container (`xl` is max 1280px) |
| `Section` | `src/components/ui/section.tsx` | `padding` (`sm`, `md`, `lg`), `id`, `className`, `children` | Semantic section with vertical rhythm padding |
| `SectionHeading` | `src/components/ui/section-heading.tsx` | `eyebrow`, `title`, `subtitle`, `align`, `level` | Luxury heading lockup with serif display font |
| `Badge` | `src/components/ui/badge.tsx` | `variant`, `className`, `children` | Pill tag for categories and featured tags |
| `Header` | `src/components/layout/header.tsx` | `companyInfo: CompanyInfo`, `categories: Category[]` | Sticky navigation header with glass blur (`z-40`) |
| `MobileNav` | `src/components/layout/mobile-nav.tsx` | `isOpen`, `onClose`, `companyInfo`, `categories` | Drawer modal with keyboard trap and slide (`z-50`) |
| `Footer` | `src/components/layout/footer.tsx` | `companyInfo: CompanyInfo`, `categories: Category[]` | Comprehensive multi-column semantic footer |

**Value sourcing**:

| Action or Component | Value produced or displayed | Source |
|---|---|---|
| Header Logo and Name | "Cubic Pools Group" | `CompanyInfo.name` via `layout.tsx` |
| Header Phone Button | Formatted phone number link | `CompanyInfo.contact.phone` via `layout.tsx` |
| Navigation Links | Main route destinations (`/products`, `/gallery`, `/about`, `/contact`) | Navigation routes configuration array |
| Footer Description | "Bespoke architectural swimming pools engineered for prestige Australian homes." | `CompanyInfo.tagline` via `layout.tsx` |
| Footer Contact Phone | Telephone number link | `CompanyInfo.contact.phone` via `layout.tsx` |
| Footer Contact Email | Email mailto link | `CompanyInfo.contact.email` via `layout.tsx` |
| Footer Showroom Address | Physical showroom location string | `CompanyInfo.contact.showroomAddress` via `layout.tsx` |
| Footer Categories | List of pool category links | `Category[]` via `layout.tsx` |
| Footer Showroom Hours | Days and opening times | `CompanyInfo.contact.openingHours` via `layout.tsx` |
| Footer Heritage Year | "Founded in 2004" | `CompanyInfo.heritageYear` via `layout.tsx` |
| Footer Social Links | Instagram, Houzz, Facebook URLs | `CompanyInfo.social` links via `layout.tsx` |

**Key invariants**:
- Stacking context order: Skip link is `z-50`, MobileNav drawer and overlay are `z-50`, sticky Header is `z-40`, and main content is `z-0`.
- All interactive controls (buttons, links, drawer toggles) must provide a visible focus indicator and minimum 44 by 44 pixel touch target.
- Color contrast between text and background must meet or exceed WCAG 2.2 AA (4.5 to 1 for normal text, 3 to 1 for large headings).
- All semantic HTML landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`) must be present exactly once in the layout shell.
- When the mobile drawer is open, scrolling on the underlying document body must be locked, and focus must be trapped within the drawer.
- The skip navigation link must target `#main-content`, and the `<main>` tag must carry `id="main-content"` with `tabIndex={-1}` for reliable screen reader and keyboard focus management.

**Security model**:
Public presentation layer. No authentication or private user data is handled by the layout shell. Links to external social platforms must include `rel="noopener noreferrer"`.

**Configuration required**:
None.

**Critical test scenarios**:
- Happy path: Header renders navigation links, phone CTA, and logo; clicking navigation links navigates; Footer renders full company information, verifies **AC-7**, **AC-9**, **AC-10**.
- Accessibility and Keyboard flow: Keyboard Tab key reaches skip link first; pressing Enter moves focus to `<main id="main-content" tabIndex={-1}>`; mobile menu toggle is operable by Enter or Space; Escape key closes drawer, verifies **AC-3**, **AC-8**, **AC-10**.
- Responsive layout: On mobile screens below 768px, desktop navigation is hidden and hamburger button is visible; opening mobile menu shows drawer with complete navigation links, verifies **AC-4**, **AC-7**, **AC-8**.

## Build plan

1. Install `lucide-react` for accessible icons, satisfying **AC-1**, **AC-7**.
2. Configure design tokens, luxury pool colors, glassmorphism utilities, and typography fonts (`Inter` and `Playfair Display`) in `src/app/globals.css` and font loaders, satisfying **AC-1**, **AC-2**.
3. Implement accessible base UI components (`Button`, `Container`, `Section`, `SectionHeading`, `Badge`) in `src/components/ui/`, satisfying **AC-3**, **AC-4**, **AC-5**, **AC-6**.
4. Implement responsive layout components (`Header`, `MobileNav`, `Footer`) in `src/components/layout/`, satisfying **AC-7**, **AC-8**, **AC-9**.
5. Update root layout in `src/app/layout.tsx` as an asynchronous Server Component fetching CMS data and integrating skip link, Header, main wrapper with `id="main-content"` and `tabIndex={-1}`, and Footer, satisfying **AC-10**.
6. Implement unit tests for base UI components and layout rendering, satisfying **AC-3**, **AC-7**, **AC-9**, **AC-10**.

## Consequences

**Positive**:
- Consistent luxury aesthetic with reusable design tokens and typography pairings.
- Built in accessibility conforming to WCAG 2.2 AA from day one.
- Clean separation between Server Components (data fetching) and Client Components (interactive navigation).

**Negative / tradeoffs**:
- Additional client bundle overhead for Lucide React icons (mitigated by tree shaking modern icons).
- Sticky glass blur header introduces GPU compositing layers during scroll.

**Neutral**:
- Requires subsequent slices to use `Container` and `Section` wrappers to maintain uniform horizontal gutters and vertical rhythm.

## Follow-up

- [ ] In Slice 1, integrate dynamic category dropdown menu inside Header navigation.
