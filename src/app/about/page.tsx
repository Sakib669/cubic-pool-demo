import type { Metadata } from "next";
import { getCmsAdapter } from "@/lib/data";
import {
  AboutHero,
  AboutStats,
  AboutValues,
  AboutPartners,
  TestimonialCarousel,
  AboutCta,
} from "@/components/about";

export const metadata: Metadata = {
  title: "About Us | Cubic Pools Group",
  description:
    "Discover our heritage, structural engineering precision, and master craftsmanship delivering luxury architectural pools across Australia since 2004.",
  openGraph: {
    title: "About Us | Cubic Pools Group",
    description:
      "Two decades of master craftsmanship and structural engineering delivering luxury architectural pools.",
  },
};

export default async function AboutPage() {
  const adapter = getCmsAdapter();
  const [companyInfo, testimonials] = await Promise.all([
    adapter.getCompanyInfo(),
    adapter.getTestimonials(),
  ]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <AboutHero companyInfo={companyInfo} />
      <AboutStats stats={companyInfo.stats} />
      <AboutValues />
      <AboutPartners />
      <TestimonialCarousel testimonials={testimonials} />
      <AboutCta contact={companyInfo.contact} />
    </main>
  );
}
