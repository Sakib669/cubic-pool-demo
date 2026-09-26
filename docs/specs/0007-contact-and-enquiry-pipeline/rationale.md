# Rationale: Contact and Enquiry Pipeline

## Context and Problem

The contact pipeline is the primary commercial conversion funnel for Cubic Pools Group. Prospects submitting an enquiry are typically planning high value pool construction projects. The experience must provide clear confidence, instant prefill from catalog browsing, and accessible validation feedback while blocking automated spam.

## Alternatives Considered

### Option 1: Embedded third party iframe form
- Use HubSpot, Typeform, or Mailchimp embed.
- Downside: Inconsistent styling with dark luxury aesthetic, external script overhead, lack of deep linking with catalog models, accessibility barriers.

### Option 2: Pure client form with direct database insert
- Direct client call to database.
- Downside: Insecure, exposes credentials, bypasses backend validation and honeypot checks.

### Option 3 (Chosen): Next.js Route Handler with Zod schema validation and honeypot protection
- Native Next.js Server Component page prefetching company contact info and product models.
- Client Component enquiry form providing real time inline errors and prefill detection from `?product=[slug]`.
- API Route `/api/contact` enforcing `CreateContactEnquirySchema` validation, catching bot submissions via honeypot field, and delegating to `getCmsAdapter().submitContactEnquiry()`.
