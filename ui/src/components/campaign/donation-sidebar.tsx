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
    <div className="bg-white border border-[#eee] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 space-y-6 lg:sticky lg:top-24">
      {/* Progress circle + amount */}
      <div className="flex items-center gap-5">
        <ProgressCircle percent={percent} size={84} strokeWidth={4} />
        <div className="space-y-1">
          <span className="block text-xl font-bold text-primary-navy leading-tight">
            {campaign.currency}{campaign.raisedAmount.toLocaleString()}
          </span>
          <span className="block text-[14px] text-[#888] font-medium">
            raised of {campaign.currency}{campaign.goalAmount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Stats brief */}
      <div className="flex items-center gap-2 border-t border-[#f5f5f5] pt-5">
        <span className="text-[15px] font-bold text-primary-navy">{campaign.donationCount}</span>
        <span className="text-[14px] text-[#666]">Donations</span>
      </div>

      {/* CTA buttons */}
      <div className="space-y-3">
        <Link
          href="/checkout"
          className="flex items-center justify-center w-full h-[52px] rounded-btn font-bold text-[16px] bg-primary-yellow text-primary-navy shadow-[0_4px_14px_rgba(255,193,7,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,107,0,0.4)] transition-all"
        >
          Donate now
        </Link>
        <button className="flex items-center justify-center w-full h-[52px] rounded-btn font-bold text-[16px] border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white transition-all">
          Share
        </button>
      </div>

      {/* Donor list header */}
      <div className="border-t border-[#f5f5f5] pt-5 pb-1">
        <h3 className="text-[16px] font-bold text-primary-navy mb-4">Recent Donors</h3>
        <DonorScroll donors={donors} />
      </div>
    </div>
  );
}
