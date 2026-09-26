# 0002 · Rationale · Data Model and Decoupled CMS Adapter

## Context

Cubic Pools Group represents high end luxury pool engineering, construction, and lifestyle outdoor architecture. The website showcases premium custom pools, architectural lap pools, infinity designs, spa integration, maintenance packages, and customer trust credentials.

To build the frontend slices effectively (product catalog, detail modals, gallery lightboxes, testimonial carousels, and enquiry forms) without blocking on third party CMS account provisioning or database setup, the application requires a robust local data layer. This layer must provide realistic content, exact metric measurements, and rich photography out of the box.

Crucially, components should never import raw mock JSON directly or couple themselves to static file paths. Coupling presentation components to static imports forces large scale refactoring later when transitioning to a remote headless CMS (such as Sanity, Strapi, or Contentful). Establishing an explicit, async adapter interface guarantees that future headless integration is a drop in provider swap.

## Options considered

### Option 1: Unified Async Interface with Zod Schemas and Local Mock Provider

Define typed async interfaces (`ICmsAdapter`) alongside runtime Zod schemas. Provide an in memory implementation (`LocalMockCmsAdapter`) populated with realistic luxury pool fixtures.

**Pros**:
- Single source of truth for runtime validation and static TypeScript types.
- UI components use standard async server/client patterns identical to fetching from a remote API or CMS.
- Transitioning to a live CMS requires writing only one adapter class implementing the same interface.

**Cons**:
- Requires writing initial mock fixture files and maintaining them during development.

### Option 2: Direct Static Mock Imports in Components

Store mock JSON or TypeScript objects in `src/data/` and import them directly into page components without an interface abstraction.

**Pros**:
- Fastest to write initially with no interface boilerplate.

**Cons**:
- Directly couples every component to local file structures.
- Migrating to a headless CMS later requires finding and modifying dozens of component files and data access points.
- Lacks runtime schema validation.

### Option 3: Full Backend Headless CMS Setup Upfront

Stand up a headless CMS instance immediately (such as Strapi or Sanity) and connect the frontend before building any UI slices.

**Pros**:
- Immediate production architecture from day one.

**Cons**:
- Introduces external dependencies, API rate limits, environment credentials, and network latency during initial UI prototyping.
- Slows down the tracer bullet development cadence.

## Rationale

Option 1 is selected because it delivers the optimal balance of immediate developer velocity and long term architectural integrity. By abstracting data access behind the `ICmsAdapter` interface, the team can build full vertical slices (catalog, detail modals, gallery, testimonials) immediately with zero external dependencies. When a headless CMS is ready, swapping the provider requires only implementing `RemoteCmsAdapter` against the established contract.
