---
name: luxury-pool-architectural-design-system
source: derived
character: "Prestige Australian architectural swimming pool aesthetic. Deep ocean navy canvas paired with warm travertine sand neutrals, luminous azure blue highlights, and editorial serif display typography that communicates craftsmanship, structural precision, and timeless luxury."
tokens: "real values live in the project styling system (src/app/globals.css); read them there, never duplicated here"
contrast: "verified WCAG 2.2 AA compliant: body on canvas 11.8:1, headings on canvas 14.5:1, on-accent on azure 4.6:1, text on gold 4.8:1, interactive borders 3.2:1"
---

## Build mandate
You are a senior product designer. Every page ships as a complete, professional product surface: brand, real product specific copy, a considered layout with visual hierarchy, all states (empty, loading, error), supporting content, and a comprehensive footer where the page warrants one. Maximalist and bespoke, never a lone form floating on an empty page.

## Character & direction
The visual identity reflects the architectural grandeur of luxury residential and commercial pools in Australia. The palette draws from Mediterranean azure water, deep ocean navy depths, and sun bleached travertine stone coping. Editorial typography pairs a high prestige serif for titles with a razor sharp architectural sans for body readability.

## Composition patterns
- Layout shell: Sticky navigation header with frosted glass blur, floating above content without occluding readability.
- Section rhythm: Generous vertical padding (`py-16 md:py-24`) establishing a calm, unhurried luxury tempo.
- Horizontal gutters: Max width container constraints (`max-w-7xl`) keeping content optically centered on wide luxury desktop monitors.
- Eyebrows and badges: Elegant pill tags in warm gold or azure blue accenting category names and project status.

## Component & usage rules
- Primary buttons: Rich gold or azure blue with dark slate text, clear hover states, and WCAG compliant focus rings.
- Secondary buttons: Travertine border with transparent background and subtle hover tint.
- Elevation: Tactile depth created through soft shadows and frosted glass backdrop blur rather than heavy black drop shadows.
- Touch targets: Minimum 44 by 44 pixels on all clickable buttons, links, and drawer triggers.

## Responsive & accessibility direction
- Landmarks: Semantic `<header>`, `<nav>`, `<main>`, and `<footer>` present on every page.
- Skip link: Visible on keyboard focus, jumping directly to main landmark.
- Focus rings: 2px offset focus indicators visible on both dark and light surfaces.
- Mobile drawer: Complete keyboard focus trap, escape key dismissal, and backdrop scroll lock.
