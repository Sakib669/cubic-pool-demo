import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import type { CompanyInfo } from "@/types";

export interface ContactInfoProps {
  contact: CompanyInfo["contact"];
  socialLinks: CompanyInfo["socialLinks"];
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function ContactInfo({ contact, socialLinks }: ContactInfoProps) {
  const cleanPhone = contact.phone.replace(/\s+/g, "");

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest font-semibold text-cyan-400 mb-2">
          Concierge & Showroom
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Direct Channels
        </h2>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          Our engineering directors and client concierge team are available for project appraisals, architect collaborations, and private showroom consultations.
        </p>
      </div>

      <div className="space-y-4">
        {/* Telephone */}
        <a
          href={`tel:${cleanPhone}`}
          className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
            <Phone className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Telephone
            </p>
            <p className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
              {contact.phone}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Direct line to project concierge
            </p>
          </div>
        </a>

        {/* Email */}
        <a
          href={`mailto:${contact.email}`}
          className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
            <Mail className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Email Tender Documents
            </p>
            <p className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
              {contact.email}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Architectural plans, site surveys, and briefs
            </p>
          </div>
        </a>

        {/* Showroom Address */}
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-cyan-400 shrink-0">
            <MapPin className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Showroom Location
            </p>
            <p className="text-base font-bold text-white mt-0.5">
              {contact.showroomAddress}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Private client parking available on site
            </p>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-cyan-400 shrink-0">
            <Clock className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Operating Schedule
            </p>
            <p className="text-sm font-medium text-slate-200 mt-0.5">
              {contact.operatingHours}
            </p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="pt-4 border-t border-slate-800">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Follow Our Builds
        </p>
        <div className="flex items-center gap-3">
          {socialLinks.instagram && (
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cubic Pools Instagram"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cubic Pools LinkedIn"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          )}
          {socialLinks.facebook && (
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cubic Pools Facebook"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
