# Verify: Design system and UI foundation · spec 0003 · created 2026-09-26
_Steps derived from spec 0003 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

## Commands
- [x] `pnpm test` → Vitest unit tests pass across base UI components, button variants, and layout structure → AC-3, AC-4, AC-5, AC-6, AC-7, AC-8, AC-9, AC-10
- [x] `pnpm build` → Next.js production build succeeds with clean TypeScript check and valid layout shell → AC-1, AC-2, AC-10
- [x] `pnpm lint` → ESLint runs across all components with zero errors or accessibility warnings → AC-10

## Acceptance criteria coverage
- AC-1 Luxury design tokens defined in globals.css with @theme
- AC-2 Architectural sans and prestige serif typography configured
- AC-3 Accessible Button component with variants, focus rings, and 44px touch targets
- AC-4 Container and Section responsive wrappers with uniform padding
- AC-5 SectionHeading with eyebrow badge, serif title, and subtitle
- AC-6 Badge component with color and outline variants
- AC-7 Sticky Header with glass blur, logo, nav links, and phone CTA
- AC-8 Accessible MobileNav drawer with keyboard focus trap and escape dismissal
- AC-9 Semantic multi-column Footer with company info, categories, and opening hours
- AC-10 Root layout.tsx integration with skip link, landmarks, and clean accessibility tree
