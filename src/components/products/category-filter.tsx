"use client";

import React from "react";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";

export interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  className,
}: CategoryFilterProps) {
  return (
    <nav
      aria-label="Pool category filters"
      className={cn("w-full overflow-x-auto pb-2 scrollbar-none", className)}
    >
      <div className="flex items-center gap-2 min-w-max">
        <button
          type="button"
          data-category-slug="all"
          onClick={() => onSelectCategory(null)}
          aria-pressed={activeCategory === null}
          className={cn(
            "min-h-[44px] min-w-[44px] px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer select-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 focus-visible:ring-offset-2",
            activeCategory === null
              ? "bg-navy-900 text-travertine-50 shadow-sm"
              : "bg-travertine-100 text-slate-700 hover:bg-travertine-200 border border-travertine-300"
          )}
        >
          All Pools
        </button>

        {categories.map((category) => {
          const isActive = activeCategory === category.slug;
          return (
            <button
              key={category.id}
              type="button"
              data-category-slug={category.slug}
              onClick={() => onSelectCategory(category.slug)}
              aria-pressed={isActive}
              className={cn(
                "min-h-[44px] min-w-[44px] px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer select-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 focus-visible:ring-offset-2",
                isActive
                  ? "bg-navy-900 text-travertine-50 shadow-sm"
                  : "bg-travertine-100 text-slate-700 hover:bg-travertine-200 border border-travertine-300"
              )}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
