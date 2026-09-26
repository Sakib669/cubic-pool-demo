"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import type { Product, Category } from "@/types";
import { CategoryFilter } from "./category-filter";
import { ProductCard } from "./product-card";
import { ProductDetailModal } from "./product-detail-modal";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw } from "lucide-react";

export interface ProductCatalogProps {
  initialProducts: Product[];
  categories: Category[];
  initialCategorySlug?: string | null;
  initialProductSlug?: string | null;
}

export function ProductCatalog({
  initialProducts,
  categories,
  initialCategorySlug = null,
  initialProductSlug = null,
}: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    initialCategorySlug
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(() => {
    if (!initialProductSlug) return null;
    return initialProducts.find((p) => p.slug === initialProductSlug) || null;
  });

  // Map categoryId -> Category for fast lookup
  const categoryMap = useMemo(() => {
    const map = new Map<string, Category>();
    categories.forEach((cat) => map.set(cat.id, cat));
    return map;
  }, [categories]);

  // Map categorySlug -> Category
  const slugToCategoryMap = useMemo(() => {
    const map = new Map<string, Category>();
    categories.forEach((cat) => map.set(cat.slug, cat));
    return map;
  }, [categories]);

  // Synchronize browser URL query parameters
  const updateUrl = useCallback(
    (categorySlug: string | null, productSlug: string | null) => {
      if (typeof window === "undefined") return;

      const params = new URLSearchParams(window.location.search);

      if (categorySlug) {
        params.set("category", categorySlug);
      } else {
        params.delete("category");
      }

      if (productSlug) {
        params.set("product", productSlug);
      } else {
        params.delete("product");
      }

      const queryString = params.toString();
      const newUrl = queryString
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname;

      window.history.pushState(null, "", newUrl);
    },
    []
  );

  // Handle popstate for browser back and forward button navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get("category");
      const productParam = params.get("product");

      setActiveCategory(categoryParam);

      if (productParam) {
        const found = initialProducts.find((p) => p.slug === productParam);
        setSelectedProduct(found || null);
      } else {
        setSelectedProduct(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [initialProducts]);

  // Filter selection handler
  const handleSelectCategory = (categorySlug: string | null) => {
    setActiveCategory(categorySlug);
    updateUrl(categorySlug, selectedProduct?.slug || null);
  };

  // Open modal handler
  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    updateUrl(activeCategory, product.slug);
  };

  // Close modal handler
  const handleCloseModal = () => {
    setSelectedProduct(null);
    updateUrl(activeCategory, null);
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    if (!activeCategory) return initialProducts;
    const cat = slugToCategoryMap.get(activeCategory);
    if (!cat) return initialProducts;
    return initialProducts.filter((p) => p.categoryId === cat.id);
  }, [initialProducts, activeCategory, slugToCategoryMap]);

  const selectedCategory = selectedProduct
    ? categoryMap.get(selectedProduct.categoryId)
    : undefined;

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Category Filter Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-travertine-300 pb-4">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />
        <div className="text-xs font-mono text-slate-500 whitespace-nowrap self-end sm:self-center">
          Showing {filteredProducts.length} of {initialProducts.length} models
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const cat = categoryMap.get(product.categoryId);
            return (
              <ProductCard
                key={product.id}
                product={product}
                categoryName={cat?.name}
                onOpenModal={handleOpenModal}
              />
            );
          })}
        </div>
      ) : (
        /* Empty State with Filter Reset */
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-dashed border-travertine-300 my-8">
          <div className="w-12 h-12 rounded-full bg-travertine-100 flex items-center justify-center text-slate-500 mb-4">
            <Sparkles className="w-6 h-6 text-gold-500" aria-hidden="true" />
          </div>
          <h3 className="font-serif text-xl font-medium text-navy-950 mb-2">
            No Pool Models In This Category
          </h3>
          <p className="text-sm text-slate-600 max-w-md mb-6">
            We currently do not have preconfigured models under this filter. Browse
            all luxury designs or contact our architectural engineering team for custom commissions.
          </p>
          <Button
            variant="primary"
            onClick={() => handleSelectCategory(null)}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Reset to All Pools</span>
          </Button>
        </div>
      )}

      {/* Accessible Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        category={selectedCategory}
        isOpen={selectedProduct !== null}
        onClose={handleCloseModal}
      />
    </div>
  );
}
