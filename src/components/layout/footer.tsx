import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import type { CompanyInfo, Category } from "@/types";

export interface FooterProps {
  companyInfo: CompanyInfo;
  categories?: Category[];
}

export function Footer({ companyInfo, categories = [] }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Pool Collections", href: "/products" },
    { label: "Design Gallery", href: "/gallery" },
    { label: "About Our Heritage", href: "/about" },
    { label: "Consultations & Quotes", href: "/contact" },
  ];

  return (
    <footer className="bg-navy-950 text-travertine-100 border-t border-navy-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-navy-800/70">
          {/* Column 1: Brand and Heritage */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-travertine-50 uppercase block">
                {companyInfo.name}
              </span>
              <span className="text-[10px] tracking-[0.2em] text-azure-400 uppercase font-sans font-medium">
                Luxury Architectural Pools
              </span>
            </div>

            <p className="text-sm text-travertine-200/80 leading-relaxed font-sans">
              {companyInfo.tagline}
            </p>

            <div className="pt-2">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-gold-400 bg-navy-900 border border-gold-500/20 px-3 py-1 rounded">
                Founded in {companyInfo.heritageYear} · {companyInfo.stats.projectsCompleted}+ Projects
              </span>
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-4 pt-2">
              {companyInfo.socialLinks?.instagram && (
                <a
                  href={companyInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-travertine-300 hover:text-azure-400 transition-colors text-xs font-medium"
                  aria-label="Cubic Pools Instagram profile"
                >
                  Instagram
                </a>
              )}
              {companyInfo.socialLinks?.linkedin && (
                <a
                  href={companyInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-travertine-300 hover:text-azure-400 transition-colors text-xs font-medium"
                  aria-label="Cubic Pools LinkedIn profile"
                >
                  LinkedIn
                </a>
              )}
              {companyInfo.socialLinks?.pinterest && (
                <a
                  href={companyInfo.socialLinks.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-travertine-300 hover:text-azure-400 transition-colors text-xs font-medium"
                  aria-label="Cubic Pools Pinterest profile"
                >
                  Pinterest
                </a>
              )}
              {companyInfo.socialLinks?.facebook && (
                <a
                  href={companyInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-travertine-300 hover:text-azure-400 transition-colors text-xs font-medium"
                  aria-label="Cubic Pools Facebook page"
                >
                  Facebook
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold tracking-wide text-travertine-50">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-travertine-200 hover:text-azure-300 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-azure-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Pool Categories */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold tracking-wide text-travertine-50">
              Pool Collections
            </h3>
            <ul className="space-y-2.5 text-sm">
              {categories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="text-travertine-200 hover:text-azure-300 transition-colors inline-block"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Showroom & Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold tracking-wide text-travertine-50">
              Showroom & Contact
            </h3>
            <div className="space-y-3 text-sm text-travertine-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-azure-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{companyInfo.contact.showroomAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-azure-400 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${companyInfo.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-azure-300 transition-colors font-medium text-travertine-100"
                >
                  {companyInfo.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-azure-400 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${companyInfo.contact.email}`}
                  className="hover:text-azure-300 transition-colors"
                >
                  {companyInfo.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-travertine-300 pt-1">
                <Clock className="h-4 w-4 text-azure-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{companyInfo.contact.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-travertine-300 gap-4">
          <p>© {currentYear} {companyInfo.name} Pty Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
