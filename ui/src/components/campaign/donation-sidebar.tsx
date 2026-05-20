"use client";

import { useEffect, useState } from "react";
import { getRecentDonors, subscribeRecentDonors } from "@/lib/recent-donors";
import Link from "next/link";
import { IconShare3, IconHeartFilled, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import type { Campaign, Donor } from "@/types/campaign";
import { ShareModal } from "@/components/share/share-modal";
import { useLanguage } from "@/context/LanguageContext";

interface DonationSidebarProps {
  campaign: Campaign;
  donors: Donor[];
}

function CircularProgress({ percent }: { percent: number }) {
  const size = 84;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--color-surface-muted)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--color-primary-yellow)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-[16px] font-extrabold text-primary-navy leading-none tabular-nums">
          {percent}%
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-text-gray mt-0.5">
          funded
        </span>
      </div>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function DonorRow({ donor: d }: { donor: Donor }) {
  return (
    <li className="flex items-center gap-3">
      <div className="shrink-0 w-9 h-9 rounded-full bg-primary-yellow/30 flex items-center justify-center text-[12px] font-bold text-primary-navy">
        {d.isAnonymous ? "A" : getInitials(d.name)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-primary-navy truncate">
          {d.isAnonymous ? "Anonymous" : d.name}
        </p>
        <p className="text-[12px] text-text-gray">
          {d.currency}
          {d.amount.toLocaleString("en-US")}
          <span className="mx-1.5">·</span>
          {d.timeAgo}
        </p>
      </div>
    </li>
  );
}

export function DonationSidebar({ campaign, donors }: DonationSidebarProps) {
  const { t } = useLanguage();
  const [shareOpen, setShareOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [sortTop, setSortTop] = useState(false);

  // Pull in any donations made from this browser (via local cache) and
  // prepend them so the feed updates the moment someone donates.
  const [recentLocal, setRecentLocal] = useState<typeof donors>([]);
  useEffect(() => {
    const refresh = () => setRecentLocal(getRecentDonors());
    refresh();
    return subscribeRecentDonors(refresh);
  }, []);

  const mergedDonors = [...recentLocal, ...donors];
  const percent = Math.min(
    100,
    Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
  );
  const sorted = sortTop
    ? [...mergedDonors].sort((a, b) => b.amount - a.amount)
    : mergedDonors;

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/campaigns/${campaign.id}`
      : `/campaigns/${campaign.id}`;

  return (
    <>
      <aside className="bg-white border border-surface-muted rounded-3xl shadow-md p-6 md:p-7 space-y-6 lg:sticky lg:top-24">
        <div className="flex items-center gap-5">
          <CircularProgress percent={percent} />
          <div className="min-w-0">
            <p className="font-heading text-[26px] md:text-[30px] font-extrabold text-primary-navy leading-none">
              {campaign.currency}
              {campaign.raisedAmount.toLocaleString("en-US")}
            </p>
            <p className="mt-1.5 text-[13px] text-text-gray">
              raised of {campaign.currency}
              {campaign.goalAmount.toLocaleString("en-US")} goal
            </p>
            <p className="mt-2 text-[12px] font-semibold text-text-gray">
              {campaign.donationCount} donors
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href={`/checkout?campaign=${campaign.id}`}
            className="flex items-center justify-center w-full h-[52px] rounded-[100px] font-bold text-[16px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all"
          >
            {t("donatePlain")}
          </Link>
          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="flex items-center justify-center gap-2 w-full h-[52px] rounded-[100px] font-semibold text-[15px] border border-surface-muted bg-white text-primary-navy hover:bg-bg-off-white transition-all"
          >
            <IconShare3 size={18} />
            {t("share")}
          </button>
        </div>

        {mergedDonors.length > 0 && (
          <div className="border-t border-surface-muted pt-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading text-[15px] font-extrabold text-primary-navy">
                Recent Donors
              </h3>
              <span className="text-[12px] text-text-gray">{campaign.donationCount} total</span>
            </div>

            {/* Sort tabs */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setSortTop(false)}
                className={`inline-flex items-center gap-1 h-8 px-3 rounded-full text-[12px] font-semibold transition-all ${!sortTop ? "bg-primary-navy text-white" : "bg-bg-off-white text-text-gray hover:text-primary-navy"}`}
              >
                <IconChevronDown size={13} stroke={2} />
                Recent
              </button>
              <button
                type="button"
                onClick={() => setSortTop(true)}
                className={`inline-flex items-center gap-1 h-8 px-3 rounded-full text-[12px] font-semibold transition-all ${sortTop ? "bg-primary-navy text-white" : "bg-bg-off-white text-text-gray hover:text-primary-navy"}`}
              >
                <IconChevronUp size={13} stroke={2} />
                Top
              </button>
            </div>

            {showAll ? (
              <ul className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {sorted.map((d) => (
                  <DonorRow key={d.id} donor={d} />
                ))}
              </ul>
            ) : (
              <div
                className="relative h-[260px] overflow-hidden donor-marquee-mask"
                aria-label="Recent donors feed"
              >
                <ul
                  className="animate-donor-marquee space-y-3"
                  style={{
                    // animation duration grows with the number of items so the
                    // pace stays readable regardless of list length
                    animationDuration: `${Math.max(12, sorted.length * 2.4)}s`,
                  }}
                >
                  {[...sorted, ...sorted].map((d, idx) => (
                    <DonorRow key={`${d.id}-${idx}`} donor={d} />
                  ))}
                </ul>
              </div>
            )}

            {mergedDonors.length > 5 && (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="mt-4 w-full h-10 rounded-[100px] border border-surface-muted text-[13px] font-semibold text-primary-navy hover:bg-bg-off-white transition-all"
              >
                {showAll ? "Show less" : `See all ${mergedDonors.length} donors`}
              </button>
            )}
          </div>
        )}
      </aside>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        url={shareUrl}
        title={campaign.title}
        text={campaign.description}
      />
    </>
  );
}
