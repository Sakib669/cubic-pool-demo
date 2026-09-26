import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import {
  LocalBusinessJsonLd,
  ProductJsonLd,
  ImageGalleryJsonLd,
} from "@/components/seo";
import NotFound from "@/app/not-found";
import ErrorBoundary from "@/app/error";
import {
  mockCompanyInfo,
  mockProducts,
  mockGalleryProjects,
} from "@/lib/data/mock";

describe("SEO, Performance & Accessibility (Spec 0008)", () => {
  describe("Dynamic XML Sitemap (AC-1)", () => {
    it("generates sitemap with core static routes and all dynamic product slugs", async () => {
      const items = await sitemap();

      expect(items.length).toBeGreaterThanOrEqual(5 + mockProducts.length);

      const urls = items.map((i) => i.url);
      expect(urls).toContain("https://cubicpoolsgroup.com");
      expect(urls).toContain("https://cubicpoolsgroup.com/products");
      expect(urls).toContain("https://cubicpoolsgroup.com/gallery");
      expect(urls).toContain("https://cubicpoolsgroup.com/about");
      expect(urls).toContain("https://cubicpoolsgroup.com/contact");

      mockProducts.forEach((p) => {
        expect(urls).toContain(`https://cubicpoolsgroup.com/products/${p.slug}`);
      });

      items.forEach((item) => {
        expect(item.url).toMatch(/^https:\/\/cubicpoolsgroup\.com/);
        expect(item.lastModified).toBeDefined();
        expect(item.changeFrequency).toBeDefined();
        expect(item.priority).toBeDefined();
      });
    });
  });

  describe("Robots Crawler Configuration (AC-2)", () => {
    it("allows public crawling, disallows /api/, and points to sitemap.xml", () => {
      const config = robots();

      expect(config.rules).toBeDefined();
      const rules = Array.isArray(config.rules) ? config.rules[0] : config.rules;
      expect(rules.userAgent).toBe("*");
      expect(rules.allow).toBe("/");
      expect(rules.disallow).toEqual(["/api/"]);
      expect(config.sitemap).toBe("https://cubicpoolsgroup.com/sitemap.xml");
    });
  });

  describe("Structured Data JSON-LD Components (AC-4)", () => {
    it("renders valid Schema.org LocalBusiness structured data", () => {
      const html = renderToStaticMarkup(
        <LocalBusinessJsonLd companyInfo={mockCompanyInfo} />
      );

      expect(html).toContain('type="application/ld+json"');
      const jsonMatch = html.match(
        /<script type="application\/ld\+json">(.*?)<\/script>/
      );
      expect(jsonMatch).not.toBeNull();

      const parsed = JSON.parse(jsonMatch![1]);
      expect(parsed["@context"]).toBe("https://schema.org");
      expect(parsed["@type"]).toContain("LocalBusiness");
      expect(parsed["@type"]).toContain("HomeAndConstructionBusiness");
      expect(parsed.name).toBe(mockCompanyInfo.name);
      expect(parsed.telephone).toBe(mockCompanyInfo.contact.phone);
      expect(parsed.address.addressLocality).toBe("Double Bay");
      expect(parsed.geo.latitude).toBe(-33.876);
      expect(parsed.priceRange).toBe("$$$$");
    });

    it("renders valid Schema.org Product structured data", () => {
      const product = mockProducts[0];
      const html = renderToStaticMarkup(<ProductJsonLd product={product} />);

      expect(html).toContain('type="application/ld+json"');
      const jsonMatch = html.match(
        /<script type="application\/ld\+json">(.*?)<\/script>/
      );
      expect(jsonMatch).not.toBeNull();

      const parsed = JSON.parse(jsonMatch![1]);
      expect(parsed["@context"]).toBe("https://schema.org");
      expect(parsed["@type"]).toBe("Product");
      expect(parsed.name).toBe(product.name);
      expect(parsed.brand.name).toBe("Cubic Pools Group");
      expect(parsed.offers.availability).toBe("https://schema.org/InStock");
    });

    it("renders valid Schema.org ImageGallery structured data", () => {
      const html = renderToStaticMarkup(
        <ImageGalleryJsonLd projects={mockGalleryProjects} />
      );

      expect(html).toContain('type="application/ld+json"');
      const jsonMatch = html.match(
        /<script type="application\/ld\+json">(.*?)<\/script>/
      );
      expect(jsonMatch).not.toBeNull();

      const parsed = JSON.parse(jsonMatch![1]);
      expect(parsed["@context"]).toBe("https://schema.org");
      expect(parsed["@type"]).toBe("ImageGallery");
      expect(parsed.image.length).toBeGreaterThan(0);
    });
  });

  describe("Branded 404 Not Found Page (AC-5)", () => {
    it("renders luxury not found view with navigation links", () => {
      const html = renderToStaticMarkup(<NotFound />);

      expect(html).toContain("Error 404");
      expect(html).toContain("Uncharted Waters");
      expect(html).toContain('href="/products"');
      expect(html).toContain('href="/gallery"');
      expect(html).toContain('href="/contact"');
      expect(html).toContain('href="/"');
      expect(html).toContain("Return to Homepage");
    });
  });

  describe("Branded Error Boundary (AC-6)", () => {
    it("renders error boundary with diagnostic digest and reset button", () => {
      const sampleError = new Error("Hydraulic pressure timeout") as Error & {
        digest?: string;
      };
      sampleError.digest = "test-digest-4049";

      const html = renderToStaticMarkup(
        <ErrorBoundary error={sampleError} reset={() => {}} />
      );

      expect(html).toContain("System Notice");
      expect(html).toContain("Temporary Hydraulic Interruption");
      expect(html).toContain("Diagnostic Digest: test-digest-4049");
      expect(html).toContain("Retry Rendering");
      expect(html).toContain('href="/contact"');
      expect(html).toContain('href="/"');
    });
  });
});
