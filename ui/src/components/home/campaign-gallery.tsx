"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CampaignGalleryProps {
  images: string[];
}

export function CampaignGallery({ images }: CampaignGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative rounded-md overflow-hidden bg-gray-100">
      {/* Arrow buttons */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm transition-colors"
        aria-label="Previous image"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm transition-colors"
        aria-label="Next image"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Images */}
      <div className="aspect-[16/10] relative">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`Gallery image ${i + 1}`}
            fill
            className={cn(
              "object-cover transition-opacity duration-300",
              i === activeIndex ? "opacity-100" : "opacity-0"
            )}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="w-11 h-11 flex items-center justify-center"
            aria-label={`Go to image ${i + 1}`}
          >
            <span
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                i === activeIndex ? "bg-white" : "bg-white/50"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
