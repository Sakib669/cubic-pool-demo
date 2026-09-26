import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  level?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  invert?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  level = "h2",
  className,
  invert = false,
}: SectionHeadingProps) {
  const HeadingTag = level;

  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={cn(
        "flex flex-col mb-10 md:mb-14 max-w-3xl",
        alignStyles[align],
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full inline-block",
            invert
              ? "bg-azure-500/20 text-azure-300 border border-azure-400/30"
              : "bg-azure-100 text-azure-700 border border-azure-300/50"
          )}
        >
          {eyebrow}
        </span>
      )}
      <HeadingTag
        className={cn(
          "font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-tight",
          invert ? "text-travertine-50" : "text-navy-950"
        )}
      >
        {title}
      </HeadingTag>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed max-w-2xl font-sans",
            invert ? "text-travertine-200/80" : "text-slate-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
