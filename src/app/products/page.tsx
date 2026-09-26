import React from "react";
import type { Metadata } from "next";
import { getCmsAdapter } from "@/lib/data";
import { ProductCatalog } from "@/components/products";
import { Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Architectural Pool Collection | Cubic Pools Group",
  description:
    "Explore our engineered collection of bespoke luxury swimming pools, vanishing infinity edges, and private wellness spas across Australia.",
};

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    product?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const adapter = getCmsAdapter();

  const [products, categories] = await Promise.all([
    adapter.getProducts(),
    adapter.getCategories(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Catalog Hero Section */}
      <section className="bg-navy-950 text-travertine-50 py-16 sm:py-20 relative overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-radial-gradient from-azure-950/40 via-transparent to-transparent pointer-events-none" />
        <Container>
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-mono tracking-widest text-gold-400 uppercase mb-3">
              Master Architectural Engineering
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white mb-4">
              Signature Swimming Pool Models
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Engineered with monolithic structural integrity and precision water weirs.
              Filter by design style to evaluate specifications, dimensions, and finishes.
            </p>
          </div>
        </Container>
      </section>

      {/* Interactive Catalog Section */}
      <Section className="py-12 sm:py-16 bg-travertine-50/50 flex-1">
        <Container>
          <ProductCatalog
            initialProducts={products}
            categories={categories}
            initialCategorySlug={resolvedSearchParams.category || null}
            initialProductSlug={resolvedSearchParams.product || null}
          />
        </Container>
      </Section>
    </div>
  );
}
