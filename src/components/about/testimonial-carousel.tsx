"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Pause, Star, Quote } from "lucide-react";
import { Container, Section, SectionHeading, Button } from "@/components/ui";
import type { Testimonial } from "@/types";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => {};
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoplayIntervalMs?: number;
}

export function TestimonialCarousel({
  testimonials,
  autoplayIntervalMs = 6000,
}: TestimonialCarouselProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userPausedOverride, setUserPausedOverride] = useState<boolean | null>(null);
  const isUserPaused =
    userPausedOverride !== null ? userPausedOverride : prefersReducedMotion;
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const total = testimonials.length;

  const goToNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (total <= 1 || isUserPaused || isHovered || isFocused) {
      return;
    }

    const timer = setInterval(() => {
      goToNext();
    }, autoplayIntervalMs);

    return () => clearInterval(timer);
  }, [total, isUserPaused, isHovered, isFocused, autoplayIntervalMs, goToNext]);

  // Keyboard navigation on container
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (total <= 1) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
    }
  };

  // Touch swipe handling with 50px threshold
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (total <= 1) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (total <= 1 || touchStartXRef.current === null || touchStartYRef.current === null) {
      return;
    }

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = touchStartXRef.current - endX;
    const diffY = touchStartYRef.current - endY;

    // Trigger swipe only if horizontal movement exceeds vertical and passes 50px threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  if (total === 0) {
    return null;
  }

  const activeItem = testimonials[currentIndex];

  // Client initials for avatar fallback
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return (name[0] || "C").toUpperCase();
  };

  const isRotating = !isUserPaused && !isHovered && !isFocused && total > 1;

  return (
    <Section className="py-16 md:py-24 bg-slate-950">
      <Container>
        <SectionHeading
          eyebrow="Client Stories"
          title="Reflections from Our Clients"
          subtitle="Read testimonials from estate owners and architects who entrusted Cubic Pools with their vision."
          align="center"
          className="mb-12"
        />

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: "pan-y" }}
          className="relative max-w-4xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-12 shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {/* Subtle quotation background mark */}
          <div className="absolute top-6 right-8 text-slate-800/40 pointer-events-none" aria-hidden="true">
            <Quote className="w-20 h-20" />
          </div>

          <div
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${currentIndex + 1} of ${total}`}
            aria-live={isRotating ? "off" : "polite"}
            className="relative z-10 flex flex-col justify-between min-h-[280px]"
          >
            {/* Star rating */}
            <div
              className="flex items-center gap-1.5 mb-6"
              aria-label={`Rated ${activeItem.rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  aria-hidden="true"
                  className={`w-5 h-5 ${
                    i < activeItem.rating
                      ? "text-amber-400 fill-amber-400"
                      : "text-slate-700"
                  }`}
                />
              ))}
            </div>

            {/* Testimonial quote */}
            <blockquote className="text-lg sm:text-xl md:text-2xl font-light text-slate-100 leading-relaxed italic mb-8">
              &ldquo;{activeItem.quote}&rdquo;
            </blockquote>

            {/* Client profile and project details */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-4">
                {activeItem.avatarUrl ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-700 shrink-0 bg-slate-800">
                    <Image
                      src={activeItem.avatarUrl}
                      alt={activeItem.clientName}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-semibold text-sm shrink-0">
                    {getInitials(activeItem.clientName)}
                  </div>
                )}
                <div>
                  <h4 className="text-base font-bold text-white">
                    {activeItem.clientName}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {activeItem.clientRole}, {activeItem.location}
                  </p>
                </div>
              </div>

              <div className="text-xs font-medium text-cyan-400 sm:text-right bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-900/60 inline-self-start sm:inline-self-auto">
                {activeItem.projectTitle}
              </div>
            </div>
          </div>

          {/* Carousel controls: only displayed when more than 1 testimonial */}
          {total > 1 && (
            <div className="mt-8 pt-4 flex flex-wrap items-center justify-between gap-4">
              {/* Play and pause control */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUserPausedOverride(!isUserPaused)}
                aria-label={
                  isUserPaused
                    ? "Play testimonial rotation"
                    : "Pause testimonial rotation"
                }
                className="h-9 px-3 gap-1.5 text-xs text-slate-300 border-slate-700 hover:text-white"
              >
                {isUserPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Play</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Pause</span>
                  </>
                )}
              </Button>

              {/* Indicator dots */}
              <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
                {testimonials.map((item, idx) => (
                  <button
                    key={item.id}
                    role="tab"
                    aria-selected={idx === currentIndex}
                    aria-label={`Jump to slide ${idx + 1}`}
                    onClick={() => goToIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      idx === currentIndex
                        ? "w-8 bg-cyan-400"
                        : "w-2.5 bg-slate-700 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrev}
                  aria-label="Previous testimonial"
                  className="h-9 w-9 p-0 rounded-full border-slate-700 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNext}
                  aria-label="Next testimonial"
                  className="h-9 w-9 p-0 rounded-full border-slate-700 hover:text-white"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
