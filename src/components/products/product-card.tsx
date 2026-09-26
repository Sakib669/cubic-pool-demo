"use client";

import React from "react";
import Image from "next/image";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Maximize2, Droplets, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  product: Product;
  categoryName?: string;
  onOpenModal: (product: Product) => void;
  className?: string;
}

export function ProductCard({
  product,
  categoryName,
  onOpenModal,
  className,
}: ProductCardProps) {
  const primaryImage = product.images[0];
  const { lengthMeters, widthMeters, depthMeters } = product.dimensions;

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-white rounded-lg border border-travertine-300/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:border-gold-400/60",
        className
      )}
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950">
        {primaryImage && (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <Badge variant="azure" className="shadow-xs backdrop-blur-xs">
            {categoryName || "Luxury Pool"}
          </Badge>
          <Badge variant="dark" className="shadow-xs font-mono">
            {product.priceTier}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-2">
          <h3 className="font-serif text-xl font-medium text-navy-950 group-hover:text-azure-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-600 mt-1 line-clamp-2">
            {product.tagline}
          </p>
        </div>

        {/* Dimension & Volume Metrics */}
        <div className="mt-auto pt-4 border-t border-travertine-200/80 flex items-center justify-between text-xs text-slate-700">
          <div className="flex items-center gap-1.5" title="Dimensions (Length × Width × Depth)">
            <Maximize2 className="w-3.5 h-3.5 text-azure-600" aria-hidden="true" />
            <span className="font-mono">
              {lengthMeters}m × {widthMeters}m × {depthMeters}m
            </span>
          </div>
          <div className="flex items-center gap-1.5" title="Water Volume">
            <Droplets className="w-3.5 h-3.5 text-azure-600" aria-hidden="true" />
            <span className="font-mono">{product.waterVolumeLiters.toLocaleString()} L</span>
          </div>
        </div>

        {/* Details Link & Trigger */}
        <div className="mt-4 pt-3">
          <a
            href={`/products/${product.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onOpenModal(product);
            }}
            className="inline-flex w-full items-center justify-center min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-sm text-sm font-medium bg-travertine-100 hover:bg-navy-900 hover:text-travertine-50 text-navy-950 transition-colors duration-200 border border-travertine-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 focus-visible:ring-offset-2"
          >
            <span>View Specifications</span>
            <ArrowUpRight className="ml-1.5 w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
