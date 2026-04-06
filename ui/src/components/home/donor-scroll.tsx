"use client";

import type { Donor } from "@/types/campaign";

interface DonorScrollProps {
  donors: Donor[];
}

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#FFC800" strokeWidth="2" className="w-5 h-5 flex-shrink-0">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

function DonorItem({ donor }: { donor: Donor }) {
  return (
    <div className="flex items-center gap-3 py-3 px-1">
      <HeartIcon />
      <div className="min-w-0">
        <div className="text-sm font-semibold text-text-dark truncate">
          {donor.name}
        </div>
        <div className="text-xs text-text-gray">
          <span className="font-semibold">{donor.currency}{donor.amount}</span>
          <span className="mx-1">&middot;</span>
          <span>{donor.timeAgo}</span>
        </div>
      </div>
    </div>
  );
}

export function DonorScroll({ donors }: DonorScrollProps) {
  // Triple the list for seamless loop
  const tripled = [...donors, ...donors, ...donors];

  return (
    <div className="relative overflow-hidden h-[320px] group">
      <style>{`
        @keyframes scrollDonors {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.333%); }
        }
      `}</style>
      <div
        className="animate-[scrollDonors_25s_linear_infinite] group-hover:[animation-play-state:paused]"
      >
        {tripled.map((donor, i) => (
          <DonorItem key={`${donor.id}-${i}`} donor={donor} />
        ))}
      </div>
    </div>
  );
}
