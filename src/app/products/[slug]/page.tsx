import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCmsAdapter } from "@/lib/data";
import { ProductGallery, ProductSpecsTable } from "@/components/products";
import { Container, Section, Badge } from "@/components/ui";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCmsAdapter().getProductBySlug(slug);

  if (!product) {
    return {
      title: "Pool Model Not Found | Cubic Pools Group",
    };
  }

  return {
    title: `${product.name} | Cubic Pools Group`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const adapter = getCmsAdapter();

  const [product, categories] = await Promise.all([
    adapter.getProductBySlug(slug),
    adapter.getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  const category = categories.find((c) => c.id === product.categoryId);

  return (
    <div className="flex flex-col min-h-screen bg-travertine-50/40">
      {/* Breadcrumbs Navigation Bar */}
      <div className="border-b border-travertine-200 bg-white py-3.5">
        <Container>
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-600">
            <Link
              href="/"
              className="hover:text-navy-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 rounded-xs"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            <Link
              href="/products"
              className="hover:text-navy-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 rounded-xs"
            >
              Pool Catalog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            <span className="font-medium text-navy-950 truncate max-w-xs" aria-current="page">
              {product.name}
            </span>
          </nav>
        </Container>
      </div>

      {/* Main Product Showcase Section */}
      <Section className="py-8 sm:py-12 flex-1">
        <Container>
          <div className="mb-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-navy-950 transition-colors mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 rounded-xs"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Back to Pool Collection</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <Badge variant="azure">{category?.name || "Luxury Pool"}</Badge>
              <Badge variant="outline" className="font-mono">
                {product.priceTier}
              </Badge>
              {product.isFeatured && (
                <Badge variant="gold">Signature Architecture</Badge>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-navy-950 tracking-tight">
              {product.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl">
              {product.tagline}
            </p>
          </div>

          {/* Two-Column Grid: Gallery and Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 bg-white p-4 sm:p-6 rounded-xl border border-travertine-300 shadow-xs">
              <ProductGallery
                images={product.images}
                productName={product.name}
              />
            </div>

            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-travertine-300 shadow-xs">
              <ProductSpecsTable product={product} />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
