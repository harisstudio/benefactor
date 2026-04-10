"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DetailGalleryProps {
  images: string[];
}

export function DetailGallery({ images }: DetailGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-bg-off-white">
      {/* Arrow buttons */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-colors"
        aria-label="Previous image"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-colors"
        aria-label="Next image"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Images */}
      <div className="aspect-video relative">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`Gallery image ${i + 1}`}
            fill
            className={cn(
              "object-cover transition-opacity duration-500",
              i === activeIndex ? "opacity-100" : "opacity-0"
            )}
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="w-11 h-11 flex items-center justify-center"
            aria-label={`Go to image ${i + 1}`}
          >
            <span
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                i === activeIndex ? "bg-white scale-110" : "bg-white/50"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
