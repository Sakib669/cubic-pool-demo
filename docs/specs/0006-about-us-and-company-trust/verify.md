# Verification Plan: About Us and Company Trust

## Automated Test Coverage

Tests will be located in `src/components/about/__tests__/about.test.tsx` and run via `pnpm test`.

### Test Cases

1. **Heritage and Hero Rendering**:
   - Verify company name, founding year 2004, and brand narrative render correctly.
2. **Trust Statistics Grid**:
   - Verify `projectsCompleted` (480), `awardsWon` (34), `satisfactionRatePercent` (99%), and `masterBuildersCount` (28) are formatted and displayed with labels.
3. **Values Grid**:
   - Verify the four brand pillars render with titles and descriptions.
4. **Partners Credentials**:
   - Verify partnership badges and industry affiliations render.
5. **Testimonial Carousel Keyboard and Interaction**:
   - Verify carousel renders active testimonial with quote, author, role, rating, and project name.
   - Verify clicking Next advances slide.
   - Verify clicking Previous retreats slide.
   - Verify pressing ArrowRight and ArrowLeft keys navigates slides.
   - Verify clicking dot indicators navigates to corresponding slide.
6. **Autoplay and Pause Accessibility (WCAG 2.2 AA 2.2.2)**:
   - Verify play and pause toggle button switches state and carries accessible aria label.
7. **Empty and Single Item Resilience**:
   - Verify carousel gracefully handles an empty array of testimonials without throwing errors.
   - Verify carousel with a single testimonial renders the card without navigation arrows.
8. **Consultation CTA**:
   - Verify showroom address, contact link, and CTA buttons are present.
