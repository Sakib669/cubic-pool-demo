# Verify: Data model and CMS adapter · spec 0002 · updated 2026-09-26
_Steps derived from spec 0002 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

## Commands
- [ ] `pnpm test` → 19 Vitest unit tests pass across schemas, adapter queries, filters, and null fallbacks → AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8, AC-10, AC-11, AC-12
- [ ] `pnpm build` → Next.js production build succeeds with clean TypeScript check → AC-11
- [ ] `pnpm lint` → ESLint runs across source files with zero errors → AC-11

## Acceptance-criteria coverage
- AC-1 Category schema covered by adapter.test.ts · AC-2 Product schema covered by adapter.test.ts · AC-3 GalleryProject schema covered by adapter.test.ts · AC-4 Testimonial schema covered by adapter.test.ts · AC-5 CompanyInfo schema covered by adapter.test.ts · AC-6 ContactEnquiry schema covered by adapter.test.ts · AC-7 ICmsAdapter queries and enquiry submission covered by adapter.test.ts · AC-8 non existent slug null returns covered by adapter.test.ts · AC-9 realistic luxury pool mock fixtures verified in mock/ directory · AC-10 category and search query filters covered by adapter.test.ts · AC-11 singleton provider factory covered by adapter.test.ts · AC-12 Vitest suite passing 19/19 tests
