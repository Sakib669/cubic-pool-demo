import React from "react";
import { Compass, ShieldCheck, Droplets, HeartHandshake } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui";

export interface AboutValuesProps {
  className?: string;
}

export function AboutValues({ className }: AboutValuesProps) {
  const values = [
    {
      title: "Architectural Integrity",
      icon: Compass,
      description:
        "Every line, weir edge, and coping rebate is drafted in coordination with project architects to align with the primary residence geometry.",
    },
    {
      title: "Engineering Rigor",
      icon: ShieldCheck,
      description:
        "From geotechnical soil anchoring to reinforced concrete basin pours, our structures exceed national engineering specifications.",
    },
    {
      title: "Sustainable Water Systems",
      icon: Droplets,
      description:
        "Magnesium mineral sanitization, variable frequency pumps, and thermodynamic covers minimize environmental footprint while delivering silk smooth water.",
    },
    {
      title: "Concierge Client Care",
      icon: HeartHandshake,
      description:
        "From initial council approvals to lifetime hydraulic servicing, a dedicated project director guides every commissioning phase.",
    },
  ];

  return (
    <Section className={className || "py-16 md:py-24"}>
      <Container>
        <SectionHeading
          eyebrow="Brand Philosophy"
          title="The Four Pillars of Cubic Craftsmanship"
          subtitle="Every pool we construct represents an uncompromised synthesis of architectural vision and hydraulic performance."
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-colors flex flex-col group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {val.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
