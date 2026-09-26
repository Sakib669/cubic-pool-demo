# 0006. About Us and Company Trust

**Date**: 2026-09-26
**Status**: Accepted

## Summary

This specification defines the About Us and company trust experience for Cubic Pools Group. It delivers an authoritative narrative of brand heritage since 2004, presents quantitative trust statistics, outlines four architectural craftsmanship values, highlights builder and architect collaborations, and provides an accessible client testimonial carousel conforming to WCAG 2.2 AA standards with pause controls, keyboard navigation, and responsive touch gestures.

## Requirements

**User stories**:
- As a prospective pool owner, I want to learn about the history, experience, and values of Cubic Pools Group so that I have confidence in commissioning an estate scale pool project.
- As an architect or builder evaluating partnerships, I want to review company credentials, master builder counts, and industry awards so that I can verify professional qualifications.
- As a site visitor, I want to read verified client testimonials and inspect their specific project stories so that I can gauge client satisfaction.
- As a visitor using screen readers or keyboard navigation, I want full control over animated or rotating testimonial content so that I can pause motion and read at my own pace.

**Acceptance criteria**:
- **AC-1**: About page at `/about` renders using Server Components to fetch company info and client testimonials concurrently via `Promise.all([getCmsAdapter().getCompanyInfo(), getCmsAdapter().getTestimonials()])`.
- **AC-2**: Heritage hero section displays brand origins dating to 2004, the founding vision, and the commitment to luxury residential water engineering with high resolution estate imagery.
- **AC-3**: Trust statistics grid displays four primary figures (`projectsCompleted`, `awardsWon`, `satisfactionRatePercent`, `masterBuildersCount`) with semantic `<dl>`, `<dt>`, `<dd>` markup and explicit labels.
- **AC-4**: Brand values section showcases four core principles (Architectural Integrity, Engineering Rigor, Sustainable Water Systems, Concierge Client Care) with descriptive icons and narratives.
- **AC-5**: Industry credentials and partnerships showcase highlights collaborations with registered architects, landscape designers, and accredited master builder associations.
- **AC-6**: Testimonial carousel supports previous and next controls, direct slide navigation dots, keyboard arrow navigation (ArrowLeft, ArrowRight) scoped to the carousel container (`tabIndex={0}`), and touch swipe gestures with a 50 pixel threshold.
- **AC-7**: Testimonial carousel includes an explicit play and pause control button satisfying WCAG 2.2 AA success criterion 2.2.2 (Pause, Stop, Hide), defaults to paused when `prefers-reduced-motion` is detected, and sets `aria-live="off"` while autoplay runs.
- **AC-8**: Each testimonial card renders the client quote, client name, professional role, location, project title, star rating with accessible text alternative, and avatar image with monogram initials fallback.
- **AC-9**: Graceful fallback behavior ensures that empty datasets return null or render a quiet notice, and single testimonial datasets render the testimonial card without carousel controls.
- **AC-10**: Bottom call to action banner invites visitors to book a private consultation at the Double Bay showroom linking to `/contact` and provides a direct telephone link from `companyInfo.contact.phone`.

## Decision

**Chosen option**: Server Component page with decoupled presentation slices and an accessible client testimonial carousel.

The `/about` route is structured as a Server Component fetching verified data from `getCmsAdapter()`. Visual sections (Hero, Statistics, Values, Partners, Consultation CTA) are pure Server Components for optimal performance and SEO. The interactive TestimonialCarousel is isolated as a Client Component with ARIA live regions, accessible pause controls, and keyboard handlers.

**Implementation skills**: `vercel-react-best-practices` (`vercel-labs/agent-skills`, `.agents/skills/vercel-react-best-practices/`)

## Rationale

Reasoning and options: see [rationale.md](rationale.md).

## Feature design

### Static Copy Dictionaries

1. **Heritage Narrative**:
   - Title: "Pioneering Architectural Waterscapes Since 2004"
   - Subtitle: "Two decades of master craftsmanship, structural engineering, and sculptural pool design across Australia."
   - Paragraph 1: "Founded in Sydney in 2004, Cubic Pools Group was born from a desire to bridge the divide between residential architecture and hydraulic engineering. Rather than treating a swimming pool as a backyard accessory, our founders approached each basin as a foundational piece of site architecture."
   - Paragraph 2: "From cantilevered vanishing edges clinging to coastal cliffs in the Whitsundays to minimalist sunken pavilions in Toorak, every installation is engineered to endure for generations with millimeter precision."
   - Image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1920&q=85", alt: "Architectural infinity pool overlooking coastal horizon"

