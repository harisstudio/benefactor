"use client";

import { useRef } from "react";
import Link from "next/link";
import { FundraiserCard } from "./fundraiser-card";
import type { FundraiserCard as FundraiserCardType } from "@/types/fundraiser";

interface FeaturedFundraisersProps {
  fundraisers: FundraiserCardType[];
}

export function FeaturedFundraisers({ fundraisers }: FeaturedFundraisersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "prev" | "next") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth ?? 280;
    const gap = 24;
    const amount = direction === "next" ? cardWidth + gap : -(cardWidth + gap);
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-300 text-sm font-medium text-text-dark hover:bg-bg-off-white transition-colors min-h-[44px]">
            Nearby
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-primary-navy">
            Featured Fundraisers
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Link href="#" className="text-sm font-medium text-primary-navy hover:underline hidden sm:inline">
            View all
          </Link>
          <button
            onClick={() => scroll("prev")}
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-bg-off-white transition-colors min-w-[44px] min-h-[44px]"
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => scroll("next")}
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-bg-off-white transition-colors min-w-[44px] min-h-[44px]"
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable grid */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {fundraisers.map((f) => (
          <div key={f.id} className="flex-shrink-0 w-[280px] snap-start">
            <FundraiserCard fundraiser={f} />
          </div>
        ))}
      </div>
    </div>
  );
}
