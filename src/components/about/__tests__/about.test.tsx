import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import {
  AboutHero,
  AboutStats,
  AboutValues,
  AboutPartners,
  TestimonialCarousel,
  AboutCta,
} from "@/components/about";
import { mockCompanyInfo, mockTestimonials } from "@/lib/data/mock";
import type { Testimonial } from "@/types";

describe("About Us & Company Trust Components (Spec 0006)", () => {
  describe("AboutHero Component (AC-2)", () => {
    it("renders brand heritage year, company name, and narrative paragraphs", () => {
      const html = renderToStaticMarkup(
        <AboutHero companyInfo={mockCompanyInfo} />
      );

      expect(html).toContain("Established 2004");
      expect(html).toContain("Cubic Pools Group");
      expect(html).toContain("Pioneering Architectural Waterscapes Since 2004");
      expect(html).toContain("Founded in Sydney in 2004");
      expect(html).toContain("alt=\"Architectural infinity pool overlooking coastal horizon\"");
    });
  });

  describe("AboutStats Component (AC-3)", () => {
    it("renders trust statistics with semantic dl, dt, dd elements and formatted values", () => {
      const html = renderToStaticMarkup(
        <AboutStats stats={mockCompanyInfo.stats} />
      );

      expect(html).toContain("<dl");
      expect(html).toContain("<dt");
      expect(html).toContain("<dd");
      expect(html).toContain("480+");
      expect(html).toContain("Masterpiece Installations");
      expect(html).toContain("34");
      expect(html).toContain("National Architecture Awards");
      expect(html).toContain("99%");
      expect(html).toContain("Client Satisfaction Index");
      expect(html).toContain("28");
      expect(html).toContain("Master Pool Builders");
    });
  });

  describe("AboutValues Component (AC-4)", () => {
    it("renders four core craftsmanship pillars with descriptions", () => {
      const html = renderToStaticMarkup(<AboutValues />);

      expect(html).toContain("Architectural Integrity");
      expect(html).toContain("Engineering Rigor");
      expect(html).toContain("Sustainable Water Systems");
      expect(html).toContain("Concierge Client Care");
      expect(html).toContain("Every line, weir edge, and coping rebate");
      expect(html).toContain("geotechnical soil anchoring");
      expect(html).toContain("Magnesium mineral sanitization");
      expect(html).toContain("lifetime hydraulic servicing");
    });
  });

  describe("AboutPartners Component (AC-5)", () => {
    it("renders industry credentials and architectural affiliations", () => {
      const html = renderToStaticMarkup(<AboutPartners />);

      expect(html).toContain("SPASA Master Pool Builder");
      expect(html).toContain("Master Builders Australia");
      expect(html).toContain("Australian Institute of Architects");
      expect(html).toContain("Hydraulic Engineering Council");
      expect(html).toContain("Corporate Practice Partner");
    });
  });

  describe("TestimonialCarousel Component (AC-6, AC-7, AC-8, AC-9)", () => {
    it("renders active testimonial with quote, rating, client details, and controls", () => {
      const html = renderToStaticMarkup(
        <TestimonialCarousel testimonials={mockTestimonials} />
      );

      expect(html).toContain('role="region"');
      expect(html).toContain('aria-roledescription="carousel"');
      expect(html).toContain('aria-label="Client testimonials"');
      expect(html).toContain('tabindex="0"');
      expect(html).toContain('role="group"');
      expect(html).toContain('aria-roledescription="slide"');
      expect(html).toContain('aria-label="Slide 1 of 5"');

      // First testimonial content
      expect(html).toContain(mockTestimonials[0].clientName.replace(/&/g, "&amp;"));
      expect(html).toContain(mockTestimonials[0].clientRole);
      expect(html).toContain(mockTestimonials[0].location);
      expect(html).toContain(mockTestimonials[0].projectTitle);
      expect(html).toContain("Rated 5 out of 5 stars");

      // Controls present for multi item dataset
      expect(html).toContain('aria-label="Pause testimonial rotation"');
      expect(html).toContain('aria-label="Previous testimonial"');
      expect(html).toContain('aria-label="Next testimonial"');
      expect(html).toContain('role="tablist"');
      expect(html).toContain('aria-label="Jump to slide 1"');
    });

    it("renders monogram initials fallback when avatarUrl is omitted", () => {
      const noAvatarTestimonial: Testimonial = {
        id: "no-avatar",
        clientName: "David Sterling",
        clientRole: "Architect",
        location: "Perth, WA",
        rating: 5,
        quote: "Exemplary engineering and flawless water clarity.",
        projectTitle: "Cottesloe Cliff Pool",
      };

      const html = renderToStaticMarkup(
        <TestimonialCarousel testimonials={[noAvatarTestimonial]} />
      );

      expect(html).toContain("DS");
      expect(html).toContain("David Sterling");
    });

    it("renders single testimonial without navigation arrows or indicators", () => {
      const singleItem: Testimonial[] = [mockTestimonials[0]];
      const html = renderToStaticMarkup(
        <TestimonialCarousel testimonials={singleItem} />
      );

      expect(html).toContain(mockTestimonials[0].clientName.replace(/&/g, "&amp;"));
      expect(html).not.toContain('aria-label="Pause testimonial rotation"');
      expect(html).not.toContain('aria-label="Previous testimonial"');
      expect(html).not.toContain('aria-label="Next testimonial"');
      expect(html).not.toContain('role="tablist"');
    });

    it("renders empty string/null gracefully for empty testimonial dataset", () => {
      const html = renderToStaticMarkup(
        <TestimonialCarousel testimonials={[]} />
      );

      expect(html).toBe("");
    });
  });

  describe("AboutCta Component (AC-10)", () => {
    it("renders showroom address, consultation button linking to /contact, and phone call button", () => {
      const html = renderToStaticMarkup(
        <AboutCta contact={mockCompanyInfo.contact} />
      );

      expect(html).toContain("Showroom Suite");
      expect(html).toContain(mockCompanyInfo.contact.showroomAddress);
      expect(html).toContain(mockCompanyInfo.contact.operatingHours);
      expect(html).toContain('href="/contact"');
      expect(html).toContain("Request Consultation");
      expect(html).toContain(
        `href="tel:${mockCompanyInfo.contact.phone.replace(/\s+/g, "")}"`
      );
    });
  });
});
