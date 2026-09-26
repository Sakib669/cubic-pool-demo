# 0001 · Rationale · Stack and architecture

## Context

Cubic Pools Group requires a modern enterprise web presence to showcase luxury pool design, construction, products, and maintenance services. The website must deliver visual parity with industry references, provide an interactive product catalog with full image detail modals, present a smooth gallery lightbox, and offer a validated contact enquiry workflow.

The architecture must achieve Lighthouse scores of 90 or higher, conform to WCAG 2.2 AA accessibility standards, support search engine optimization with structured data, and maintain strict separation between presentation and data sources. Building on a unified TypeScript stack with a modular folder structure ensures long term maintainability and rapid feature delivery.

## Options considered

### Option 1: Next.js App Router with TypeScript and Tailwind CSS

A unified React framework providing Static Site Generation, route handlers for API endpoints, built in image optimization via next/image, and metadata management. Combined with Tailwind CSS design tokens and shadcn UI primitives, it delivers accessibility and rapid UI development.

**Pros**:
- Server components and static page generation maximize performance and search engine ranking
- Native image optimization handles responsive sizing and modern image formats automatically
- Accessible primitives from Radix UI guarantee keyboard navigation and focus management
- Route handlers allow contact form submission and spam protection within the same application

**Cons**:
- Requires clear discipline separating server and client component boundaries

### Option 2: Single Page Application with Vite and React

A pure client side React application built with Vite and client side routing.

**Pros**:
- Simple mental model where all components execute in the browser
- Fast local development server

**Cons**:
- Poor initial page load performance and search engine crawling limitations
- Requires separate hosting or backend service for contact form handling and rate limiting

### Option 3: Astro Content Driven Site

A content focused multi page architecture rendering minimal JavaScript by default.

**Pros**:
- Lightweight static pages with minimal script overhead

**Cons**:
- More friction when integrating complex client state, dynamic category filters, and interactive modals
- Less cohesive ecosystem for complex enterprise forms and interactive product catalogs
