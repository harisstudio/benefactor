"use client";

import { useRef } from "react";
import { FundraiserCard } from "@/components/home/fundraiser-card";
import type { FundraiserCard as FundraiserCardType } from "@/types/fundraiser";

interface RelatedFundraisersProps {
  fundraisers: FundraiserCardType[];
}

export function RelatedFundraisers({ fundraisers }: RelatedFundraisersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "prev" | "next") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth ?? 280;
    const amount = direction === "next" ? cardWidth + 24 : -(cardWidth + 24);
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary-navy">
          Related Fundraisers
        </h2>
        <div className="flex gap-2">
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

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
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
