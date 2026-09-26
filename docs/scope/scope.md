# Scope: Cubic Pools Group Website Rebuild

A modern, responsive, accessible website for Cubic Pools Group showcasing luxury swimming pool design, construction, products, and maintenance services.

**Build approach:** Tracer Bullet (build vertical slices where each feature works end to end through UI and data).
**Workflow:** Beta (after develop, run check verify then test). The project default level of rigor. /architect is the recommended first stop for a feature with a real decision, but skippable when you already know the build. Any feature can carry its own tag (such as · GA) to do more or less.

_These are recommendations to keep your build orderly, not requirements. Skip anything that does not fit: if you already know how to build a feature, use /develop and skip /architect. You decide when a feature is done._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Stack & architecture | Foundation | done |
| 2 | Coding standards & tooling | Foundation | done |
| 3 | Data model & CMS adapter | Foundation | in-progress |
| 4 | Design system & UI foundation | Foundation | planned |
| 5 | Products catalog & detail modal | Slice 1 | planned |
| 6 | Gallery & lightbox | Slice 2 | planned |
| 7 | About Us & company trust | Slice 3 | planned |
| 8 | Contact & enquiry pipeline | Slice 4 | planned |
| 9 | SEO, performance & accessibility | Slice 5 | planned |

## Foundations

### 1. Stack & architecture · done
Decide the project architecture, framework setup, folder structure, and pnpm dependencies, then scaffold a runnable Next.js application.
**Done when:** the architecture spec records the stack decisions and the scaffold boots locally with pnpm and passes build.
- [x] Decide the stack (spec): /architect stack & architecture
- [x] Scaffold from the decision: /develop stack & architecture
Spec [0001](../specs/0001-stack-and-architecture/index.md) · code in src/

### 2. Coding standards & tooling · done
Capture development conventions into root AGENTS.md, configure linting, formatting, testing tools, and git commit practices.
**Done when:** root AGENTS.md documents the project conventions, and lint, format, and test suites run cleanly.
- [x] Capture conventions + tooling choices: /audit

### 3. Data model & CMS adapter · in-progress
Define TypeScript interfaces and a decoupled CMS adapter interface with a typed local mock provider for products, gallery items, testimonials, and company details.
**Done when:** data contracts are established and the local mock adapter provides complete realistic data that a future headless CMS can fulfill.
- [x] Design it (spec): /architect data model & cms adapter
Spec [0002](../specs/0002-data-model-and-cms-adapter/index.md) · code in src/types/, src/lib/data/
- [x] Build it: /develop data model & cms adapter
  - [x] Zod domain schemas and inferred types (AC-1 to AC-6)
  - [x] ICmsAdapter async contract and provider factory (AC-7, AC-8, AC-11)
  - [x] Realistic luxury pool mock fixtures and local adapter implementation (AC-9, AC-10)
  - [x] Vitest test suite for schemas and query filters (AC-12)
- [ ] Verify it: /check verify data model & cms adapter
- [ ] Test it: /test data model & cms adapter

### 4. Design system & UI foundation · needs a decision
Establish design tokens, typography, luxury pool aesthetic colors, base accessible components, and the main layout shell with header, footer, and navigation.
**Done when:** design tokens are defined in CSS variables, accessible base components are ready, and the responsive layout shell renders navigation and footer.
- [ ] Design it (spec): /architect design system & ui foundation

## Slice 1: Products catalog & detail modal

### 5. Products catalog & detail modal · needs a decision
The core tracer bullet slice connecting data, category filtering, responsive product cards, and a full size product detail modal with image zoom, specs table, focus trap, and URL sync.
**Done when:** users can filter products by category, click any product to open the accessible detail modal with full specs and image zoom, and share or bookmark the product URL.
- [ ] Design it (spec): /architect products catalog & detail modal

## Slice 2: Gallery & lightbox

### 6. Gallery & lightbox · needs a decision
An interactive pool design gallery with category filter chips and a full screen lightbox featuring captions, thumbnail strip, keyboard navigation, and touch swipe gestures.
**Done when:** users can filter pool projects by style, open any photo in the lightbox, navigate with keyboard arrows or touch swipe, and see rich captions.
- [ ] Design it (spec): /architect gallery & lightbox

