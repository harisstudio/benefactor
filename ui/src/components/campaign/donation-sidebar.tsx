import Link from "next/link";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { DonorScroll } from "@/components/home/donor-scroll";
import type { Campaign, Donor } from "@/types/campaign";

interface DonationSidebarProps {
  campaign: Campaign;
  donors: Donor[];
}

export function DonationSidebar({ campaign, donors }: DonationSidebarProps) {
  const percent = Math.round(
    (campaign.raisedAmount / campaign.goalAmount) * 100
  );

  return (
    <div className="bg-white rounded-md shadow-md p-6 space-y-5 lg:sticky lg:top-24">
      {/* Progress circle + amount */}
      <div className="flex items-center gap-4">
        <ProgressCircle percent={percent} size={72} strokeWidth={3} />
        <div>
          <span className="block text-lg font-bold text-primary-navy">
            {campaign.currency}
            {campaign.raisedAmount.toLocaleString()} raised
          </span>
          <span className="block text-sm text-text-gray">
            {campaign.donationCount} donations
          </span>
        </div>
      </div>

      {/* CTA buttons */}
      <Link
        href="/checkout"
        className="flex items-center justify-center w-full h-12 rounded-btn font-bold bg-[#FF8C00] text-white hover:brightness-110 transition-all"
      >
        Donate now
      </Link>
      <button className="flex items-center justify-center w-full h-12 rounded-btn font-bold border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white transition-colors">
        Share
      </button>

      {/* Donor list */}
      <DonorScroll donors={donors} />
    </div>
  );
}
