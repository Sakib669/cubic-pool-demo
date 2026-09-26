import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import {
  ContactInfo,
  ShowroomMapCard,
  EnquiryForm,
} from "@/components/contact";
import { POST } from "@/app/api/contact/route";
import { mockCompanyInfo, mockProducts } from "@/lib/data/mock";

describe("Contact & Enquiry Pipeline (Spec 0007)", () => {
  describe("ContactInfo Component (AC-2)", () => {
    it("renders telephone, email, showroom address, and operating schedule", () => {
      const html = renderToStaticMarkup(
        <ContactInfo
          contact={mockCompanyInfo.contact}
          socialLinks={mockCompanyInfo.socialLinks}
        />
      );

      expect(html).toContain("Direct Channels");
      expect(html).toContain(mockCompanyInfo.contact.phone);
      expect(html).toContain(mockCompanyInfo.contact.email);
      expect(html).toContain(mockCompanyInfo.contact.showroomAddress);
      expect(html).toContain(mockCompanyInfo.contact.operatingHours);
      expect(html).toContain(
        `href="tel:${mockCompanyInfo.contact.phone.replace(/\s+/g, "")}"`
      );
      expect(html).toContain(`href="mailto:${mockCompanyInfo.contact.email}"`);
    });
  });

  describe("ShowroomMapCard Component (AC-3)", () => {
    it("renders coordinates, address details, and directions link to Google Maps", () => {
      const html = renderToStaticMarkup(
        <ShowroomMapCard
          showroomAddress={mockCompanyInfo.contact.showroomAddress}
        />
      );

      expect(html).toContain("Double Bay Harbor Precinct");
      expect(html).toContain("33.876° S, 151.242° E");
      expect(html).toContain(mockCompanyInfo.contact.showroomAddress);
      expect(html).toContain("Open Directions in Google Maps");
      expect(html).toContain("https://www.google.com/maps/search/?api=1&amp;query=");
    });
  });

  describe("EnquiryForm Component (AC-4, AC-5, AC-11)", () => {
    it("renders form inputs with accessible labels and options", () => {
      const html = renderToStaticMarkup(
        <EnquiryForm products={mockProducts} />
      );

      expect(html).toContain("Begin Your Architectural Consultation");
      expect(html).toContain('id="fullName"');
      expect(html).toContain('id="email"');
      expect(html).toContain('id="phone"');
      expect(html).toContain('name="preferredContactMethod"');
      expect(html).toContain('id="projectType"');
      expect(html).toContain('id="interestedProductId"');
      expect(html).toContain('id="estimatedBudget"');
      expect(html).toContain('id="message"');
      expect(html).toContain("Submit Architectural Brief");

      // Verify product options are listed in select
      mockProducts.forEach((p) => {
        expect(html).toContain(p.name);
      });
    });

    it("prefills selected pool model when initialProductSlug is provided", () => {
      const selectedProduct = mockProducts[0];
      const html = renderToStaticMarkup(
        <EnquiryForm
          products={mockProducts}
          initialProductSlug={selectedProduct.slug}
        />
      );

      expect(html).toContain("Prefilled with your selected model:");
      expect(html).toContain(selectedProduct.name);
      expect(html).toContain(selectedProduct.tagline);
    });
  });

  describe("POST /api/contact API Route (AC-7)", () => {
    it("accepts valid enquiry payload and returns 201 with enquiry id", async () => {
      const validPayload = {
        fullName: "Julian Sterling",
        email: "julian@sterlingestates.com",
        phone: "+61 400 999 888",
        preferredContactMethod: "email",
        projectType: "New Build",
        estimatedBudget: "$250k+",
        message: "Requesting a site survey for an infinity pool in Double Bay.",
      };

      const request = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload),
      });

      const response = await POST(request);
      expect(response.status).toBe(201);

      const json = await response.json();
      expect(json.success).toBe(true);
      expect(json.id).toBeDefined();
    });

    it("rejects invalid payload with 400 and returns validation field errors", async () => {
      const invalidPayload = {
        fullName: "J", // too short
        email: "not-an-email",
        phone: "", // required
        message: "Hi", // too short
      };

      const request = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invalidPayload),
      });

      const response = await POST(request);
      expect(response.status).toBe(400);

      const json = await response.json();
      expect(json.success).toBe(false);
      expect(json.fieldErrors).toBeDefined();
      expect(json.fieldErrors.fullName).toBeDefined();
      expect(json.fieldErrors.email).toBeDefined();
    });

    it("silently accepts bot spam submission with honeypot field populated", async () => {
      const spamPayload = {
        fullName: "Spam Bot",
        email: "bot@spam.com",
        phone: "1234567890",
        message: "Buy cheap crypto",
        botField: "I am a malicious bot",
      };

      const request = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spamPayload),
      });

      const response = await POST(request);
      expect(response.status).toBe(200);

      const json = await response.json();
      expect(json.success).toBe(true);
      expect(json.id).toBe("enq-verified-spam-filtered");
    });
  });
});
