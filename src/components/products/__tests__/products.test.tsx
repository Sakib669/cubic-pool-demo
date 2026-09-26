import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import {
  CategoryFilter,
  ProductCard,
  ProductGallery,
  ProductSpecsTable,
  ProductDetailModal,
  ProductCatalog,
} from "@/components/products";
import { mockProducts, mockCategories } from "@/lib/data/mock";

describe("Products Catalog & Detail Modal (Spec 0004)", () => {
  const sampleProduct = mockProducts[0]; // Azure Horizon Infinity
  const sampleSingleImageProduct = mockProducts[5]; // Solstice Courtyard Plunge (1 image)

  describe("CategoryFilter Component (AC-2, AC-3)", () => {
    it("renders All Pools tab and each category with accessible markup", () => {
      const html = renderToStaticMarkup(
        <CategoryFilter
          categories={mockCategories}
          activeCategory={null}
          onSelectCategory={() => {}}
        />
      );

      expect(html).toContain("All Pools");
      expect(html).toContain('aria-pressed="true"');
      expect(html).toContain('aria-label="Pool category filters"');

      mockCategories.forEach((cat) => {
        // Handle HTML entity encoding of ampersand in static markup
        expect(html).toContain(cat.name.replace(/&/g, "&amp;"));
      });
    });

    it("marks the selected category as aria-pressed=true and sets data-category-slug", () => {
      const html = renderToStaticMarkup(
        <CategoryFilter
          categories={mockCategories}
          activeCategory="infinity-pools"
          onSelectCategory={() => {}}
        />
      );

      expect(html).toContain('data-category-slug="infinity-pools"');
      expect(html).toContain('data-category-slug="all"');
      expect(html).toContain('aria-pressed="true"');
      // All Pools should not be pressed
      expect(html).toContain('aria-pressed="false" class="min-h-[44px] min-w-[44px] px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 focus-visible:ring-offset-2 bg-travertine-100 text-slate-700 hover:bg-travertine-200 border border-travertine-300">All Pools');
    });
  });

  describe("ProductCard Component (AC-5, AC-6, AC-12)", () => {
    it("renders product cover image, category name, dimensions, volume, and price tier", () => {
      const html = renderToStaticMarkup(
        <ProductCard
          product={sampleProduct}
          categoryName="Infinity Edge Pools"
          onOpenModal={() => {}}
        />
      );

      expect(html).toContain(sampleProduct.name);
      expect(html).toContain(sampleProduct.tagline);
      expect(html).toContain("Infinity Edge Pools");
      expect(html).toContain(sampleProduct.priceTier);
      expect(html).toContain(`${sampleProduct.dimensions.lengthMeters}m × ${sampleProduct.dimensions.widthMeters}m × ${sampleProduct.dimensions.depthMeters}m`);
      expect(html).toContain(`${sampleProduct.waterVolumeLiters.toLocaleString()} L`);
    });

    it("renders accessible crawler link pointing to /products/[slug] for SEO discoverability (AC-12)", () => {
      const html = renderToStaticMarkup(
        <ProductCard
          product={sampleProduct}
          categoryName="Infinity Edge Pools"
          onOpenModal={() => {}}
        />
      );

      expect(html).toContain(`href="/products/${sampleProduct.slug}"`);
      expect(html).toContain("View Specifications");
    });
  });

  describe("ProductGallery Component (AC-9)", () => {
    it("renders main preview and thumbnail strip when multiple images exist", () => {
      const html = renderToStaticMarkup(
        <ProductGallery
          images={sampleProduct.images}
          productName={sampleProduct.name}
        />
      );

      expect(html).toContain('alt="Azure Horizon luxury infinity pool overlooking ocean sunset"');
      expect(html).toContain('role="tablist"');
      expect(html).toContain('aria-label="Product photography gallery thumbnails"');
      expect(html).toContain("Click to Expand Zoom");
    });

    it("hides thumbnail strip when product has only 1 image", () => {
      const html = renderToStaticMarkup(
        <ProductGallery
          images={sampleSingleImageProduct.images}
          productName={sampleSingleImageProduct.name}
        />
      );

      expect(html).toContain(sampleSingleImageProduct.images[0].alt);
      expect(html).not.toContain('role="tablist"');
    });

    it("handles empty image array gracefully", () => {
      const html = renderToStaticMarkup(
        <ProductGallery images={[]} productName="Test Pool" />
      );

      expect(html).toContain("No photography available");
    });
  });

  describe("ProductSpecsTable Component (AC-10, AC-11)", () => {
    it("renders full description, high contrast specs table, warranty, and features checklist", () => {
      const html = renderToStaticMarkup(
        <ProductSpecsTable product={sampleProduct} />
      );

      expect(html).toContain(sampleProduct.description);
      expect(html).toContain("Exterior Length");
      expect(html).toContain(`${sampleProduct.dimensions.lengthMeters} meters`);
      expect(html).toContain("Exterior Width");
      expect(html).toContain(`${sampleProduct.dimensions.widthMeters} meters`);
      expect(html).toContain("Water Depth");
      expect(html).toContain(`${sampleProduct.dimensions.depthMeters} meters`);
      expect(html).toContain("Water Volume");
      expect(html).toContain(`${sampleProduct.waterVolumeLiters.toLocaleString()} Liters`);
      expect(html).toContain("Shell Material");
      expect(html).toContain(sampleProduct.shellMaterial);
      expect(html).toContain(`${sampleProduct.warrantyYears} Years Monolithic Integrity`);

      // Features
      sampleProduct.features.forEach((feature) => {
        expect(html).toContain(feature);
      });
    });

    it("renders prominent enquiry CTA linking to /contact?product=slug (AC-11)", () => {
      const html = renderToStaticMarkup(
        <ProductSpecsTable product={sampleProduct} />
      );

      expect(html).toContain(`href="/contact?product=${sampleProduct.slug}"`);
      expect(html).toContain("Enquire About This Pool");
    });
  });

  describe("ProductDetailModal Component (AC-6, AC-8)", () => {
    it("renders modal structure with focus trap elements and close button when open", () => {
      const html = renderToStaticMarkup(
        <ProductDetailModal
          product={sampleProduct}
          category={mockCategories[0]}
          isOpen={true}
          onClose={() => {}}
        />
      );

      expect(html).toContain('role="dialog"');
      expect(html).toContain('aria-modal="true"');
      expect(html).toContain('id="product-modal-title"');
      expect(html).toContain(sampleProduct.name);
      expect(html).toContain(sampleProduct.tagline);
      expect(html).toContain("Close product details modal");
      expect(html).toContain(mockCategories[0].name);
    });

    it("renders null when product is null or isOpen is false", () => {
      const nullProductHtml = renderToStaticMarkup(
        <ProductDetailModal
          product={null}
          category={mockCategories[0]}
          isOpen={true}
          onClose={() => {}}
        />
      );
      expect(nullProductHtml).toBe("");

      const closedHtml = renderToStaticMarkup(
        <ProductDetailModal
          product={sampleProduct}
          category={mockCategories[0]}
          isOpen={false}
          onClose={() => {}}
        />
      );
      expect(closedHtml).toBe("");
    });
  });

  describe("ProductCatalog Container (AC-1, AC-3, AC-4, AC-7)", () => {
    it("renders all initial products and category filter tabs", () => {
      const html = renderToStaticMarkup(
        <ProductCatalog
          initialProducts={mockProducts}
          categories={mockCategories}
        />
      );

      expect(html).toContain("All Pools");
      expect(html).toContain(`Showing ${mockProducts.length} of ${mockProducts.length} models`);
      mockProducts.forEach((p) => {
        expect(html).toContain(p.name);
      });
    });

    it("renders friendly empty state with reset button when no products match filter", () => {
      const html = renderToStaticMarkup(
        <ProductCatalog
          initialProducts={[]}
          categories={mockCategories}
        />
      );

      expect(html).toContain("No Pool Models In This Category");
      expect(html).toContain("Reset to All Pools");
    });

    it("pre opens detail modal when initialProductSlug is provided (AC-7)", () => {
      const html = renderToStaticMarkup(
        <ProductCatalog
          initialProducts={mockProducts}
          categories={mockCategories}
          initialProductSlug="azure-horizon-infinity"
        />
      );

      expect(html).toContain("Azure Horizon Infinity");
      expect(html).toContain("Close product details modal");
    });
  });

  describe("Catalog Page Surface (AC-1, AC-7)", () => {
    it("renders server products page with hero and product grid", async () => {
      const { default: ProductsPage } = await import("@/app/products/page");
      const html = renderToStaticMarkup(
        await ProductsPage({
          searchParams: Promise.resolve({}),
        })
      );

      expect(html).toContain("Signature Swimming Pool Models");
      expect(html).toContain("All Pools");
      expect(html).toContain("Azure Horizon Infinity");
      expect(html).toContain("Monolith Cantilever");
    });

    it("renders server products page with direct product modal pre-opened via searchParams (AC-7)", async () => {
      const { default: ProductsPage } = await import("@/app/products/page");
      const html = renderToStaticMarkup(
        await ProductsPage({
          searchParams: Promise.resolve({
            product: "monolith-cantilever",
          }),
        })
      );

      expect(html).toContain("Monolith Cantilever");
      expect(html).toContain("Close product details modal");
    });
  });

  describe("Dedicated Product Detail Route Surface (AC-12)", () => {
    it("renders dedicated page at /products/[slug] with breadcrumbs, gallery, and specs table", async () => {
      const { default: ProductDetailPage, generateMetadata } = await import(
        "@/app/products/[slug]/page"
      );

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: "azure-horizon-infinity" }),
      });
      expect(metadata.title).toContain("Azure Horizon Infinity");

      const html = renderToStaticMarkup(
        await ProductDetailPage({
          params: Promise.resolve({ slug: "azure-horizon-infinity" }),
        })
      );

      expect(html).toContain("Pool Catalog");
      expect(html).toContain("Back to Pool Collection");
      expect(html).toContain("Azure Horizon Infinity");
      expect(html).toContain("Exterior Length");
      expect(html).toContain("Enquire About This Pool");
    });
  });
});
