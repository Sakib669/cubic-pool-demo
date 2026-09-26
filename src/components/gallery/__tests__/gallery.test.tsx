import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import {
  GalleryFilter,
  GalleryCard,
  GalleryLightbox,
  GalleryView,
} from "@/components/gallery";
import { mockGalleryProjects } from "@/lib/data/mock";
import { GalleryStyleSchema } from "@/types";

describe("Gallery & Lightbox Components (Spec 0005)", () => {
  const sampleProject = mockGalleryProjects[0]; // The Whitsunday Cliff Residence
  const singleImageProject = mockGalleryProjects[3]; // Vaucluse Harbour Lap Channel (1 image)
  const availableStyles = GalleryStyleSchema.options;

  describe("GalleryFilter Component (AC-2, AC-3)", () => {
    it("renders All Styles tab and each style chip with accessible markup", () => {
      const html = renderToStaticMarkup(
        <GalleryFilter
          styles={availableStyles}
          activeStyle={null}
          onSelectStyle={() => {}}
        />
      );

      expect(html).toContain("All Styles");
      expect(html).toContain('aria-pressed="true"');
      expect(html).toContain('data-style="all"');
      expect(html).toContain('aria-label="Pool design style filters"');

      availableStyles.forEach((style) => {
        expect(html).toContain(style);
        expect(html).toContain(`data-style="${style}"`);
      });
    });

    it("marks the selected style as aria-pressed=true", () => {
      const html = renderToStaticMarkup(
        <GalleryFilter
          styles={availableStyles}
          activeStyle="Infinity"
          onSelectStyle={() => {}}
        />
      );

      expect(html).toContain('data-style="Infinity"');
      // All Styles should not be pressed
      expect(html).toContain('data-style="all"');
      expect(html).toContain('aria-pressed="false" class="min-h-[44px] min-w-[44px] px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 focus-visible:ring-offset-2 bg-travertine-100 text-slate-700 hover:bg-travertine-200 border border-travertine-300">All Styles');
    });
  });

  describe("GalleryCard Component (AC-4, AC-5)", () => {
    it("renders cover photo, style badge, title, location, year, and photo count", () => {
      const html = renderToStaticMarkup(
        <GalleryCard project={sampleProject} onOpenLightbox={() => {}} />
      );

      expect(html).toContain(sampleProject.title);
      expect(html).toContain(sampleProject.location);
      expect(html).toContain(sampleProject.style);
      expect(html).toContain(`${sampleProject.completionYear}`);
      expect(html).toContain(`${sampleProject.images.length} Photos`);
      expect(html).toContain('alt="Infinity pool stretching toward the Coral Sea at Whitsunday Cliff Residence"');
      expect(html).toContain("View Installation Gallery");
    });
  });

  describe("GalleryLightbox Component (AC-5, AC-7, AC-8, AC-9, AC-10, AC-11)", () => {
    it("renders accessible modal with title, captions, photo counter, and close button when open", () => {
      const html = renderToStaticMarkup(
        <GalleryLightbox
          project={sampleProject}
          isOpen={true}
          onClose={() => {}}
          relatedProduct={{ slug: "azure-horizon-infinity", name: "Azure Horizon Infinity" }}
        />
      );

      expect(html).toContain('role="dialog"');
      expect(html).toContain('aria-modal="true"');
      expect(html).toContain('id="lightbox-project-title"');
      expect(html).toContain(sampleProject.title);
      expect(html).toContain(sampleProject.location);
      expect(html).toContain(`Completed ${sampleProject.completionYear}`);
      expect(html).toContain("Photo 1 of");
      expect(html).toContain("Close installation photography lightbox");

      // Features
      sampleProject.features.forEach((feat) => {
        expect(html).toContain(feat);
      });

      // Related product link referral (AC-10)
      expect(html).toContain('href="/products?product=azure-horizon-infinity"');
      expect(html).toContain("Explore Pool Specifications");
    });

    it("renders thumbnails when multiple images exist and hides them when only 1 image exists (AC-8)", () => {
      const multiHtml = renderToStaticMarkup(
        <GalleryLightbox
          project={sampleProject}
          isOpen={true}
          onClose={() => {}}
        />
      );
      expect(multiHtml).toContain('role="tablist"');
      expect(multiHtml).toContain('aria-label="Project photography thumbnails"');

      const singleHtml = renderToStaticMarkup(
        <GalleryLightbox
          project={singleImageProject}
          isOpen={true}
          onClose={() => {}}
        />
      );
      expect(singleHtml).not.toContain('role="tablist"');
    });

    it("renders null when isOpen=false or project=null", () => {
      const closedHtml = renderToStaticMarkup(
        <GalleryLightbox
          project={sampleProject}
          isOpen={false}
          onClose={() => {}}
        />
      );
      expect(closedHtml).toBe("");

      const nullHtml = renderToStaticMarkup(
        <GalleryLightbox
          project={null}
          isOpen={true}
          onClose={() => {}}
        />
      );
      expect(nullHtml).toBe("");
    });
  });

  describe("GalleryView Container (AC-1, AC-3, AC-5, AC-6, AC-12)", () => {
    it("renders all initial projects and style filter chips", () => {
      const html = renderToStaticMarkup(
        <GalleryView
          initialProjects={mockGalleryProjects}
          styles={availableStyles}
        />
      );

      expect(html).toContain("All Styles");
      expect(html).toContain(`Showing ${mockGalleryProjects.length} of ${mockGalleryProjects.length} installations`);
      mockGalleryProjects.forEach((proj) => {
        expect(html).toContain(proj.title);
      });
    });

    it("renders friendly empty state with reset button when no projects match", () => {
      const html = renderToStaticMarkup(
        <GalleryView
          initialProjects={[]}
          styles={availableStyles}
        />
      );

      expect(html).toContain("No Projects in this Design Style");
      expect(html).toContain("Reset to All Styles");
    });

    it("pre opens lightbox when initialProjectSlug is provided (AC-6)", () => {
      const html = renderToStaticMarkup(
        <GalleryView
          initialProjects={mockGalleryProjects}
          styles={availableStyles}
          initialProjectSlug="the-whitsunday-cliff-residence"
        />
      );

      expect(html).toContain("The Whitsunday Cliff Residence");
      expect(html).toContain("Close installation photography lightbox");
    });
  });

  describe("Gallery Page Surface (AC-1, AC-6)", () => {
    it("renders server gallery page with hero and installations grid", async () => {
      const { default: GalleryPage } = await import("@/app/gallery/page");
      const html = renderToStaticMarkup(
        await GalleryPage({
          searchParams: Promise.resolve({}),
        })
      );

      expect(html).toContain("Architectural Pool Gallery");
      expect(html).toContain("All Styles");
      expect(html).toContain("The Whitsunday Cliff Residence");
      expect(html).toContain("Toorak Minimalist Pavilion");
    });

    it("renders server gallery page with direct project lightbox pre-opened via searchParams (AC-6)", async () => {
      const { default: GalleryPage } = await import("@/app/gallery/page");
      const html = renderToStaticMarkup(
        await GalleryPage({
          searchParams: Promise.resolve({
            project: "toorak-minimalist-pavilion",
          }),
        })
      );

      expect(html).toContain("Toorak Minimalist Pavilion");
      expect(html).toContain("Close installation photography lightbox");
    });
  });
});
