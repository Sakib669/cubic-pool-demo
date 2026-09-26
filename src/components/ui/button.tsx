import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "azure";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none rounded-sm min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variantStyles = {
      primary:
        "bg-navy-900 text-travertine-50 hover:bg-navy-800 active:bg-navy-950 border border-navy-700/40 shadow-sm",
      secondary:
        "bg-travertine-200 text-navy-900 hover:bg-travertine-300 active:bg-travertine-400 border border-travertine-300",
      outline:
        "border border-navy-900/30 text-navy-900 hover:bg-travertine-200/50 active:bg-travertine-200",
      ghost:
        "text-navy-900 hover:bg-travertine-200/60 active:bg-travertine-300/60",
      gold:
        "bg-gold-500 text-navy-950 hover:bg-gold-400 active:bg-gold-600 font-semibold shadow-sm",
      azure:
        "bg-azure-500 text-navy-950 hover:bg-azure-400 active:bg-azure-600 font-semibold shadow-sm",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-5 py-2.5",
      lg: "text-base px-7 py-3",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
