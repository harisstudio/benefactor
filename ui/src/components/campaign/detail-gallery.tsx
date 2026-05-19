"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronLeft, IconChevronRight, IconMaximize, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface DetailGalleryProps {
  images: string[];
}

export function DetailGallery({ images }: DetailGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <>
      <div className="relative rounded-3xl overflow-hidden border border-surface-muted shadow-md bg-bg-off-white group">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur hover:bg-white text-primary-navy flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <IconChevronLeft size={20} stroke={2} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur hover:bg-white text-primary-navy flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <IconChevronRight size={20} stroke={2} />
        </button>

        <button
          type="button"
          onClick={() => setLightbox(true)}
          aria-label="Open fullscreen"
          className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-white/90 backdrop-blur hover:bg-white text-primary-navy text-[12px] font-semibold shadow-md transition-colors"
        >
          <IconMaximize size={14} stroke={1.8} />
          View
        </button>

        <div className="aspect-[16/10] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={images[activeIndex]}
                alt={`Gallery image ${activeIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority={activeIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 right-4 z-10 h-8 px-3 rounded-full bg-primary-navy/80 text-white text-[12px] font-bold flex items-center tabular-nums">
            {activeIndex + 1} / {images.length}
          </div>
        </div>

        {images.length > 1 && (
          <div className="bg-white border-t border-surface-muted p-3 flex gap-2 overflow-x-auto">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Show image ${i + 1}`}
                className={cn(
                  "relative flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden transition-all",
                  i === activeIndex
                    ? "ring-2 ring-primary-navy ring-offset-2 ring-offset-white"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1000] bg-primary-navy/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightbox(false)}
          >
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Close"
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            >
              <IconX size={20} stroke={1.8} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              className="absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            >
              <IconChevronLeft size={24} stroke={2} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              className="absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            >
              <IconChevronRight size={24} stroke={2} />
            </button>
            <div
              className="relative w-full max-w-[1200px] aspect-[16/10]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex]}
                alt={`Gallery image ${activeIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
