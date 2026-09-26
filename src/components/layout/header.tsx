"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import type { CompanyInfo, Category } from "@/types";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";

export interface HeaderProps {
  companyInfo: CompanyInfo;
  categories?: Category[];
}

export function Header({ companyInfo, categories = [] }: HeaderProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navItems = [
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-header border-b border-navy-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand identity */}
        <Link
          href="/"
          className="flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-400 rounded-sm"
        >
          <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-travertine-50 uppercase">
            Cubic Pools
          </span>
          <span className="text-[10px] tracking-[0.25em] text-azure-400 uppercase font-sans -mt-1 font-medium">
            Architectural Group
          </span>
        </Link>

        {/* Desktop primary navigation */}
        <nav
          className="hidden md:flex items-center space-x-8"
          aria-label="Primary Navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wide text-travertine-200 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-400 rounded px-1 py-1"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Header action CTA & phone */}
        <div className="hidden lg:flex items-center space-x-5">
          <a
            href={`tel:${companyInfo.contact.phone.replace(/[^0-9+]/g, "")}`}
            className="flex items-center gap-2 text-sm text-travertine-100 hover:text-azure-300 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-400 rounded px-2 py-1"
          >
            <Phone className="h-4 w-4 text-azure-400" aria-hidden="true" />
            <span>{companyInfo.contact.phone}</span>
          </a>

          <Link href="/contact" tabIndex={-1}>
            <Button variant="gold" size="sm">
              Book Consultation
            </Button>
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setIsMobileNavOpen(true)}
          className="md:hidden p-2 rounded-md text-travertine-100 hover:text-white hover:bg-navy-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-400 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-nav-drawer"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile drawer navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        companyInfo={companyInfo}
        categories={categories}
      />
    </header>
  );
}
