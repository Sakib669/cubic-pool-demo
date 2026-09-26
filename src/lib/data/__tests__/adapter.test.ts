import { describe, it, expect } from "vitest";
import { getCmsAdapter, LocalMockCmsAdapter } from "../index";
import {
  ProductSchema,
  CategorySchema,
  GalleryProjectSchema,
  TestimonialSchema,
  CompanyInfoSchema,
  CreateContactEnquirySchema,
} from "@/types";

describe("Data Model & CMS Adapter", () => {
  const adapter = getCmsAdapter();

  describe("Schema Validation (AC-1 to AC-6)", () => {
    it("validates all categories conform to CategorySchema (AC-1)", async () => {
      const categories = await adapter.getCategories();
      expect(categories.length).toBeGreaterThan(0);
      categories.forEach((cat) => {
        expect(() => CategorySchema.parse(cat)).not.toThrow();
        expect(cat.slug).toMatch(/^[a-z0-9-]+$/);
      });
    });

    it("validates all products conform to ProductSchema (AC-2)", async () => {
      const products = await adapter.getProducts();
      expect(products.length).toBeGreaterThan(0);
      products.forEach((prod) => {
        expect(() => ProductSchema.parse(prod)).not.toThrow();
        expect(prod.dimensions.lengthMeters).toBeGreaterThan(0);
        expect(prod.images.length).toBeGreaterThan(0);
        expect(prod.images[0].url).toBeTruthy();
        expect(prod.images[0].alt).toBeTruthy();
      });
    });

    it("validates all gallery projects conform to GalleryProjectSchema (AC-3)", async () => {
      const projects = await adapter.getGalleryProjects();
      expect(projects.length).toBeGreaterThan(0);
      projects.forEach((proj) => {
        expect(() => GalleryProjectSchema.parse(proj)).not.toThrow();
        expect(proj.coverImage.url).toBeTruthy();
      });
    });

    it("validates all testimonials conform to TestimonialSchema (AC-4)", async () => {
      const testimonials = await adapter.getTestimonials();
      expect(testimonials.length).toBeGreaterThan(0);
      testimonials.forEach((test) => {
        expect(() => TestimonialSchema.parse(test)).not.toThrow();
        expect(test.rating).toBeGreaterThanOrEqual(1);
        expect(test.rating).toBeLessThanOrEqual(5);
      });
    });

    it("validates company information conforms to CompanyInfoSchema (AC-5)", async () => {
      const company = await adapter.getCompanyInfo();
      expect(() => CompanyInfoSchema.parse(company)).not.toThrow();
      expect(company.heritageYear).toBe(2004);
      expect(company.stats.projectsCompleted).toBeGreaterThan(0);
    });

    it("validates contact enquiry schema accepts valid input and rejects invalid data (AC-6)", () => {
      const validPayload = {
        fullName: "Victoria Sterling",
        email: "victoria@example.com",
        phone: "+61 400 123 456",
        preferredContactMethod: "email" as const,
        projectType: "New Build" as const,
        interestedProductId: "prod-azure-horizon",
        estimatedBudget: "$100k to $250k" as const,
        message: "We are building a cliffside home and want an infinity edge pool quotation.",
      };

      expect(() => CreateContactEnquirySchema.parse(validPayload)).not.toThrow();

      const invalidEmailPayload = {
        ...validPayload,
        email: "not-an-email",
      };
      expect(() => CreateContactEnquirySchema.parse(invalidEmailPayload)).toThrow();

      const shortMessagePayload = {
        ...validPayload,
        message: "Short",
      };
      expect(() => CreateContactEnquirySchema.parse(shortMessagePayload)).toThrow();
    });
  });

  describe("Adapter Query Operations (AC-7, AC-8, AC-10)", () => {
    it("retrieves all products when no filter is provided", async () => {
      const products = await adapter.getProducts();
      expect(products.length).toBe(6);
    });

    it("filters products by category slug (AC-10)", async () => {
      const infinityPools = await adapter.getProducts({ categorySlug: "infinity-pools" });
      expect(infinityPools.length).toBe(1);
      expect(infinityPools[0].slug).toBe("azure-horizon-infinity");
    });

    it("filters products by categoryId (AC-10)", async () => {
      const geometricPools = await adapter.getProducts({ categoryId: "cat-geometric" });
      expect(geometricPools.length).toBe(2);
    });

    it("filters products by text search (AC-10)", async () => {
      const searchResults = await adapter.getProducts({ search: "cantilever" });
      expect(searchResults.length).toBe(1);
      expect(searchResults[0].slug).toBe("monolith-cantilever");
    });

    it("filters products by featured flag", async () => {
      const featured = await adapter.getProducts({ featured: true });
      expect(featured.length).toBe(3);
      featured.forEach((p) => expect(p.isFeatured).toBe(true));
    });

    it("retrieves product by slug", async () => {
      const product = await adapter.getProductBySlug("azure-horizon-infinity");
      expect(product).not.toBeNull();
      expect(product?.name).toBe("Azure Horizon Infinity");
    });

    it("returns null for non-existent product slug (AC-8)", async () => {
      const product = await adapter.getProductBySlug("non-existent-pool-slug");
      expect(product).toBeNull();
    });

    it("retrieves category by slug and returns null for unknown slug (AC-8)", async () => {
      const category = await adapter.getCategoryBySlug("infinity-pools");
      expect(category).not.toBeNull();
      expect(category?.name).toBe("Infinity Edge Pools");

      const unknown = await adapter.getCategoryBySlug("unknown-category");
      expect(unknown).toBeNull();
    });

    it("filters gallery projects by style", async () => {
      const infinityProjects = await adapter.getGalleryProjects({ style: "Infinity" });
      expect(infinityProjects.length).toBe(1);
      expect(infinityProjects[0].slug).toBe("the-whitsunday-cliff-residence");
    });

    it("filters gallery projects by related product id", async () => {
      const related = await adapter.getGalleryProjects({ relatedProductId: "prod-azure-horizon" });
      expect(related.length).toBe(1);
      expect(related[0].title).toBe("The Whitsunday Cliff Residence");
    });

    it("returns null for non-existent gallery project slug (AC-8)", async () => {
      const project = await adapter.getProjectBySlug("non-existent-project");
      expect(project).toBeNull();
    });

    it("submits contact enquiry and returns generated id (AC-7)", async () => {
      const result = await adapter.submitContactEnquiry({
        fullName: "Alexander Wright",
        email: "alexander@wright-architecture.com",
        phone: "+61 411 999 888",
        preferredContactMethod: "phone",
        projectType: "Commercial",
        interestedProductId: "prod-monolith-cantilever",
        estimatedBudget: "$250k+",
        message: "Inquiring regarding commercial resort pool specification and engineering documentation.",
      });

      expect(result.success).toBe(true);
      expect(result.id).toMatch(/^enq-/);
    });

    it("handles case-insensitivity and whitespace trimming for all slug lookups (AC-8)", async () => {
      const product = await adapter.getProductBySlug("  AZURE-HORIZON-INFINITY  ");
      expect(product).not.toBeNull();
      expect(product?.id).toBe("prod-azure-horizon");

      const category = await adapter.getCategoryBySlug("  INFINITY-POOLS  ");
      expect(category).not.toBeNull();
      expect(category?.id).toBe("cat-infinity");

      const project = await adapter.getProjectBySlug("  THE-WHITSUNDAY-CLIFF-RESIDENCE  ");
      expect(project).not.toBeNull();
      expect(project?.id).toBe("proj-whitsunday-cliff");
    });

    it("handles empty or whitespace search queries gracefully by returning all products (AC-10)", async () => {
      const allProducts = await adapter.getProducts();
      const whitespaceResults = await adapter.getProducts({ search: "   " });
      expect(whitespaceResults.length).toBe(allProducts.length);
    });

    it("returns empty array when filtering by unknown category slug or search query with no match (AC-10)", async () => {
      const unknownCategory = await adapter.getProducts({ categorySlug: "unknown-category-slug" });
      expect(unknownCategory).toEqual([]);

      const noMatchSearch = await adapter.getProducts({ search: "xyz-no-such-pool-ever" });
      expect(noMatchSearch).toEqual([]);
    });

    it("filters gallery projects case-insensitively and returns empty array on unknown style", async () => {
      const lowercaseStyle = await adapter.getGalleryProjects({ style: "infinity" });
      expect(lowercaseStyle.length).toBe(1);

      const unknownStyle = await adapter.getGalleryProjects({ style: "non-existent-style" });
      expect(unknownStyle).toEqual([]);
    });
  });

  describe("Singleton & Provider Factory (AC-11)", () => {
    it("returns a singleton LocalMockCmsAdapter instance", () => {
      const instance1 = getCmsAdapter();
      const instance2 = getCmsAdapter();
      expect(instance1).toBe(instance2);
      expect(instance1).toBeInstanceOf(LocalMockCmsAdapter);
    });
  });
});
