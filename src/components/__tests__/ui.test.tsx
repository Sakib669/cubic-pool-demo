import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { Button, Container, Section, SectionHeading, Badge } from "@/components/ui";
import { Header, Footer, MobileNav } from "@/components/layout";
import { mockCompanyInfo, mockCategories } from "@/lib/data/mock";

describe("Base UI Components & Layout Foundation", () => {
  describe("Button Component (AC-3)", () => {
    it("renders with default primary variant and medium size", () => {
      const html = renderToStaticMarkup(<Button>Book Consultation</Button>);
      expect(html).toContain("Book Consultation");
      expect(html).toContain("bg-navy-900");
      expect(html).toContain("min-h-[44px]");
    });

    it("renders gold and azure luxury variants", () => {
      const goldHtml = renderToStaticMarkup(<Button variant="gold">Gold Action</Button>);
      expect(goldHtml).toContain("bg-gold-500");

      const azureHtml = renderToStaticMarkup(<Button variant="azure">Azure Action</Button>);
      expect(azureHtml).toContain("bg-azure-500");
    });

    it("renders outline, secondary, and ghost variants", () => {
      const outlineHtml = renderToStaticMarkup(<Button variant="outline">Outline</Button>);
      expect(outlineHtml).toContain("border-navy-900/30");

      const secondaryHtml = renderToStaticMarkup(<Button variant="secondary">Secondary</Button>);
      expect(secondaryHtml).toContain("bg-travertine-200");

      const ghostHtml = renderToStaticMarkup(<Button variant="ghost">Ghost</Button>);
      expect(ghostHtml).toContain("hover:bg-travertine-200/60");
    });

    it("handles disabled and isLoading states with accessible attributes", () => {
      const disabledHtml = renderToStaticMarkup(<Button disabled>Disabled</Button>);
      expect(disabledHtml).toContain("disabled");

      const loadingHtml = renderToStaticMarkup(<Button isLoading>Loading</Button>);
      expect(loadingHtml).toContain('aria-busy="true"');
      expect(loadingHtml).toContain("animate-spin");
    });
  });

  describe("Container Component (AC-4)", () => {
    it("renders with default xl max width and responsive horizontal padding", () => {
      const html = renderToStaticMarkup(<Container>Content</Container>);
      expect(html).toContain("max-w-7xl");
      expect(html).toContain("mx-auto");
      expect(html).toContain("px-4");
    });

    it("supports custom size constraints", () => {
      const smHtml = renderToStaticMarkup(<Container size="sm">Small</Container>);
      expect(smHtml).toContain("max-w-2xl");

      const fullHtml = renderToStaticMarkup(<Container size="full">Full</Container>);
      expect(fullHtml).toContain("max-w-full");
    });
  });

  describe("Section Component (AC-4)", () => {
    it("renders semantic section element with default padding and variant", () => {
      const html = renderToStaticMarkup(<Section>Section Content</Section>);
      expect(html).toContain("<section");
      expect(html).toContain("py-16 md:py-24");
      expect(html).toContain("Section Content");
    });

    it("supports dark and muted surface variants", () => {
      const darkHtml = renderToStaticMarkup(<Section variant="dark">Dark</Section>);
      expect(darkHtml).toContain("bg-navy-900");
      expect(darkHtml).toContain("text-travertine-50");

      const mutedHtml = renderToStaticMarkup(<Section variant="muted">Muted</Section>);
      expect(mutedHtml).toContain("bg-travertine-200/50");
    });
  });

  describe("SectionHeading Component (AC-5)", () => {
    it("renders eyebrow, luxury serif title, and subtitle", () => {
      const html = renderToStaticMarkup(
        <SectionHeading
          eyebrow="Architectural Excellence"
          title="Master Pool Construction"
          subtitle="Precision engineered concrete pools."
        />
      );

      expect(html).toContain("Architectural Excellence");
      expect(html).toContain("Master Pool Construction");
      expect(html).toContain("font-serif");
      expect(html).toContain("Precision engineered concrete pools.");
    });

    it("supports custom heading level and inverted colors for dark sections", () => {
      const html = renderToStaticMarkup(
        <SectionHeading
          title="Prestige Portfolio"
          level="h3"
          invert={true}
        />
      );

      expect(html).toContain("<h3");
      expect(html).toContain("text-travertine-50");
    });
  });

  describe("Badge Component (AC-6)", () => {
    it("renders luxury tag variants", () => {
      const azureBadge = renderToStaticMarkup(<Badge variant="azure">Infinity</Badge>);
      expect(azureBadge).toContain("bg-azure-100");
      expect(azureBadge).toContain("Infinity");

      const goldBadge = renderToStaticMarkup(<Badge variant="gold">Featured</Badge>);
      expect(goldBadge).toContain("bg-gold-500/20");

      const outlineBadge = renderToStaticMarkup(<Badge variant="outline">Concrete</Badge>);
      expect(outlineBadge).toContain("border-navy-900/30");
    });
  });

  describe("Header Component (AC-7, AC-10)", () => {
    it("renders semantic header landmark with brand name, navigation links, and phone CTA", () => {
      const html = renderToStaticMarkup(
        <Header companyInfo={mockCompanyInfo} categories={mockCategories} />
      );

      expect(html).toContain("<header");
      expect(html).toContain("Cubic Pools");
      expect(html).toContain("Architectural Group");
      expect(html).toContain('href="/products"');
      expect(html).toContain('href="/gallery"');
      expect(html).toContain('href="/about"');
      expect(html).toContain('href="/contact"');
      expect(html).toContain(mockCompanyInfo.contact.phone);
      expect(html).toContain('aria-label="Open navigation menu"');
    });
  });

  describe("MobileNav Component (AC-8)", () => {
    it("renders dialog with role, aria-modal, and contact information when open", () => {
      const html = renderToStaticMarkup(
        <MobileNav
          isOpen={true}
          onClose={() => {}}
          companyInfo={mockCompanyInfo}
          categories={mockCategories}
        />
      );

      expect(html).toContain('role="dialog"');
      expect(html).toContain('aria-modal="true"');
      expect(html).toContain('aria-label="Navigation Menu"');
      expect(html).toContain(mockCompanyInfo.name);
      expect(html).toContain(mockCompanyInfo.contact.phone);
      expect(html).toContain(mockCompanyInfo.contact.email);
    });

    it("renders nothing when isOpen is false", () => {
      const html = renderToStaticMarkup(
        <MobileNav
          isOpen={false}
          onClose={() => {}}
          companyInfo={mockCompanyInfo}
          categories={mockCategories}
        />
      );

      expect(html).toBe("");
    });
  });

  describe("Footer Component (AC-9, AC-10)", () => {
    it("renders semantic footer landmark with company info, categories, and opening hours", () => {
      const html = renderToStaticMarkup(
        <Footer companyInfo={mockCompanyInfo} categories={mockCategories} />
      );

      expect(html).toContain("<footer");
      expect(html).toContain(mockCompanyInfo.name);
      expect(html).toContain("Architectural Swimming Pools &amp; Wellness Engineering");
      expect(html).toContain(mockCompanyInfo.contact.phone);
      expect(html).toContain(mockCompanyInfo.contact.email);
      expect(html).toContain(mockCompanyInfo.contact.showroomAddress);
      expect(html).toContain(mockCompanyInfo.contact.operatingHours);
      expect(html).toContain(`Founded in ${mockCompanyInfo.heritageYear}`);

      // Category links
      expect(html).toContain("Pool Collections");
      expect(html).toContain(mockCategories[0].name);

      // Social links
      expect(html).toContain("Instagram");
      expect(html).toContain("LinkedIn");

      // Copyright
      expect(html).toContain("All rights reserved.");
    });
  });

  describe("Home Page Surface (AC-1, AC-2, AC-10)", () => {
    it("renders hero section with luxury headline, badges, and action buttons", async () => {
      // Import Home page dynamically to test rendering
      const { default: Home } = await import("@/app/page");
      const html = renderToStaticMarkup(<Home />);

      expect(html).toContain("Engineered for");
      expect(html).toContain("Grand Living");
      expect(html).toContain("Architectural Swimming Pools &amp; Spas");
      expect(html).toContain('href="/products"');
      expect(html).toContain('href="/gallery"');
      expect(html).toContain('href="/contact"');
    });

    it("renders trust pillars with architectural precision details", async () => {
      const { default: Home } = await import("@/app/page");
      const html = renderToStaticMarkup(<Home />);

      expect(html).toContain("Structural Mastery");
      expect(html).toContain("Bespoke Finishes");
      expect(html).toContain("25 Year Warranty");
    });
  });
});

