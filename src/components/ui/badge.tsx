import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "azure" | "gold" | "outline" | "dark";
}

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-travertine-200 text-slate-800 border border-travertine-300",
    azure: "bg-azure-100 text-azure-700 border border-azure-300/40",
    gold: "bg-gold-500/20 text-gold-600 border border-gold-400/40",
    outline: "border border-navy-900/30 text-navy-900 bg-transparent",
    dark: "bg-navy-800 text-travertine-100 border border-navy-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
