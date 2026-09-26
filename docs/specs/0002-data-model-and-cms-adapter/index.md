# 0002. Define Data Model and Decoupled CMS Adapter

**Date**: 2026-09-26
**Status**: In Progress

## Summary

This specification establishes the core TypeScript data model and decoupled CMS adapter architecture for Cubic Pools Group. It defines Zod runtime validation schemas alongside static TypeScript interfaces for products, categories, gallery projects, testimonials, company details, and customer enquiries. A typed async adapter contract provides local mock fixtures with realistic luxury pool imagery and attributes, enabling fast UI development while remaining ready to swap for a remote headless CMS with zero component rewrites.

## Requirements

**User stories**:
- As a site visitor, I want to browse luxury pool products, gallery installations, customer testimonials, and company trust metrics with instant page loads and complete technical specifications.
- As a frontend engineer, I want a strongly typed data layer with unified async query methods so that UI components remain decoupled from whether data originates from local mock files or an external headless CMS.
- As a prospective client, I want to submit contact and consultation enquiries with validated contact details and optional pool product interest.

**Acceptance criteria**:
- **AC-1**: Category schema validates id, slug, name, description, and optional icon string.
- **AC-2**: Product schema validates id, slug, name, tagline, description, categoryId reference, price tier, dimensions (length, width, depth in meters), water volume, shell material, warranty years, feature bullet list, and image objects array.
- **AC-3**: GalleryProject schema validates id, slug, title, style tag, location, completion year, cover image, image gallery array, description, and optional relatedProductId reference.
- **AC-4**: Testimonial schema validates id, clientName, clientRole, location, numeric rating from 1 to 5, quote text, projectTitle, and optional avatarUrl.
- **AC-5**: CompanyInfo schema validates name, tagline, heritageYear, statistics metrics, contact details (phone, email, showroom address, opening hours), and social links.
- **AC-6**: ContactEnquiry schema validates fullName, email address, phone number, preferred contact method, project type selection, optional interestedProductId, estimated budget tier ('Under $50k' | '$50k to $100k' | '$100k to $250k' | '$250k+'), message text, and creation timestamp.
- **AC-7**: The `ICmsAdapter` interface defines async query methods returning typed Promises (`getProducts`, `getProductBySlug`, `getCategories`, `getCategoryBySlug`, `getGalleryProjects`, `getProjectBySlug`, `getTestimonials`, `getCompanyInfo`) and mutation method `submitContactEnquiry`.
- **AC-8**: Querying for a non existent product or gallery project slug returns `null` gracefully rather than throwing an unhandled runtime error.
- **AC-9**: Mock fixtures provide realistic luxury pool data including high resolution Unsplash pool photography, metric dimensions, architectural style tags, and verified customer testimonials.
- **AC-10**: Product query filters support filtering by category slug or category id, and case insensitive text search matching product name or tagline.
- **AC-11**: An exported factory function supplies the active CMS adapter instance configured by environment variables, defaulting to the local mock adapter.
- **AC-12**: Vitest unit test suite verifies schema parsing, adapter query filtering, missing slug null returns, and enquiry validation.

## Decision

**Chosen option**: Option 1: Unified Async Interface with Zod Validation Schemas and Local Mock Provider

We define full runtime Zod schemas and inferred TypeScript types in `src/types/`, establish an async `ICmsAdapter` contract in `src/lib/data/adapter.ts`, and provide a production ready `LocalMockCmsAdapter` populated with realistic luxury pool fixtures.

**Implementation skills**: `vercel-react-best-practices` (`vercel-labs/agent-skills`, `.agents/skills/vercel-react-best-practices/`)

## Rationale

See [rationale.md](./rationale.md) for context, options considered, and trade-off evaluation.

## Feature design

**Data model sketch**:

`Category`:
- `id`: string (PK)
- `slug`: string (unique)
- `name`: string
- `description`: string
- `icon`: string (optional)

`Product`:
- `id`: string (PK)
- `slug`: string (unique)
- `name`: string
- `tagline`: string
- `description`: string
- `categoryId`: string (FK -> Category.id, N:1)
- `priceTier`: '$' | '$$' | '$$$' | '$$$$'
- `dimensions`: { lengthMeters: number, widthMeters: number, depthMeters: number }
- `waterVolumeLiters`: number
- `shellMaterial`: string (e.g. 'Reinforced Architectural Concrete', 'Composite Ceramic Core')
- `warrantyYears`: number
- `features`: string[]
- `isFeatured`: boolean
- `images`: Array<{ url: string, alt: string, width: number, height: number }>

`GalleryProject`:
- `id`: string (PK)
- `slug`: string (unique)
- `title`: string
- `style`: 'Infinity' | 'Modern Geometric' | 'Natural Oasis' | 'Architectural Lap' | 'Indoor Sanctuary'
- `location`: string
- `completionYear`: number
- `description`: string
- `features`: string[]
- `relatedProductId`: string (optional, FK -> Product.id, N:1)
- `coverImage`: { url: string, alt: string, width: number, height: number }
- `images`: Array<{ url: string, alt: string, width: number, height: number }>

`Testimonial`:
- `id`: string (PK)
- `clientName`: string
- `clientRole`: string
- `location`: string
- `rating`: number (1 to 5)
- `quote`: string
- `projectTitle`: string
- `avatarUrl`: string (optional)

`CompanyInfo`:
- `name`: string
- `tagline`: string
- `heritageYear`: number
- `stats`: { projectsCompleted: number, awardsWon: number, satisfactionRatePercent: number, masterBuildersCount: number }
- `contact`: { phone: string, email: string, showroomAddress: string, operatingHours: string }
- `socialLinks`: { instagram: string, linkedin: string, facebook: string, pinterest: string }

