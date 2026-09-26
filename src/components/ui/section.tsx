import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "default" | "muted" | "dark" | "navy";
}

export function Section({
  padding = "lg",
  variant = "default",
  className,
  children,
  ...props
}: SectionProps) {
  const paddingStyles = {
    none: "py-0",
    sm: "py-8 md:py-12",
    md: "py-12 md:py-16",
    lg: "py-16 md:py-24",
  };

  const variantStyles = {
    default: "bg-transparent text-slate-800",
    muted: "bg-travertine-200/50 text-slate-800 border-y border-travertine-300/40",
    dark: "bg-navy-900 text-travertine-50",
    navy: "bg-navy-950 text-travertine-100",
  };

  return (
    <section
      className={cn(paddingStyles[padding], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </section>
  );
}
