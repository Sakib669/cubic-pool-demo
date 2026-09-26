# Rationale: About Us and Company Trust

## Context and Problem

Cubic Pools Group delivers ultra luxury bespoke swimming pools and wellness spaces for estates, penthouses, and prestige residences. Commissioning a pool in this tier requires significant financial investment and architectural trust. The About Us page must not simply be a wall of generic text; it must project authority, engineering precision, structural reliability, and verified client satisfaction.

## Alternatives Considered

### Option 1: Static long form narrative page
- Simple single column narrative describing company history.
- Downside: Low visual engagement, fails to provide quick quantitative trust signals, lacks interactive proof of client satisfaction.

### Option 2: Heavy 3D animated timeline page
- Interactive 3D timeline with WebGL or heavy canvas effects.
- Downside: Poor performance on mobile devices, low accessibility for screen readers and keyboard users, high maintenance burden.

### Option 3 (Chosen): Server Component structured page with WCAG 2.2 AA compliant testimonial carousel
- Clear modular sections: Heritage narrative, Quantitative Trust Metrics, Four Brand Values, Industry Partnership Credentials, Accessible Testimonial Carousel, and Showroom CTA.
- The testimonial carousel includes keyboard navigation, touch swipes, and explicit play and pause controls conforming to WCAG 2.2 AA criterion 2.2.2.
- Data fetching occurs in the Next.js Server Component page via `getCmsAdapter()`, preserving fast initial page load and clean SEO indexing.

## Tradeoffs

- Autoplay carousel motion requires strict compliance with WCAG 2.2 AA 2.2.2 (Pause, Stop, Hide). We provide an accessible button allowing users to toggle autoplay on or off, and pause automatically when focused or hovered.
- Isolating the carousel to a client component keeps the rest of the page (Hero, Stats, Values, Partners, CTA) entirely server rendered.
