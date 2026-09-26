"use client";

import React from "react";
import type { GalleryStyle } from "@/types";
import { cn } from "@/lib/utils";

export interface GalleryFilterProps {
  styles: GalleryStyle[];
  activeStyle: string | null;
  onSelectStyle: (style: string | null) => void;
  className?: string;
}

export function GalleryFilter({
  styles,
  activeStyle,
  onSelectStyle,
  className,
}: GalleryFilterProps) {
  return (
    <nav
      aria-label="Pool design style filters"
      className={cn("w-full overflow-x-auto pb-2 scrollbar-none", className)}
    >
      <div className="flex items-center gap-2 min-w-max">
        <button
          type="button"
          data-style="all"
          onClick={() => onSelectStyle(null)}
          aria-pressed={activeStyle === null}
          className={cn(
            "min-h-[44px] min-w-[44px] px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer select-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 focus-visible:ring-offset-2",
            activeStyle === null
              ? "bg-navy-900 text-travertine-50 shadow-sm"
              : "bg-travertine-100 text-slate-700 hover:bg-travertine-200 border border-travertine-300"
          )}
        >
          All Styles
        </button>

        {styles.map((style) => {
          const isActive = activeStyle === style;
          return (
            <button
              key={style}
              type="button"
              data-style={style}
              onClick={() => onSelectStyle(style)}
              aria-pressed={isActive}
              className={cn(
                "min-h-[44px] min-w-[44px] px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer select-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 focus-visible:ring-offset-2",
                isActive
                  ? "bg-navy-900 text-travertine-50 shadow-sm"
                  : "bg-travertine-100 text-slate-700 hover:bg-travertine-200 border border-travertine-300"
              )}
            >
              {style}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
