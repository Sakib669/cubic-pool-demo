import React from "react";
import { Award, Building, Landmark, ShieldCheck } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui";

export interface AboutPartnersProps {
  className?: string;
}

export function AboutPartners({ className }: AboutPartnersProps) {
  const partners = [
    {
      name: "SPASA Master Pool Builder",
      affiliation: "Gold Member & Certified Master Builder",
      icon: Award,
      detail:
        "Adhering to rigorous hydraulic standards, consumer warranty guarantees, and peer reviewed technical execution.",
    },
    {
      name: "Master Builders Australia",
      affiliation: "Registered Commercial & Residential",
      icon: Building,
      detail:
        "Full structural compliance and site management safety accreditations across all Australian states and territories.",
    },
    {
      name: "Australian Institute of Architects",
      affiliation: "Corporate Practice Partner",
      icon: Landmark,
      detail:
        "Continuous collaboration with premier residential architecture studios, delivering seamless pool integration.",
    },
    {
      name: "Hydraulic Engineering Council",
      affiliation: "Excellence Fellow",
      icon: ShieldCheck,
      detail:
        "Pioneering whisper quiet manifold layouts, variable flow hydraulics, and energy neutral thermal cycling.",
    },
  ];

  return (
    <Section className={className || "py-16 md:py-24 border-t border-slate-800 bg-slate-950/70"}>
      <Container>
        <SectionHeading
          eyebrow="Industry Credentials"
          title="Accredited Partnerships and Standards"
          subtitle="We partner closely with leading architectural practices, structural engineering consultancies, and national building associations."
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner) => {
            const Icon = partner.icon;
            return (
              <div
                key={partner.name}
                className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-center text-cyan-400 mb-4">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {partner.name}
                  </h3>
                  <p className="text-xs font-medium text-cyan-400 mt-1">
                    {partner.affiliation}
                  </p>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                    {partner.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
