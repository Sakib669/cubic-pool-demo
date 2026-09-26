import React from "react";
import Link from "next/link";
import { Compass, ArrowRight, Home, Waves, Phone } from "lucide-react";
import { Container, Button, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="py-24 md:py-36 bg-slate-950 text-slate-100 flex items-center justify-center min-h-[70vh]">
      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mx-auto">
            <Compass className="w-8 h-8" aria-hidden="true" />
          </div>

          <p className="text-xs uppercase tracking-widest font-semibold text-cyan-400">
            Error 404
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Uncharted Waters
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-lg mx-auto">
            The architectural pool design or resource you requested may have been relocated, updated, or retired.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
            <Link
              href="/products"
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-colors group flex flex-col justify-between"
            >
              <div>
                <Waves className="w-5 h-5 text-cyan-400 mb-2" aria-hidden="true" />
                <h2 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Pool Collections
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Browse custom architectural models
                </p>
              </div>
              <div className="pt-3 text-cyan-400 text-xs font-semibold flex items-center gap-1">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>

            <Link
              href="/gallery"
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-colors group flex flex-col justify-between"
            >
              <div>
                <Compass className="w-5 h-5 text-cyan-400 mb-2" aria-hidden="true" />
                <h2 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Project Gallery
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  View completed estate installations
                </p>
              </div>
              <div className="pt-3 text-cyan-400 text-xs font-semibold flex items-center gap-1">
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>

            <Link
              href="/contact"
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-colors group flex flex-col justify-between"
            >
              <div>
                <Phone className="w-5 h-5 text-cyan-400 mb-2" aria-hidden="true" />
                <h2 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Client Concierge
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Speak with our engineering directors
                </p>
              </div>
              <div className="pt-3 text-cyan-400 text-xs font-semibold flex items-center gap-1">
                <span>Contact</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>
          </div>

          <div className="pt-6">
            <Link href="/">
              <Button size="lg" className="gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-8">
                <Home className="w-4 h-4" aria-hidden="true" />
                <span>Return to Homepage</span>
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
