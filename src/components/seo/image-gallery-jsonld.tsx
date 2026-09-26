import React from "react";
import type { GalleryProject } from "@/types";

export interface ImageGalleryJsonLdProps {
  projects: GalleryProject[];
}

export function ImageGalleryJsonLd({ projects }: ImageGalleryJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Cubic Pools Architectural Project Showcase",
    description: "Photography of luxury swimming pool and spa installations across Australia.",
    image: projects.flatMap((p) =>
      p.images.map((img) => ({
        "@type": "ImageObject",
        name: `${p.title} (${p.location})`,
        caption: img.alt || p.title,
        contentUrl: img.url,
      }))
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
