"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Phone, Mail, MapPin } from "lucide-react";
import type { CompanyInfo, Category } from "@/types";
import { Button } from "@/components/ui/button";

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  companyInfo: CompanyInfo;
  categories?: Category[];
}

export function MobileNav({
  isOpen,
  onClose,
  companyInfo,
  categories = [],
}: MobileNavProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Pool Collections", href: "/products" },
    { label: "Design Gallery", href: "/gallery" },
    { label: "About Us", href: "/about" },
    { label: "Contact & Consultations", href: "/contact" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      id="mobile-nav-drawer"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-sm bg-navy-900 text-travertine-50 shadow-2xl flex flex-col h-full border-l border-navy-700/60 overflow-y-auto"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-6 border-b border-navy-800">
          <span className="font-serif text-xl tracking-tight text-travertine-50">
            {companyInfo.name}
          </span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 text-travertine-200 hover:text-white rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-400 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Primary nav links */}
        <nav className="flex-1 px-6 py-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-3 py-3 rounded-md text-lg font-medium text-travertine-100 hover:text-white hover:bg-navy-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-400 min-h-[44px]"
            >
              {link.label}
            </Link>
          ))}

          {/* Category shortcuts if provided */}
          {categories.length > 0 && (
            <div className="pt-6 border-t border-navy-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-travertine-300/70 px-3 block mb-2">
                Popular Categories
              </span>
              <div className="space-y-1">
                {categories.slice(0, 4).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.slug}`}
                    onClick={onClose}
                    className="block px-3 py-2 text-sm text-travertine-200/90 hover:text-azure-300 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Contact info and action CTA */}
        <div className="p-6 border-t border-navy-800 bg-navy-950/40 space-y-4">
          <div className="space-y-2 text-xs text-travertine-300">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-azure-400 shrink-0" aria-hidden="true" />
              <a
                href={`tel:${companyInfo.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="hover:underline text-travertine-100 font-medium"
              >
                {companyInfo.contact.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-azure-400 shrink-0" aria-hidden="true" />
              <a
                href={`mailto:${companyInfo.contact.email}`}
                className="hover:underline text-travertine-100"
              >
                {companyInfo.contact.email}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-azure-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{companyInfo.contact.showroomAddress}</span>
            </div>
          </div>

          <Link href="/contact" onClick={onClose} className="block w-full">
            <Button
              variant="gold"
              className="w-full justify-center"
            >
              Request Consultation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
