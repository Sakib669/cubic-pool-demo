import type { ICmsAdapter, ProductFilter, GalleryFilter } from "./adapter";
import type {
  Category,
  Product,
  GalleryProject,
  Testimonial,
  CompanyInfo,
  CreateContactEnquiryInput,
} from "@/types";
import { CreateContactEnquirySchema } from "@/types";
import {
  mockCategories,
  mockProducts,
  mockGalleryProjects,
  mockTestimonials,
  mockCompanyInfo,
} from "./mock";

export class LocalMockCmsAdapter implements ICmsAdapter {
  private categories: Category[] = [...mockCategories];
  private products: Product[] = [...mockProducts];
  private galleryProjects: GalleryProject[] = [...mockGalleryProjects];
  private testimonials: Testimonial[] = [...mockTestimonials];
  private companyInfo: CompanyInfo = { ...mockCompanyInfo };

  async getProducts(filter?: ProductFilter): Promise<Product[]> {
    let result = [...this.products];

    if (!filter) {
      return result;
    }

    if (filter.featured !== undefined) {
      result = result.filter((p) => p.isFeatured === filter.featured);
    }

    if (filter.categorySlug) {
      const category = this.categories.find(
        (c) => c.slug.toLowerCase() === filter.categorySlug?.toLowerCase()
      );
      if (!category) {
        return [];
      }
      result = result.filter((p) => p.categoryId === category.id);
    } else if (filter.categoryId) {
      result = result.filter((p) => p.categoryId === filter.categoryId);
    }

    if (filter.search && filter.search.trim().length > 0) {
      const q = filter.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return result;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const cleanSlug = slug.toLowerCase().trim();
    const product = this.products.find((p) => p.slug.toLowerCase() === cleanSlug);
    return product ?? null;
  }

  async getCategories(): Promise<Category[]> {
    return [...this.categories];
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const cleanSlug = slug.toLowerCase().trim();
    const category = this.categories.find((c) => c.slug.toLowerCase() === cleanSlug);
    return category ?? null;
  }

  async getGalleryProjects(filter?: GalleryFilter): Promise<GalleryProject[]> {
    let result = [...this.galleryProjects];

    if (!filter) {
      return result;
    }

    if (filter.style) {
      const styleLower = filter.style.toLowerCase().trim();
      result = result.filter((proj) => proj.style.toLowerCase() === styleLower);
    }

    if (filter.relatedProductId) {
      result = result.filter((proj) => proj.relatedProductId === filter.relatedProductId);
    }

    return result;
  }

  async getProjectBySlug(slug: string): Promise<GalleryProject | null> {
    const cleanSlug = slug.toLowerCase().trim();
    const project = this.galleryProjects.find((p) => p.slug.toLowerCase() === cleanSlug);
    return project ?? null;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return [...this.testimonials];
  }

  async getCompanyInfo(): Promise<CompanyInfo> {
    return { ...this.companyInfo };
  }

  async submitContactEnquiry(
    enquiry: CreateContactEnquiryInput
  ): Promise<{ success: boolean; id: string }> {
    // Validate payload with Zod schema
    const parsed = CreateContactEnquirySchema.parse(enquiry);
    const generatedId = `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    
    // In local mock mode, we log and return success
    if (process.env.NODE_ENV !== "production") {
      console.log("[LocalMockCmsAdapter] Received validated enquiry:", {
        id: generatedId,
        name: parsed.fullName,
        email: parsed.email,
        projectType: parsed.projectType,
        budget: parsed.estimatedBudget,
      });
    }

    return {
      success: true,
      id: generatedId,
    };
  }
}
