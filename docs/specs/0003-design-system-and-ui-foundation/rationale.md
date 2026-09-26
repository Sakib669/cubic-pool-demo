# Rationale: 0003. Establish Design System and UI Foundation

## Context

Cubic Pools Group requires a distinctive, high prestige digital identity that communicates architectural excellence, craftsmanship, and luxury engineering. The current codebase has established data models and Next.js 16 foundations, but lacks brand design tokens, base UI components, and a unified layout shell.

Without an established design system and layout shell, future feature slices (such as product catalogs, galleries, and contact forms) would invent disparate styling rules, leading to visual inconsistency, redundant CSS, and poor accessibility compliance. We need a cohesive design foundation that sets colors, typography, layout bounds, and accessible interactive primitives.

## Options considered

### Option 1: Tailored Luxury Theme with Tailwind CSS v4, Lucide Icons, and Accessible Base Primitives (Chosen)

Create custom design tokens inside Tailwind CSS v4 theme variables, pairing modern architectural sans typography with an editorial serif display font for luxury prestige. Build a suite of accessible base components (`Button`, `Container`, `Section`, `Badge`) and responsive layout components (`Header`, `MobileNav`, `Footer`) using semantic HTML and Lucide React icons.

**Pros**:
- Full creative freedom to craft a bespoke luxury aesthetic tailored to high end pool architecture.
- Minimal bundle overhead, zero runtime CSS style injection, and native Tailwind utility classes.
- Direct alignment with project guidelines, Next.js 16 Turbopack, and WCAG 2.2 AA accessibility requirements.

**Cons**:
- Requires implementing and testing our own accessible base UI primitives rather than importing ready made styled blocks.

### Option 2: Heavy Off the Shelf Component Framework (Chakra UI or Material UI)

Install an all in one component framework with pre built navigation headers, drawers, and buttons.

**Pros**:
- Fast initial setup for standard components.

**Cons**:
- Large JavaScript runtime bundle that hinders Core Web Vitals and page load speed.
- Generic corporate appearance that conflicts with custom luxury pool craftsmanship.
- Difficult theming overrides when fitting bespoke editorial typography and glassmorphism styling.

### Option 3: Minimal Inline Styling without Token Architecture

Write ad hoc Tailwind utility classes across individual pages and components without centralised tokens or reusable layout wrappers.

**Pros**:
- No up front investment in tokens or base components.

**Cons**:
- Inconsistent color shades, mismatched spacing scales, and duplicated layout markup.
- High long term maintenance cost and severe risk of accessibility regressions.

## Rationale

Option 1 is selected because Cubic Pools Group is a luxury brand where visual polish, bespoke typography, and performance are vital brand differentiators. Tailwind CSS v4 provides theme token definitions via `@theme` that integrate seamlessly with Next.js 16 and Turbopack. Coupling this with tested, accessible base primitives ensures rapid development for subsequent slices without sacrificing architectural rigor.
