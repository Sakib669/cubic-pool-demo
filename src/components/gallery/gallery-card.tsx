"use client";

import React from "react";
import Image from "next/image";
import type { GalleryProject } from "@/types";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Camera, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryCardProps {
  project: GalleryProject;
  onOpenLightbox: (project: GalleryProject) => void;
  className?: string;
}

export function GalleryCard({
  project,
  onOpenLightbox,
  className,
}: GalleryCardProps) {
  return (
    <article
      onClick={() => onOpenLightbox(project)}
      className={cn(
        "group relative flex flex-col bg-white rounded-lg border border-travertine-300/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:border-gold-400/60 cursor-pointer",
        className
      )}
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950">
        <Image
          src={project.coverImage.url}
          alt={project.coverImage.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <Badge variant="azure" className="shadow-xs backdrop-blur-xs">
            {project.style}
          </Badge>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-navy-900/80 text-travertine-100 backdrop-blur-xs shadow-xs border border-navy-700/50">
            <Camera className="w-3 h-3 text-gold-400" aria-hidden="true" />
            <span>{project.images.length} Photos</span>
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-2">
          <h3 className="font-serif text-xl font-medium text-navy-950 group-hover:text-azure-700 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-slate-600 mt-1 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Metadata: Location and Year */}
        <div className="mt-auto pt-4 border-t border-travertine-200/80 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5" title="Project Location">
            <MapPin className="w-3.5 h-3.5 text-azure-600 shrink-0" aria-hidden="true" />
            <span className="truncate max-w-[160px]">{project.location}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Completion Year">
            <Calendar className="w-3.5 h-3.5 text-azure-600 shrink-0" aria-hidden="true" />
            <span className="font-mono">{project.completionYear}</span>
          </div>
        </div>

        {/* Action Trigger Button */}
        <div className="mt-4 pt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(project);
            }}
            aria-label={`Open photography lightbox for ${project.title}`}
            className="inline-flex w-full items-center justify-center min-h-[44px] min-w-[44px] px-4 py-2 rounded-sm text-sm font-medium bg-travertine-100 group-hover:bg-navy-900 group-hover:text-travertine-50 text-navy-950 transition-colors duration-200 border border-travertine-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500"
          >
            <span>View Installation Gallery</span>
            <ArrowUpRight className="ml-1.5 w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
