import { z } from "zod";

// Shared image schema with explicit dimensions and accessibility alt text
export const ImageObjectSchema = z.object({
  url: z.string().url("Must be a valid URL"),
  alt: z.string().min(1, "Alt text is required for accessibility"),
  width: z.number().int().positive("Width must be a positive integer"),
  height: z.number().int().positive("Height must be a positive integer"),
});

export type ImageObject = z.infer<typeof ImageObjectSchema>;

// Category Schema
export const CategorySchema = z.object({
  id: z.string().min(1, "ID is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;

// Product Dimensions Schema (Metric)
export const ProductDimensionsSchema = z.object({
  lengthMeters: z.number().positive("Length must be greater than zero"),
  widthMeters: z.number().positive("Width must be greater than zero"),
  depthMeters: z.number().positive("Depth must be greater than zero"),
});

export type ProductDimensions = z.infer<typeof ProductDimensionsSchema>;

// Price Tier Union
export const PriceTierSchema = z.enum(["$", "$$", "$$$", "$$$$"]);
export type PriceTier = z.infer<typeof PriceTierSchema>;

// Product Schema
export const ProductSchema = z.object({
  id: z.string().min(1, "ID is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  name: z.string().min(1, "Product name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.string().min(1, "Category ID reference is required"),
  priceTier: PriceTierSchema,
  dimensions: ProductDimensionsSchema,
  waterVolumeLiters: z.number().positive("Water volume must be positive"),
  shellMaterial: z.string().min(1, "Shell material is required"),
  warrantyYears: z.number().int().positive("Warranty years must be a positive integer"),
  features: z.array(z.string().min(1)).min(1, "At least one feature is required"),
  isFeatured: z.boolean().default(false),
  images: z.array(ImageObjectSchema).min(1, "At least one product image is required"),
});

export type Product = z.infer<typeof ProductSchema>;

// Gallery Style Union
export const GalleryStyleSchema = z.enum([
  "Infinity",
  "Modern Geometric",
  "Natural Oasis",
  "Architectural Lap",
  "Indoor Sanctuary",
]);

export type GalleryStyle = z.infer<typeof GalleryStyleSchema>;

// Gallery Project Schema
export const GalleryProjectSchema = z.object({
  id: z.string().min(1, "ID is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  title: z.string().min(1, "Project title is required"),
  style: GalleryStyleSchema,
  location: z.string().min(1, "Location is required"),
  completionYear: z.number().int().min(1990).max(2035),
  description: z.string().min(1, "Description is required"),
  features: z.array(z.string().min(1)).min(1, "At least one feature is required"),
  relatedProductId: z.string().optional(),
  coverImage: ImageObjectSchema,
  images: z.array(ImageObjectSchema).min(1, "At least one gallery image is required"),
});

export type GalleryProject = z.infer<typeof GalleryProjectSchema>;

// Testimonial Schema
export const TestimonialSchema = z.object({
  id: z.string().min(1, "ID is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientRole: z.string().min(1, "Client role is required"),
  location: z.string().min(1, "Location is required"),
  rating: z.number().int().min(1).max(5),
  quote: z.string().min(1, "Quote is required"),
  projectTitle: z.string().min(1, "Project title is required"),
  avatarUrl: z.string().url().optional(),
});

export type Testimonial = z.infer<typeof TestimonialSchema>;

// Company Info Sub-schemas
export const CompanyStatsSchema = z.object({
  projectsCompleted: z.number().int().nonnegative(),
  awardsWon: z.number().int().nonnegative(),
  satisfactionRatePercent: z.number().min(0).max(100),
  masterBuildersCount: z.number().int().nonnegative(),
});

export const CompanyContactSchema = z.object({
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Valid email is required"),
  showroomAddress: z.string().min(1, "Showroom address is required"),
  operatingHours: z.string().min(1, "Operating hours are required"),
});

export const CompanySocialLinksSchema = z.object({
  instagram: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  facebook: z.string().url().optional(),
  pinterest: z.string().url().optional(),
});

// Company Info Schema
export const CompanyInfoSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  heritageYear: z.number().int().min(1900).max(2026),
  stats: CompanyStatsSchema,
  contact: CompanyContactSchema,
  socialLinks: CompanySocialLinksSchema,
});

export type CompanyInfo = z.infer<typeof CompanyInfoSchema>;

// Contact Enquiry Budget Tiers
export const BudgetTierSchema = z.enum([
  "Under $50k",
  "$50k to $100k",
  "$100k to $250k",
  "$250k+",
]);

export type BudgetTier = z.infer<typeof BudgetTierSchema>;

// Project Type Options
export const ProjectTypeSchema = z.enum([
  "New Build",
  "Renovation",
  "Commercial",
  "Maintenance",
]);

export type ProjectType = z.infer<typeof ProjectTypeSchema>;

// Preferred Contact Method
export const ContactMethodSchema = z.enum(["email", "phone"]);
export type ContactMethod = z.infer<typeof ContactMethodSchema>;

// Contact Enquiry Creation Input Schema (Client payload)
export const CreateContactEnquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(7, "Valid phone number is required"),
  preferredContactMethod: ContactMethodSchema.default("email"),
  projectType: ProjectTypeSchema,
  interestedProductId: z.string().optional(),
  estimatedBudget: BudgetTierSchema,
  message: z.string().min(10, "Please provide a message with at least 10 characters"),
});

export type CreateContactEnquiryInput = z.infer<typeof CreateContactEnquirySchema>;

// Stored Contact Enquiry Schema (includes ID and timestamp)
export const ContactEnquirySchema = CreateContactEnquirySchema.extend({
  id: z.string().min(1, "Enquiry ID is required"),
  createdAt: z.string().datetime("Valid ISO timestamp is required"),
});

export type ContactEnquiry = z.infer<typeof ContactEnquirySchema>;