## Slice 3: About Us & company trust

### 7. About Us & company trust · needs a decision
Company heritage, trust metrics, brand values, builder and architect partnership highlights, and an accessible testimonial carousel with pause controls.
**Done when:** the about page renders company history, trust statistics, values grid, builder logos, and an accessible carousel that handles long text and empty states gracefully.
- [ ] Design it (spec): /architect about us & company trust

## Slice 4: Contact & enquiry pipeline

### 8. Contact & enquiry pipeline · needs a decision
A comprehensive contact page with office information, accessible map embed, Zod validated enquiry form with product prefill, and an API endpoint with spam protection.
**Done when:** prospective clients can submit validated enquiries, product referral links prefill the form, and the API endpoint validates inputs and protects against duplicate submissions.
- [ ] Design it (spec): /architect contact & enquiry pipeline

## Slice 5: SEO, performance & accessibility

### 9. SEO, performance & accessibility · needs a decision
Structured data schema markup, Open Graph tags, sitemap, robots configuration, custom branded error pages, and performance optimizations meeting Lighthouse targets.
**Done when:** all pages achieve Lighthouse scores of 90 or above, structured data validates, sitemap and robots are active, and WCAG 2.2 AA accessibility requirements pass.
- [ ] Design it (spec): /architect seo, performance & accessibility

## Deferred
Out of scope for the current build pass, kept so the plan stays honest.
- Arabic language support and right to left layout · needs a decision
- Live headless CMS integration (Sanity or Strapi live sync) · needs a decision
- Client portal and appointment booking system · needs a decision
- Service worker and offline caching · needs a decision

## Legend

**The decision box.** Every feature carries exactly one, the sub task whose label ends with `(spec)`. Its wording varies (`Design it (spec)` normally, `Decide the stack (spec)` on Stack & architecture), so skills locate it by that `(spec)` suffix, never by an exact label. Every other box is an execution box and /architect never ticks one.

**Feature lifecycle**: the scope updates as a feature moves; each row is what it shows and who sets it:

| State | Set by | The feature shows |
|---|---|---|
| `planned` · needs a decision | `/scope` | one box: `Design it (spec): /architect <feature>` |
| `in-progress` (designed) | `/architect` at spec capture | `Design it` ticked; spec linked; `Build it: /develop <feature>` + 2 to 5 milestones; the tier closing boxes (`Verify it` Alpha+, `Test it` Beta+, `Review it` + `Document it` GA); any surfaced follow up enrolled |
| `in-progress` (building) | `/develop` | milestone sub boxes tick one by one; code pointer filled |
| `in-progress` (verified) | `/check verify` | `Build it` + milestones ticked; `Verify it` ticked |
| `done` | you, when you decide it is (any skill sets it when you say so); `/sync` reconciles | boxes you ran ticked, skipped ones marked skipped; the tier suggested point to call it done; `/sync` captures conventions |

- **Next step** = the first unticked box (always a command or a tracked milestone).
- **needs a decision** = run `/architect` first; otherwise straight to `/develop` (or `/audit` for standards & tooling). The tag drops once the spec is captured.
- **Atomic build tasks live in the spec ## Build plan, not here**: the scope carries only the milestone rollup.
- **Status** `planned` → `in-progress` → `done`, plus `existing` (pre workflow) and `dropped` (de scoped, kept for history).
- **Approach tag** beside a heading (such as `· Facade`) overrides the project default for that feature; no tag = inherits it.
- **Workflow tier tag** beside a heading (such as `· GA`, `· Prototype`) sets that one feature rigor above or below the project default; no tag inherits the default. It decides the feature check boxes and each skill next suggestion.
- **Workflow** (header line) is the project default, what runs after `/develop`: **Prototype** = nothing (trust develop own build time self check); **Alpha** = `/check verify`; **Beta** = `/check verify` then `/test`; **GA** = adds a fresh model `/check review` then `/document`. A feature built on an unratified decision (an `Assumed` spec) stays flagged, but that never blocks `done`.
- **Pointer line** (`spec <n> · code in <path>`): the spec link added by `/architect`, the code path by `/develop`.
