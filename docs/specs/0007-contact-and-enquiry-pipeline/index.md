# 0007. Contact and Enquiry Pipeline

**Date**: 2026-09-26
**Status**: Accepted

## Summary

This specification defines the Contact and enquiry pipeline for Cubic Pools Group. It delivers an authoritative contact page at `/contact`, presents showroom location and operating details, provides an interactive map navigation card, and implements an accessible luxury enquiry form synchronized with pool product prefill query parameters. An API route at `/api/contact` validates incoming submissions with Zod, filters bot traffic with honeypot spam detection, and delegates to the CMS adapter.

## Requirements

**User stories**:
- As a prospective client browsing a pool model, I want to click an enquiry button and arrive at the contact form with that model preselected so that I do not need to retype my pool choice.
- As an architect or builder requesting a site consultation, I want to submit project details, estimated budget tier, and preferred communication method with instant validation feedback.
- As a visitor wishing to visit the Double Bay showroom, I want to see operating hours, address details, and directions to plan my visit.
- As a screen reader user, I want form fields to announce errors, required states, and submission outcomes accessibly.

**Acceptance criteria**:
- **AC-1**: Contact page at `/contact` fetches company contact info and all products concurrently via `Promise.all([getCmsAdapter().getCompanyInfo(), getCmsAdapter().getProducts()])`.
- **AC-2**: Office information panel renders the Double Bay showroom address, direct telephone link, email mailto link, operating hours, and social media channels.
- **AC-3**: Showroom map card renders an architectural map preview with address coordinates, landmark directions, and an external link to Google Maps.
- **AC-4**: Enquiry form collects full name, email, phone, preferred contact method (email or phone), project type, pool product model, budget tier, and project message.
- **AC-5**: Visiting `/contact?product=[slug]` automatically detects the matching pool model, preselects it in the product dropdown, and displays a prefill confirmation badge.
- **AC-6**: Form validation uses `CreateContactEnquirySchema` with accessible inline field errors, `aria-invalid`, `aria-describedby`, and focus on the first erroneous input on submit.
- **AC-7**: API route at `src/app/api/contact/route.ts` handles POST requests, validates payloads against `CreateContactEnquirySchema`, silently ignores bot honeypot submissions, and delegates valid enquiries to `getCmsAdapter().submitContactEnquiry()`.
- **AC-8**: Form submission displays a loading spinner with `aria-busy="true"`, disabling the submit button to prevent double submissions.
- **AC-9**: Successful submission renders an accessible confirmation card with reference ID, client name, and a 24 hour response guarantee.
- **AC-10**: Submission errors render an accessible banner allowing retry without losing previously entered form data.
- **AC-11**: Conforms to WCAG 2.2 AA with minimum 44x44px touch targets, visible focus rings, and dark luxury aesthetic styling.

## Decision

**Chosen option**: Next.js Server Component page prefetching initial data, Client Component form with client side and server side Zod validation, and Next.js Route Handler for enquiry processing.

**Implementation skills**: `vercel-react-best-practices` (`vercel-labs/agent-skills`, `.agents/skills/vercel-react-best-practices/`)

## Rationale

Reasoning and options: see [rationale.md](rationale.md).

## Feature design

### Component Contracts

```typescript
export interface ContactInfoProps {
  contact: CompanyInfo["contact"];
  socialLinks: CompanyInfo["socialLinks"];
}

export interface ShowroomMapCardProps {
  showroomAddress: string;
}

export interface EnquiryFormProps {
  products: Product[];
  initialProductSlug?: string;
}
```

### Route Metadata for `/contact`

```typescript
export const metadata: Metadata = {
  title: "Contact & Concierge | Cubic Pools Group",
  description: "Connect with our principal pool engineers and landscape architects. Visit our Double Bay showroom or request a private estate consultation.",
  openGraph: {
    title: "Contact & Concierge | Cubic Pools Group",
    description: "Book an architectural pool consultation or visit our Double Bay showroom.",
  },
};
```

## Build plan

**Tasks**:
- [x] 1. Draft Spec 0007 (index.md, rationale.md, verify.md).
- [x] 2. Create API endpoint `src/app/api/contact/route.ts` with Zod validation and honeypot protection.
- [x] 3. Create Contact components in `src/components/contact/`:
  - `src/components/contact/contact-info.tsx`: Office hours, address, phone, email, socials
  - `src/components/contact/showroom-map.tsx`: Showroom map card with directions link
  - `src/components/contact/enquiry-form.tsx`: Client form with validation, prefill, loading, and confirmation
  - `src/components/contact/index.ts`: Barrel file
- [x] 4. Create Server Component route `src/app/contact/page.tsx` prefetching company info and products.
- [x] 5. Create unit and integration test suite `src/components/contact/__tests__/contact.test.tsx` and API route tests.
- [x] 6. Run test suite, build, and linter to verify zero regressions.
