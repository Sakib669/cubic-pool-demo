import React from "react";
import type { Product } from "@/types";

export interface ProductJsonLdProps {
  product: Product;
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => img.url),
    brand: {
      "@type": "Brand",
      name: "Cubic Pools Group",
    },
    category: "Swimming Pools & Spas",
    offers: {
      "@type": "Offer",
      priceCurrency: "AUD",
      price: "Bespoke Quote",
      availability: "https://schema.org/InStock",
      url: `https://cubicpoolsgroup.com/products/${product.slug}`,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Shell Material",
        value: product.shellMaterial,
      },
      {
        "@type": "PropertyValue",
        name: "Water Volume",
        value: `${product.waterVolumeLiters.toLocaleString()} Liters`,
      },
      {
        "@type": "PropertyValue",
        name: "Structural Warranty",
        value: `${product.warrantyYears} Years`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
