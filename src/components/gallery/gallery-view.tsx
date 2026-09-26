"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import type { GalleryProject, GalleryStyle } from "@/types";
import { GalleryFilter } from "./gallery-filter";
import { GalleryCard } from "./gallery-card";
import { GalleryLightbox } from "./gallery-lightbox";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw } from "lucide-react";

export interface GalleryViewProps {
  initialProjects: GalleryProject[];
  styles: GalleryStyle[];
  initialStyle?: string | null;
  initialProjectSlug?: string | null;
  productLookup?: Record<string, { slug: string; name: string }>;
}

export function GalleryView({
  initialProjects,
  styles,
  initialStyle = null,
  initialProjectSlug = null,
  productLookup = {},
}: GalleryViewProps) {
  const [activeStyle, setActiveStyle] = useState<string | null>(initialStyle);
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(() => {
    if (!initialProjectSlug) return null;
    return initialProjects.find((p) => p.slug === initialProjectSlug) || null;
  });

  // URL query parameter synchronization
  const updateUrl = useCallback(
    (styleParam: string | null, projectSlug: string | null) => {
      if (typeof window === "undefined") return;

      const params = new URLSearchParams(window.location.search);

      if (styleParam) {
        params.set("style", styleParam);
      } else {
        params.delete("style");
      }

      if (projectSlug) {
        params.set("project", projectSlug);
      } else {
        params.delete("project");
      }

      const queryString = params.toString();
      const newUrl = queryString
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname;

      window.history.pushState(null, "", newUrl);
    },
    []
  );

  // Popstate listener for back and forward browser buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const styleParam = params.get("style");
      const projectParam = params.get("project");

      setActiveStyle(styleParam);

      if (projectParam) {
        const found = initialProjects.find((p) => p.slug === projectParam);
        setSelectedProject(found || null);
      } else {
        setSelectedProject(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [initialProjects]);

  const handleSelectStyle = (style: string | null) => {
    setActiveStyle(style);
    updateUrl(style, selectedProject?.slug || null);
  };

  const handleOpenLightbox = (project: GalleryProject) => {
    setSelectedProject(project);
    updateUrl(activeStyle, project.slug);
  };

  const handleCloseLightbox = () => {
    setSelectedProject(null);
    updateUrl(activeStyle, null);
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (!activeStyle) return initialProjects;
    return initialProjects.filter((p) => p.style === activeStyle);
  }, [initialProjects, activeStyle]);

  const relatedProduct = selectedProject?.relatedProductId
    ? productLookup[selectedProject.relatedProductId] || null
    : null;

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Gallery Filter Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-travertine-300 pb-4">
        <GalleryFilter
          styles={styles}
          activeStyle={activeStyle}
          onSelectStyle={handleSelectStyle}
        />
        <div className="text-xs font-mono text-slate-500 whitespace-nowrap self-end sm:self-center">
          Showing {filteredProjects.length} of {initialProjects.length} installations
        </div>
      </div>

      {/* Gallery Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <GalleryCard
              key={project.id}
              project={project}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
        </div>
      ) : (
        /* Empty State with Reset Button */
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-dashed border-travertine-300 my-8">
          <div className="w-12 h-12 rounded-full bg-travertine-100 flex items-center justify-center text-slate-500 mb-4">
            <Sparkles className="w-6 h-6 text-gold-500" aria-hidden="true" />
          </div>
          <h3 className="font-serif text-xl font-medium text-navy-950 mb-2">
            No Projects in this Design Style
          </h3>
          <p className="text-sm text-slate-600 max-w-md mb-6">
            We are currently documenting additional architectural commissions in this style.
            Explore all pool installations or consult our master builders for custom plans.
          </p>
          <Button
            variant="primary"
            onClick={() => handleSelectStyle(null)}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Reset to All Styles</span>
          </Button>
        </div>
      )}

      {/* Accessible Fullscreen Lightbox */}
      <GalleryLightbox
        key={selectedProject?.id || "closed"}
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={handleCloseLightbox}
        relatedProduct={relatedProduct}
      />
    </div>
  );
}
