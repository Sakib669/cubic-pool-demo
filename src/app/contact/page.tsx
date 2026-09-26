import type { Metadata } from "next";
import { getCmsAdapter } from "@/lib/data";
import { Container } from "@/components/ui";
import {
  ContactInfo,
  ShowroomMapCard,
  EnquiryForm,
} from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact & Concierge | Cubic Pools Group",
  description:
    "Connect with our principal pool engineers and landscape architects. Visit our Double Bay showroom or request a private estate consultation.",
  openGraph: {
    title: "Contact & Concierge | Cubic Pools Group",
    description:
      "Book an architectural pool consultation or visit our Double Bay showroom.",
  },
};

interface ContactPageProps {
  searchParams: Promise<{
    product?: string;
  }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = await searchParams;
  const initialProductSlug = resolvedSearchParams?.product;

  const adapter = getCmsAdapter();
  const [companyInfo, products] = await Promise.all([
    adapter.getCompanyInfo(),
    adapter.getProducts(),
  ]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 md:pt-36 md:pb-28">
      <Container>
        <div className="max-w-3xl mb-12">
          <p className="text-xs uppercase tracking-widest font-semibold text-cyan-400 mb-2">
            Private Client Advisory
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Contact & Consultation
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-light mt-3 leading-relaxed">
            Whether embarking on an estate master plan, residential renovation, or commercial wellness facility, our directors provide confidential guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Office Channels & Showroom Map Card */}
          <div className="lg:col-span-5 space-y-10">
            <ContactInfo
              contact={companyInfo.contact}
              socialLinks={companyInfo.socialLinks}
            />
            <ShowroomMapCard showroomAddress={companyInfo.contact.showroomAddress} />
          </div>

          {/* Right Column: Architectural Enquiry Form */}
          <div className="lg:col-span-7">
            <EnquiryForm
              products={products}
              initialProductSlug={initialProductSlug}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}
