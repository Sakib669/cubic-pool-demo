import React from "react";
import type { Metadata } from "next";
import { getCmsAdapter } from "@/lib/data";
import { GalleryStyleSchema } from "@/types";
import { GalleryView } from "@/components/gallery";
import { Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Architectural Design Gallery & Portfolio | Cubic Pools Group",
  description:
    "Explore our portfolio of completed luxury swimming pools, cliffside vanishing edges, and natural rock lagoon sanctuaries across Australia.",
};

interface GalleryPageProps {
  searchParams: Promise<{
    style?: string;
    project?: string;
  }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const resolvedSearchParams = await searchParams;
  const adapter = getCmsAdapter();

  const [projects, products] = await Promise.all([
    adapter.getGalleryProjects(),
    adapter.getProducts(),
  ]);

  // Build lightweight product lookup map for related pool model referrals
  const productLookup: Record<string, { slug: string; name: string }> = {};
  products.forEach((p) => {
    productLookup[p.id] = { slug: p.slug, name: p.name };
  });

  const availableStyles = GalleryStyleSchema.options;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Gallery Hero Section */}
      <section className="bg-navy-950 text-travertine-50 py-16 sm:py-20 relative overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-radial-gradient from-azure-950/40 via-transparent to-transparent pointer-events-none" />
        <Container>
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-mono tracking-widest text-gold-400 uppercase mb-3">
              Master Built Installations
            </span>
            <h1
              id="gallery-heading"
              tabIndex={-1}
              className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white mb-4 focus:outline-none"
            >
              Architectural Pool Gallery
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              An authentic showcase of finished luxury residential swimming pools,
              private wellness retreats, and coastal vanishing edges across Australia.
            </p>
          </div>
        </Container>
      </section>

      {/* Gallery Showcase Content */}
      <Section className="py-12 sm:py-16 bg-travertine-50/50 flex-1">
        <Container>
          <GalleryView
            initialProjects={projects}
            styles={availableStyles}
            initialStyle={resolvedSearchParams.style || null}
            initialProjectSlug={resolvedSearchParams.project || null}
            productLookup={productLookup}
          />
        </Container>
      </Section>
    </div>
  );
}
