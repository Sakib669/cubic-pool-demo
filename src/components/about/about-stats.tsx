import React from "react";
import { Container, Section } from "@/components/ui";
import type { CompanyInfo } from "@/types";

export interface AboutStatsProps {
  stats: CompanyInfo["stats"];
}

export function AboutStats({ stats }: AboutStatsProps) {
  const statItems = [
    {
      value: `${stats.projectsCompleted}+`,
      label: "Masterpiece Installations",
      description: "Private estates and penthouses delivered across Australia",
    },
    {
      value: `${stats.awardsWon}`,
      label: "National Architecture Awards",
      description: "Accolades from SPASA and Master Builders Australia",
    },
    {
      value: `${stats.satisfactionRatePercent}%`,
      label: "Client Satisfaction Index",
      description: "Five star client satisfaction across handover and servicing",
    },
    {
      value: `${stats.masterBuildersCount}`,
      label: "Master Pool Builders",
      description: "Licensed in house engineers, pool artisans, and project directors",
    },
  ];

  return (
    <Section className="py-16 md:py-20 border-y border-slate-800 bg-slate-900/40">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest font-semibold text-cyan-400 mb-2">
            Proven Track Record
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Trust Built on Concrete Integrity
          </h2>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item) => (
            <div
              key={item.label}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <dd className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300 tracking-tight">
                {item.value}
              </dd>
              <div className="mt-4">
                <dt className="text-base font-semibold text-white">
                  {item.label}
                </dt>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
