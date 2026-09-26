import React from "react";
import Link from "next/link";
import { Phone, MapPin, Calendar, Clock } from "lucide-react";
import { Container, Section, Button } from "@/components/ui";
import type { CompanyInfo } from "@/types";

export interface AboutCtaProps {
  contact: CompanyInfo["contact"];
}

export function AboutCta({ contact }: AboutCtaProps) {
  return (
    <Section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800">
      <Container>
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 border border-slate-700 bg-slate-900/90 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center space-y-6">
            <p className="text-xs uppercase tracking-widest font-semibold text-cyan-400">
              Private Commissioning
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white max-w-2xl mx-auto">
              Discuss Your Vision with Our Principal Engineers
            </h2>

            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              We invite prospective estate owners, architects, and builders to book an exclusive consultation at our Double Bay showroom or arrange a confidential site evaluation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-4 text-left">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-xs text-slate-300">
                  <p className="font-semibold text-white">Showroom Suite</p>
                  <p className="mt-0.5">{contact.showroomAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-xs text-slate-300">
                  <p className="font-semibold text-white">Hours</p>
                  <p className="mt-0.5">{contact.operatingHours}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-8">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>Request Consultation</span>
                </Button>
              </Link>

              <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>
                <Button variant="outline" size="lg" className="gap-2 border-slate-700 text-slate-200 hover:text-white">
                  <Phone className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  <span>Call {contact.phone}</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
