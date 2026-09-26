"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { ImageObject } from "@/types";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductGalleryProps {
  images: ImageObject[];
  productName: string;
  className?: string;
}

export function ProductGallery({
  images,
  productName,
  className,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const activeImage = images[activeIndex] || images[0];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation for zoom lightbox
  useEffect(() => {
    if (!isZoomOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsZoomOpen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isZoomOpen, handlePrev, handleNext]);

  if (!images || images.length === 0) {
    return (
      <div className={cn("aspect-[16/10] bg-travertine-200 rounded-lg flex items-center justify-center text-slate-500", className)}>
        <span>No photography available</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Main Preview Container */}
      <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-navy-950 group">
        <Image
          src={activeImage.url}
          alt={activeImage.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
        />

        {/* Click to Zoom Overlay Trigger */}
        <button
          type="button"
          onClick={() => setIsZoomOpen(true)}
          aria-label={`Zoom into high resolution photo of ${productName}`}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-navy-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-zoom-in"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-900/80 text-travertine-100 text-xs font-medium backdrop-blur-xs shadow-sm">
            <ZoomIn className="w-4 h-4 text-gold-400" aria-hidden="true" />
            <span>Click to Expand Zoom</span>
          </span>
        </button>

        {/* Carousel Navigation Arrows when multiple images */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous pool image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] p-2 rounded-full bg-navy-900/70 text-travertine-100 hover:bg-navy-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next pool image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] p-2 rounded-full bg-navy-900/70 text-travertine-100 hover:bg-navy-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Selector Strip (hidden if images.length <= 1) */}
      {images.length > 1 && (
        <div
          role="tablist"
          aria-label="Product photography gallery thumbnails"
          className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
        >
          {images.map((img, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={img.url + idx}
                role="tab"
                type="button"
                aria-selected={isSelected}
                aria-label={`Thumbnail ${idx + 1}: ${img.alt}`}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "relative aspect-[16/10] w-20 flex-shrink-0 rounded-md overflow-hidden min-h-[44px] min-w-[44px] transition-all duration-200 border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500",
                  isSelected
                    ? "border-azure-500 ring-2 ring-azure-500/20 shadow-xs"
                    : "border-travertine-300 opacity-70 hover:opacity-100"
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

      {/* Fullscreen Lightbox Zoom Overlay */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded zoom photo for ${productName}`}
          className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
        >
          {/* Top Bar with Counter and Close */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-travertine-100 z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-travertine-300">
              Photo {activeIndex + 1} of {images.length}
            </span>
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              aria-label="Close image zoom overlay"
              className="min-h-[44px] min-w-[44px] p-2 rounded-full bg-navy-900/80 text-travertine-100 hover:bg-navy-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Large Contain Image */}
          <div className="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center">
            <Image
              src={activeImage.url}
              alt={activeImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Lightbox Navigation Controls */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous zoomed photo"
                className="absolute left-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-navy-900/80 text-travertine-100 hover:bg-navy-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500"
              >
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next zoomed photo"
                className="absolute right-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-navy-900/80 text-travertine-100 hover:bg-navy-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500"
              >
                <ChevronRight className="w-6 h-6" aria-hidden="true" />
              </button>
            </>
          )}

          {/* Caption */}
          <p className="mt-3 text-center text-xs text-travertine-300 max-w-xl">
            {activeImage.alt}
          </p>
        </div>
      )}
    </div>
  );
}
