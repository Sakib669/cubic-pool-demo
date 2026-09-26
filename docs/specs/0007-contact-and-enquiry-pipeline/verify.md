# Verification Plan: Contact and Enquiry Pipeline

## Automated Test Coverage

Tests will be located in `src/components/contact/__tests__/contact.test.tsx` and run via `pnpm test`.

### Test Cases

1. **Office Information Rendering (AC-2)**:
   - Verify Double Bay address, phone number, email address, and operating hours render.
2. **Showroom Map Card (AC-3)**:
   - Verify address details, directions button with Google Maps link, and opening schedule.
3. **Form Fields and Controls Rendering (AC-4)**:
   - Verify inputs for full name, email, phone, contact method radios, project type select, product select, budget tier select, and message textarea.
4. **Product Prefill (AC-5)**:
   - Verify passing `initialProductSlug` preselects the corresponding pool model and displays prefill confirmation.
5. **Client Validation Errors (AC-6)**:
   - Verify required field validations (empty name, invalid email, short message).
   - Verify `aria-invalid="true"` and `aria-describedby` error associations.
6. **API Route Validation & Spam Filter (AC-7)**:
   - Verify POST with valid payload returns 201 Created and enquiry ID.
   - Verify POST with invalid payload returns 400 Bad Request with field errors.
   - Verify POST with honeypot field populated silently returns success without persisting.
7. **Form Submission and Success State (AC-8, AC-9)**:
   - Verify submit button shows loading state and disables during submission.
   - Verify successful submission displays confirmation card with reference ID and response time guarantee.
