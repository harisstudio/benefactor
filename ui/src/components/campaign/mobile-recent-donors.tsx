"use client";

import { useEffect, useState } from "react";
import type { Donor } from "@/types/campaign";
import { getRecentDonors, subscribeRecentDonors } from "@/lib/recent-donors";

interface Props {
  donors: Donor[];
  totalCount: number;
}

export function MobileRecentDonors({ donors, totalCount }: Props) {
  const [recentLocal, setRecentLocal] = useState<Donor[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const refresh = () => setRecentLocal(getRecentDonors());
    refresh();
    return subscribeRecentDonors(refresh);
  }, []);

  const merged = [...recentLocal, ...donors];
  const visible = showAll ? merged : merged.slice(0, 5);

  if (merged.length === 0) return null;

  return (
    <div className="lg:hidden bg-white border border-surface-muted rounded-3xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-[16px] font-extrabold text-primary-navy">
          Recent Donors
        </h3>
        <span className="text-[12px] text-text-gray">{totalCount} total</span>
      </div>

      <ul className="space-y-3">
        {visible.map((d) => (
          <li key={d.id} className="flex items-center justify-between gap-3 py-1">
            <div className="flex items-center gap-3 min-w-0">
              <span
                aria-hidden
                className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary-yellow/20 text-primary-navy text-[13px] font-bold"
              >
                {(d.isAnonymous ? "A" : d.name.charAt(0) || "A").toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-primary-navy truncate">
                  {d.isAnonymous ? "Anonymous" : d.name}
                </p>
                <p className="text-[11px] text-text-gray">{d.timeAgo}</p>
              </div>
            </div>
            <span className="shrink-0 text-[13px] font-bold text-primary-navy tabular-nums">
              {d.currency === "GBP" ? "£" : d.currency === "USD" ? "$" : "€"}
              {Math.round(d.amount).toLocaleString("en-US")}
            </span>
          </li>
        ))}
      </ul>

      {merged.length > 5 && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="mt-4 w-full h-10 rounded-[100px] border border-surface-muted text-[13px] font-semibold text-primary-navy hover:bg-bg-off-white transition-all"
        >
          {showAll ? "Show less" : `See all ${merged.length} donors`}
        </button>
      )}
    </div>
  );
}
