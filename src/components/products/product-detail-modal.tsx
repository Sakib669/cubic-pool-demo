"use client";

import React, { useEffect, useRef, useCallback } from "react";
import type { Product, Category } from "@/types";
import { ProductGallery } from "./product-gallery";
import { ProductSpecsTable } from "./product-specs-table";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export interface ProductDetailModalProps {
  product: Product | null;
  category?: Category;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({
  product,
  category,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap mechanics
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement | null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousActiveElement.current?.focus();
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !product) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content Card */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-white border border-travertine-300 shadow-2xl p-6 sm:p-8 focus:outline-none scrollbar-thin"
      >
        {/* Header Section */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-travertine-200">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="azure">
                {category?.name || "Luxury Pool"}
              </Badge>
              <Badge variant="outline" className="font-mono">
                {product.priceTier}
              </Badge>
            </div>
            <h2
              id="product-modal-title"
              className="font-serif text-2xl sm:text-3xl font-medium text-navy-950"
            >
              {product.name}
            </h2>
            <p
              id="product-modal-description"
              className="text-xs sm:text-sm text-slate-600 mt-1"
            >
              {product.tagline}
            </p>
          </div>

          {/* Close Button with WCAG 2.2 AA target size */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close product details modal"
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-full text-slate-500 hover:text-navy-950 hover:bg-travertine-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 cursor-pointer flex items-center justify-center shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Two-Column Body Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Gallery Column */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Specifications Column */}
          <div className="lg:col-span-5">
            <ProductSpecsTable product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
