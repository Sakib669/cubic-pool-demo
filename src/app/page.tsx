import Link from "next/link";
import { ArrowRight, ShieldCheck, Compass, Award } from "lucide-react";
import { Container, Section, SectionHeading, Button, Badge } from "@/components/ui";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Luxury Hero Banner */}
      <Section
        variant="dark"
        padding="lg"
        className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 border-b border-navy-800"
      >
        <Container className="relative z-10 py-12 md:py-20 text-center flex flex-col items-center">
          <Badge variant="azure" className="mb-6">
            Architectural Swimming Pools & Spas
          </Badge>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-travertine-50 tracking-tight max-w-4xl leading-[1.15]">
            Engineered for <span className="italic text-azure-400">Grand Living</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-travertine-200/80 max-w-2xl leading-relaxed font-sans font-light">
            Bespoke concrete swimming pools, cliffside infinity edges, and resort grade aquatic sanctuaries crafted with unyielding precision across Australia.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link href="/products" className="w-full sm:w-auto">
              <Button variant="gold" size="lg" className="w-full sm:w-auto">
                Explore Collections
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/gallery" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-travertine-300/40 text-travertine-100 hover:bg-navy-800/80 hover:text-white"
              >
                View Project Gallery
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Trust Pillars Section */}
      <Section variant="default" padding="lg">
        <Container>
          <SectionHeading
            eyebrow="The Cubic Standard"
            title="Architectural Excellence in Every Detail"
            subtitle="From initial 3D hydraulic modeling to hand laid glass mosaic finishes, our engineering exceeds standard residential building codes."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-8 rounded-lg bg-travertine-50 border border-travertine-200/80 shadow-sm flex flex-col items-start space-y-4">
              <div className="p-3 rounded bg-azure-100 text-azure-700">
                <Compass className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl text-navy-950">Structural Mastery</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Engineered for challenging terrain including cliffside cantilevers, coastal sand foundations, and rooftop suspended installations.
              </p>
            </div>

            <div className="p-8 rounded-lg bg-travertine-50 border border-travertine-200/80 shadow-sm flex flex-col items-start space-y-4">
              <div className="p-3 rounded bg-gold-500/20 text-gold-600">
                <Award className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl text-navy-950">Bespoke Finishes</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hand selected Italian glass mosaics, honed Turkish travertine copings, and whisper quiet variable speed mineral filtration systems.
              </p>
            </div>

            <div className="p-8 rounded-lg bg-travertine-50 border border-travertine-200/80 shadow-sm flex flex-col items-start space-y-4">
              <div className="p-3 rounded bg-azure-100 text-azure-700">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl text-navy-950">25 Year Warranty</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Complete structural guarantee backed by over two decades of commercial and prestige residential pool construction experience.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Consultation Banner */}
      <Section variant="muted" padding="md">
        <Container className="text-center py-8">
          <SectionHeading
            eyebrow="Private Consultation"
            title="Begin Your Pool Journey"
            subtitle="Speak directly with our design and engineering directors to evaluate your site, contours, and architectural aspirations."
            align="center"
          />
          <div className="mt-6 flex justify-center">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Book Showroom Appointment
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
