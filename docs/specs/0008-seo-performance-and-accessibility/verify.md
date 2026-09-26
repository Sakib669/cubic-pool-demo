# Verification Plan: SEO, Performance and Accessibility

## Automated Test Coverage

Tests will be located in `src/components/seo/__tests__/seo.test.tsx` and run via `pnpm test`.

### Test Cases

1. **Sitemap Generation (AC-1)**:
   - Verify `sitemap()` returns entries for all static pages (`/`, `/products`, `/gallery`, `/about`, `/contact`).
   - Verify `sitemap()` includes dynamic entries for each product model.
   - Verify each entry has valid `url`, `lastModified`, and `changeFrequency`.
2. **Robots Directives (AC-2)**:
   - Verify `robots()` allows crawling of public paths and disallows `/api/`.
   - Verify sitemap URL points to `https://cubicpoolsgroup.com/sitemap.xml`.
3. **Structured Data JSON-LD (AC-4)**:
   - Verify `LocalBusinessJsonLd` outputs valid Schema.org JSON with address, telephone, and geo coordinates.
   - Verify `ProductJsonLd` outputs valid Schema.org JSON with product name, description, image, and offers.
   - Verify `ImageGalleryJsonLd` outputs valid Schema.org ImageGallery items.
4. **Branded 404 Not Found Page (AC-5)**:
   - Verify 404 page renders clear heading, reassuring luxury copy, and links to products and gallery.
5. **Branded Error Boundaries (AC-6, AC-7)**:
   - Verify `error.tsx` renders error message, retry button calling `reset()`, and concierge phone link.
   - Verify `global-error.tsx` renders valid HTML document structure with retry button.
