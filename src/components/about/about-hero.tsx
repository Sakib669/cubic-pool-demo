import React from "react";
import Image from "next/image";
import { Container, Section, Badge } from "@/components/ui";
import type { CompanyInfo } from "@/types";

export interface AboutHeroProps {
  companyInfo: CompanyInfo;
}

export function AboutHero({ companyInfo }: AboutHeroProps) {
  return (
    <Section className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge variant="outline" className="px-3.5 py-1 text-xs uppercase tracking-widest font-semibold border-cyan-800 text-cyan-400 bg-cyan-950/40">
                Established {companyInfo.heritageYear}
              </Badge>
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                {companyInfo.name}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Pioneering Architectural Waterscapes Since {companyInfo.heritageYear}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
              Two decades of master craftsmanship, structural engineering, and sculptural pool design across Australia.
            </p>

            <div className="space-y-4 text-slate-400 text-base leading-relaxed pt-2">
              <p>
                Founded in Sydney in {companyInfo.heritageYear}, {companyInfo.name} was born from a desire to bridge the divide between residential architecture and hydraulic engineering. Rather than treating a swimming pool as a backyard accessory, our founders approached each basin as a foundational piece of site architecture.
              </p>
              <p>
                From cantilevered vanishing edges clinging to coastal cliffs in the Whitsundays to minimalist sunken pavilions in Toorak, every installation is engineered to endure for generations with millimeter precision.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1920&q=85"
                alt="Architectural infinity pool overlooking coastal horizon"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md bg-slate-950/60 border border-slate-700/50">
                <p className="text-sm font-semibold text-white">Engineering Precision</p>
                <p className="text-xs text-slate-300 mt-1">Bespoke hydraulic concrete basins crafted to outlast generations</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
