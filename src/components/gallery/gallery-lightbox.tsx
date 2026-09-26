"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GalleryProject } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Check,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryLightboxProps {
  project: GalleryProject | null;
  isOpen: boolean;
  onClose: () => void;
  relatedProduct?: { slug: string; name: string } | null;
}

export function GalleryLightbox({
  project,
  isOpen,
  onClose,
  relatedProduct,
}: GalleryLightboxProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const images = project?.images || [];
  const activeImage = images[photoIndex] || images[0];

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    setPhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    setPhotoIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);


  // Keyboard navigation and focus trap
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      // Return focus to triggering card or fallback to gallery heading
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      } else {
        const heading = document.getElementById("gallery-heading");
        heading?.focus();
      }
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;

    if (deltaX > 50) {
      handlePrev(); // Swipe right -> show previous
    } else if (deltaX < -50) {
      handleNext(); // Swipe left -> show next
    }
    touchStartX.current = null;
  };

  if (!isOpen || !project || !activeImage) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-project-title"
      aria-describedby="lightbox-project-description"
      className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-md flex flex-col p-4 sm:p-6 overflow-y-auto scrollbar-none"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-navy-800 text-travertine-100 shrink-0">
        <div className="flex items-center gap-2">
          <Badge variant="azure">{project.style}</Badge>
          <span className="text-xs font-mono text-travertine-300">
            Photo {photoIndex + 1} of {images.length}
          </span>
        </div>

        {/* Accessible Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close installation photography lightbox"
          className="min-h-[44px] min-w-[44px] p-2.5 rounded-full text-travertine-300 hover:text-white hover:bg-navy-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-400 cursor-pointer flex items-center justify-center"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {/* Main Image Stage and Carousel Area */}
      <div
        className="relative flex-1 min-h-[300px] max-h-[60vh] sm:max-h-[65vh] w-full my-4 flex items-center justify-center select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={activeImage.url}
          alt={activeImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />

        {/* Carousel Prev/Next Buttons */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project photograph"
              className="absolute left-2 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-navy-900/80 text-travertine-100 hover:bg-navy-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project photograph"
              className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-navy-900/80 text-travertine-100 hover:bg-navy-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Selector Strip (hidden when images.length <= 1) */}
      {images.length > 1 && (
        <div
          role="tablist"
          aria-label="Project photography thumbnails"
          className="flex items-center justify-center gap-2 py-2 overflow-x-auto scrollbar-none shrink-0"
        >
          {images.map((img, idx) => {
            const isSelected = idx === photoIndex;
            return (
              <button
                key={img.url + idx}
                role="tab"
                type="button"
                aria-selected={isSelected}
                aria-label={`Thumbnail ${idx + 1}: ${img.alt}`}
                onClick={() => setPhotoIndex(idx)}
                className={cn(
                  "relative aspect-[16/10] w-16 sm:w-20 rounded-md overflow-hidden min-h-[44px] min-w-[44px] transition-all duration-200 border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-400 cursor-pointer shrink-0",
                  isSelected
                    ? "border-azure-400 ring-2 ring-azure-400/30 shadow-xs"
                    : "border-navy-700 opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={img.url}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Bottom Project Caption & Metadata Panel */}
      <div className="mt-auto pt-4 border-t border-navy-800 text-travertine-100 max-w-4xl mx-auto w-full shrink-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
          <h2
            id="lightbox-project-title"
            className="font-serif text-xl sm:text-2xl font-medium text-white"
          >
            {project.title}
          </h2>
          <div className="flex items-center gap-4 text-xs text-travertine-300">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" aria-hidden="true" />
              <span>{project.location}</span>
            </span>
            <span className="flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5 text-gold-400 shrink-0" aria-hidden="true" />
              <span>Completed {project.completionYear}</span>
            </span>
          </div>
        </div>

        <p
          id="lightbox-project-description"
          className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4"
        >
          {project.description}
        </p>

        {/* Signature Architectural Features */}
        <div className="mb-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-travertine-400 mb-2">
            Signature Architectural Highlights
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-travertine-200">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check
                  className="w-4 h-4 text-azure-400 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Pool Model Link Referral */}
        {relatedProduct && (
          <div className="pt-3 border-t border-navy-800/80 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-travertine-300">
              Built on the {relatedProduct.name} architectural engineering platform.
            </span>
            <Link
              href={`/products?product=${relatedProduct.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-400 rounded-xs py-1"
            >
              <span>Explore Pool Specifications</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
