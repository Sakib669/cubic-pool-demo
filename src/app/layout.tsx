import type { Metadata } from "next";
import "./globals.css";
import { getCmsAdapter } from "@/lib/data";
import { Header, Footer } from "@/components/layout";

export const metadata: Metadata = {
  title: "Cubic Pools Group | Luxury Architectural Swimming Pools",
  description:
    "Bespoke architectural swimming pools engineered for prestige Australian homes. Custom concrete, infinity edge, and resort pool construction.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adapter = getCmsAdapter();
  const [companyInfo, categories] = await Promise.all([
    adapter.getCompanyInfo(),
    adapter.getCategories(),
  ]);

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-travertine-100 text-slate-800 font-sans">
        {/* Accessible skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-azure-500 focus:text-navy-950 focus:font-semibold focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
        >
          Skip to main content
        </a>

        {/* Sticky Header with company details and categories */}
        <Header companyInfo={companyInfo} categories={categories} />

        {/* Main landmark with id and tabIndex for focus transfer */}
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>

        {/* Semantic Footer with company details and categories */}
        <Footer companyInfo={companyInfo} categories={categories} />
      </body>
    </html>
  );
}