`ContactEnquiry`:
- `id`: string (PK)
- `fullName`: string
- `email`: string
- `phone`: string
- `preferredContactMethod`: 'email' | 'phone'
- `projectType`: 'New Build' | 'Renovation' | 'Commercial' | 'Maintenance'
- `interestedProductId`: string (optional, FK -> Product.id)
- `estimatedBudget`: 'Under $50k' | '$50k to $100k' | '$100k to $250k' | '$250k+'
- `message`: string
- `createdAt`: string (ISO date string)

**State transitions**:
Static mock content is immutable and read only. Contact enquiries follow: `Created` -> `Validated` -> `Submitted`.

**API surface**:

| Interface Method | Parameters | Return Type | Auth | Error Handling |
|---|---|---|---|---|
| `getProducts` | `filter?: { categoryId?: string, categorySlug?: string, search?: string, featured?: boolean }` | `Promise<Product[]>` | Public | Returns empty array if no match |
| `getProductBySlug` | `slug: string` | `Promise<Product \| null>` | Public | Returns `null` if not found |
| `getCategories` | none | `Promise<Category[]>` | Public | Returns array |
| `getCategoryBySlug` | `slug: string` | `Promise<Category \| null>` | Public | Returns `null` if not found |
| `getGalleryProjects` | `filter?: { style?: string, relatedProductId?: string }` | `Promise<GalleryProject[]>` | Public | Returns empty array if no match |
| `getProjectBySlug` | `slug: string` | `Promise<GalleryProject \| null>` | Public | Returns `null` if not found |
| `getTestimonials` | none | `Promise<Testimonial[]>` | Public | Returns array |
| `getCompanyInfo` | none | `Promise<CompanyInfo>` | Public | Returns static company info |
| `submitContactEnquiry` | `enquiry: CreateContactEnquiryInput` | `Promise<{ success: boolean; id: string }>` | Public | Throws or returns validation issues |

**Value sourcing**:

| Action | Value produced / displayed | Source |
|---|---|---|
| Filter products by category | Matching product listing | `Product.categoryId` matched against resolved `Category.id` |
| Search products by query | Filtered product listing | Substring match on `Product.name` and `Product.tagline` |
| View product detail modal | Dimensions, volume, shell material | In memory fixture fields parsed via `productSchema` |
| View project in gallery | High resolution cover and gallery imagery | Validated image objects in `GalleryProject.images` |
| View company trust section | Heritage year and project statistics | Static `CompanyInfo.stats` fields |
| Submit contact form | Validated enquiry payload | Form input validated against `contactEnquirySchema` |

**Key invariants**:
- Every product references a valid category id that exists in the categories dataset.
- The first image in `Product.images` serves as the primary cover image and thumbnail across cards and listings.
- Slugs for products, categories, and gallery projects are lowercase, hyphen separated strings unique within their entity type.
- Dimensions and numeric ratings are positive numbers strictly greater than zero.
- Image objects always contain non empty url and alt text descriptions for accessibility.

**Security model**:
All catalog reading queries are public with no authentication required. Contact enquiry submission validates input schemas strictly and sanitizes input text before logging or storing.

**Configuration required**:
- `NEXT_PUBLIC_CMS_PROVIDER`: Optional provider flag ('mock' or 'remote', defaults to 'mock').

**Critical test scenarios**:
- Happy path: `getProducts` with category filter returns matching products; `getProductBySlug` with valid slug returns complete product with images, verifies **AC-2**, **AC-7**, **AC-10**.
- Failure case: `getProductBySlug` or `getProjectBySlug` with non existent slug returns `null` without throwing unhandled exception, verifies **AC-8**.
- Validation case: Parsing invalid product or contact payload through Zod schema rejects malformed fields with structured validation issues, verifies **AC-2**, **AC-6**, **AC-12**.

## Build plan

- [x] Install zod dependency via pnpm and configure TypeScript types in `src/types/index.ts` (satisfies AC-1, AC-2, AC-3, AC-4, AC-5, AC-6)
- [x] Define `ICmsAdapter` contract in `src/lib/data/adapter.ts` with typed async query and mutation methods (satisfies AC-7, AC-8)
- [x] Create realistic luxury pool mock datasets in `src/lib/data/mock/` for categories, products, gallery projects, testimonials, and company details (satisfies AC-9)
- [x] Implement `LocalMockCmsAdapter` in `src/lib/data/mock-adapter.ts` supporting filtering, slug lookups, null fallback, and enquiry submission (satisfies AC-7, AC-8, AC-10)
- [x] Create adapter factory export in `src/lib/data/index.ts` with singleton instance (satisfies AC-11)
- [x] Add Vitest test suite in `src/lib/data/__tests__/adapter.test.ts` verifying schema parsing and query filters (satisfies AC-12)

## Consequences

**Positive**:
- UI components consume a stable async contract that never changes when migrating to Sanity, Strapi, or Contentful.
- Zod runtime validation guarantees data integrity and provides TypeScript inference from a single source of truth.
- Mock fixtures include realistic luxury pool assets and technical specifications, preventing dummy data placeholders.

**Negative / tradeoffs**:
- Maintaining local mock fixtures requires keeping sample JSON/TypeScript objects updated if schema fields evolve.

**Neutral**:
- Adds lightweight runtime dependency on Zod for schema parsing.

## Follow-up

- [ ] Implement remote headless CMS adapter when live CMS credentials and webhooks are configured.
- [ ] Connect contact enquiry submissions to an external CRM or transactional email service.
