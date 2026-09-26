import type {
  Category,
  Product,
  GalleryProject,
  Testimonial,
  CompanyInfo,
  CreateContactEnquiryInput,
} from "@/types";

export interface ProductFilter {
  categoryId?: string;
  categorySlug?: string;
  search?: string;
  featured?: boolean;
}

export interface GalleryFilter {
  style?: string;
  relatedProductId?: string;
}

export interface ICmsAdapter {
  getProducts(filter?: ProductFilter): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  getGalleryProjects(filter?: GalleryFilter): Promise<GalleryProject[]>;
  getProjectBySlug(slug: string): Promise<GalleryProject | null>;
  getTestimonials(): Promise<Testimonial[]>;
  getCompanyInfo(): Promise<CompanyInfo>;
  submitContactEnquiry(
    enquiry: CreateContactEnquiryInput
  ): Promise<{ success: boolean; id: string }>;
}
