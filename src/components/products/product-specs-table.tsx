"use client";

import React from "react";
import Link from "next/link";
import type { Product } from "@/types";
import { Check, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductSpecsTableProps {
  product: Product;
  className?: string;
}

export function ProductSpecsTable({
  product,
  className,
}: ProductSpecsTableProps) {
  const { lengthMeters, widthMeters, depthMeters } = product.dimensions;

  const specRows = [
    { label: "Exterior Length", value: `${lengthMeters} meters` },
    { label: "Exterior Width", value: `${widthMeters} meters` },
    { label: "Water Depth", value: `${depthMeters} meters` },
    {
      label: "Water Volume",
      value: `${product.waterVolumeLiters.toLocaleString()} Liters`,
    },
    { label: "Shell Material", value: product.shellMaterial },
    {
      label: "Structural Warranty",
      value: `${product.warrantyYears} Years Monolithic Integrity`,
    },
    { label: "Investment Tier", value: product.priceTier },
  ];

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Description Overview */}
      <div>
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
          Design Concept & Overview
        </h4>
        <p className="text-sm text-slate-700 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* High Contrast Specifications Table */}
      <div>
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
          Engineering Specifications
        </h4>
        <div className="overflow-hidden rounded-md border border-travertine-300 bg-white">
          <table className="w-full text-left border-collapse text-xs">
            <caption className="sr-only">
              Technical specifications for {product.name}
            </caption>
            <tbody>
              {specRows.map((row, index) => (
                <tr
                  key={row.label}
                  className={cn(
                    "border-b border-travertine-200 last:border-b-0 transition-colors",
                    index % 2 === 0 ? "bg-travertine-50/50" : "bg-white"
                  )}
                >
                  <th
                    scope="row"
                    className="py-2.5 px-4 font-medium text-slate-600 w-2/5 sm:w-1/3"
                  >
                    {row.label}
                  </th>
                  <td className="py-2.5 px-4 font-mono font-medium text-navy-950">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Architectural Features Checklist */}
      <div>
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
          Signature Inclusions
        </h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800">
          {product.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 p-2 rounded-md bg-travertine-50 border border-travertine-200/60"
            >
              <Check
                className="w-4 h-4 text-azure-600 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Monolithic Warranty Guarantee Notice */}
      <div className="flex items-center gap-3 p-3.5 rounded-md bg-navy-900 text-travertine-100 text-xs">
        <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" aria-hidden="true" />
        <p className="leading-relaxed">
          Every Cubic pool arrives certified with independent structural engineering
          and a guaranteed {product.warrantyYears} year warranty backed by Master Builders Australia.
        </p>
      </div>

      {/* Primary Enquiry CTA Button */}
      <div className="pt-2">
        <Link
          href={`/contact?product=${product.slug}`}
          className="inline-flex w-full items-center justify-center min-h-[48px] px-6 py-3 rounded-sm text-sm font-semibold bg-gold-500 text-navy-950 hover:bg-gold-400 active:bg-gold-600 shadow-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 focus-visible:ring-offset-2"
        >
          <span>Enquire About This Pool</span>
          <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
