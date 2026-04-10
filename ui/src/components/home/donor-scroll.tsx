"use client";

import type { Donor } from "@/types/campaign";

interface DonorScrollProps {
  donors: Donor[];
}

function DonorItem({ donor }: { donor: Donor }) {
  return (
    <div className="flex items-center py-4 border-b border-[#f5f5f5] last:border-b-0">
      {/* Heart icon in circular background */}
      <div className="w-10 h-10 rounded-full bg-[#FFFCF0] flex items-center justify-center mr-4 flex-shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="#FFC800" strokeWidth="2" className="w-5 h-5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </div>
      {/* Donor info */}
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-normal text-primary-navy mb-0.5 truncate">
          {donor.name}
        </div>
        <div className="flex items-center gap-1.5 text-[14px] text-[#666]">
          <span className="text-[17px] font-bold text-primary-navy">
            {donor.currency}{donor.amount}
          </span>
          <span className="font-normal text-[#666]">&middot;</span>
          <span className="text-[12px] font-normal text-[#666]">
            {donor.timeAgo}
          </span>
        </div>
      </div>
    </div>
  );
}

export function DonorScroll({ donors }: DonorScrollProps) {
  // Double the list for seamless loop
  const doubled = [...donors, ...donors];

  return (
    <div
      className="relative overflow-hidden max-h-[450px] group"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 90%, transparent 100%)",
      }}
    >
      <style>{`
        @keyframes scrollDonors {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
      <div className="animate-[scrollDonors_14s_linear_infinite] group-hover:[animation-play-state:paused]">
        {doubled.map((donor, i) => (
          <DonorItem key={`${donor.id}-${i}`} donor={donor} />
        ))}
      </div>
    </div>
  );
}
