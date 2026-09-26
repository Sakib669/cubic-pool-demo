import React from "react";
import type { CompanyInfo } from "@/types";

export interface LocalBusinessJsonLdProps {
  companyInfo: CompanyInfo;
}

export function LocalBusinessJsonLd({ companyInfo }: LocalBusinessJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: companyInfo.name,
    description: companyInfo.tagline,
    url: "https://cubicpoolsgroup.com",
    telephone: companyInfo.contact.phone,
    email: companyInfo.contact.email,
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Suite 4, 120 Ocean View Boulevard",
      addressLocality: "Double Bay",
      addressRegion: "NSW",
      postalCode: "2028",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.876,
      longitude: 151.242,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: Object.values(companyInfo.socialLinks).filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
