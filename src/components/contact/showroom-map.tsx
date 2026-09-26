import React from "react";
import { Navigation, Compass, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui";

export interface ShowroomMapCardProps {
  showroomAddress: string;
}

export function ShowroomMapCard({ showroomAddress }: ShowroomMapCardProps) {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    showroomAddress
  )}`;

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span>Showroom & Design Studio</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            33.876° S, 151.242° E
          </span>
        </div>

        <h3 className="text-xl font-bold text-white">
          Double Bay Harbor Precinct
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed">
          Located in the heart of Double Bay, our studio features full size material displays, coping samples, mineral filtration displays, and private architectural review suites.
        </p>

        {/* Visual Map Representation */}
        <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center p-6 text-center group">
          <div
            className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-2">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/10">
              <Navigation className="w-6 h-6 animate-pulse" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-white">
              {showroomAddress}
            </p>
            <p className="text-xs text-slate-400">
              Double Bay Marina precinct, 10 minutes from Sydney CBD
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-400 pt-2">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <p className="font-semibold text-slate-200">Valet & Parking</p>
            <p className="mt-0.5">Complimentary subterranean parking available with confirmation</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <p className="font-semibold text-slate-200">Appointments</p>
            <p className="mt-0.5">Walk ins welcomed, private boardroom bookings recommended</p>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-800">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-block"
        >
          <Button
            variant="outline"
            className="w-full gap-2 border-slate-700 hover:border-cyan-500 text-slate-200 hover:text-white"
          >
            <span>Open Directions in Google Maps</span>
            <ExternalLink className="w-4 h-4 text-cyan-400" aria-hidden="true" />
          </Button>
        </a>
      </div>
    </div>
  );
}