2. **Trust Statistics Mapping**:
   - `projectsCompleted`: format as `${value}+`, label "Masterpiece Installations", description "Private estates and penthouses delivered across Australia"
   - `awardsWon`: format as `${value}`, label "National Architecture Awards", description "Accolades from SPASA and Master Builders Australia"
   - `satisfactionRatePercent`: format as `${value}%`, label "Client Satisfaction Index", description "Five star client satisfaction across handover and servicing"
   - `masterBuildersCount`: format as `${value}`, label "Master Pool Builders", description "Licensed in house engineers, pool artisans, and project directors"

3. **Core Values Pillars**:
   - Pillar 1: "Architectural Integrity", Icon: `Compass`, Body: "Every line, weir edge, and coping rebate is drafted in coordination with project architects to align with the primary residence geometry."
   - Pillar 2: "Engineering Rigor", Icon: `ShieldCheck`, Body: "From geotechnical soil anchoring to reinforced concrete basin pours, our structures exceed national engineering specifications."
   - Pillar 3: "Sustainable Water Systems", Icon: `Droplets`, Body: "Magnesium mineral sanitization, variable frequency pumps, and thermodynamic covers minimize environmental footprint while delivering silk smooth water."
   - Pillar 4: "Concierge Client Care", Icon: `HeartHandshake`, Body: "From initial council approvals to lifetime hydraulic servicing, a dedicated project director guides every commissioning phase."

4. **Industry Credentials and Partners**:
   - Badges: SPASA Master Pool Builder Gold Member, Master Builders Australia Registered Commercial and Residential, Australian Institute of Architects Corporate Partner, Waterland Engineering Excellence Fellow.

### Component Prop Contracts

```typescript
export interface AboutHeroProps {
  companyInfo: CompanyInfo;
}

export interface AboutStatsProps {
  stats: CompanyInfo["stats"];
}

export interface AboutValuesProps {
  className?: string;
}

export interface AboutPartnersProps {
  className?: string;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoplayIntervalMs?: number; // defaults to 6000
}

export interface AboutCtaProps {
  contact: CompanyInfo["contact"];
}
```

### Carousel State Machine & Accessibility Rules

- Autoplay runs on a 6000ms timer when `isAutoplaying && !isUserPaused && !isHovered && !isFocused`.
- If `window.matchMedia("(prefers-reduced-motion: reduce)").matches` is true on mount, `isUserPaused` defaults to true.
- `aria-live` is `"off"` during active rotation and switches to `"polite"` when paused or when user interacts.
- Container has `role="region"`, `aria-roledescription="carousel"`, `aria-label="Client testimonials"`, and `tabIndex={0}`.
- Active slide has `role="group"`, `aria-roledescription="slide"`, `aria-label="Slide X of Y"`.
- Continuous wrap around navigation: Next on last slide advances to slide 0, Previous on slide 0 advances to last slide.
- Touch threshold is 50px displacement with `touch-action: pan-y` on slide container.
- Avatar fallback: if `avatarUrl` is undefined, renders client initials in a styled circular badge.

### Route Metadata for `/about`

```typescript
export const metadata: Metadata = {
  title: "About Us | Cubic Pools Group",
  description: "Discover our heritage, structural engineering precision, and master craftsmanship delivering luxury architectural pools across Australia since 2004.",
  openGraph: {
    title: "About Us | Cubic Pools Group",
    description: "Two decades of master craftsmanship and structural engineering delivering luxury architectural pools.",
  },
};
```

## Build plan

**Tasks**:
- [x] 1. Draft and cross check Spec 0006 (index.md, rationale.md, verify.md).
- [x] 2. Create About Us components in `src/components/about/`:
  - `src/components/about/about-hero.tsx`: Heritage narrative and luxury imagery
  - `src/components/about/about-stats.tsx`: Trust metrics grid
  - `src/components/about/about-values.tsx`: Four pillars of craftsmanship
  - `src/components/about/about-partners.tsx`: Architect and builder partnership credentials
  - `src/components/about/testimonial-carousel.tsx`: Accessible carousel with pause control
  - `src/components/about/about-cta.tsx`: Showroom visit and consultation banner
  - `src/components/about/index.ts`: Barrel file
- [x] 3. Create Server Component route `src/app/about/page.tsx` prefetching data via `getCmsAdapter()`.
- [x] 4. Create unit and integration test suite `src/components/about/__tests__/about.test.tsx`.
- [x] 5. Run test suite, build, and linter to verify zero regressions.
