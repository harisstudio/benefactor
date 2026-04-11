import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CampaignHeader } from "@/components/campaign/campaign-header";
import { DetailGallery } from "@/components/campaign/detail-gallery";
import { CampaignStory } from "@/components/campaign/campaign-story";
import { DonationSidebar } from "@/components/campaign/donation-sidebar";
import { RelatedFundraisers } from "@/components/campaign/related-fundraisers";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getCampaign, getDonors, getRelatedFundraisers } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const campaign = await getCampaign(id);
  return {
    title: `${campaign.title} — Benefactor`,
    description: campaign.description,
  };
}

const storyTruncated =
  "Winter is approaching in Lithuania, and for one family, the cold brings fear instead of comfort. This family is currently living in a home that is no longer safe or suitable for the harsh winter months. The house has serious structural problems, poor insulation, and damaged areas that make it difficult to stay warm. Without urgent repairs, the cold weather will turn everyday life into a real struggle. Despite their difficult situation, they are doing everything they can to survive. However, due to limited financial resources, they are unable to...";

const storyFull =
  "Winter is approaching in Lithuania, and for one family, the cold brings fear instead of comfort.\nThis family is currently living in a home that is no longer safe or suitable for the harsh winter months. The house has serious structural problems, poor insulation, and damaged areas that make it difficult to stay warm. Without urgent repairs, the cold weather will turn everyday life into a real struggle.\nDespite their difficult situation, they are doing everything they can to survive. However, due to limited financial resources, they are unable to cover the cost of essential renovations on their own. What they need is not luxury—only a basic, safe, and warm place to live. Our goal is to raise funds to:\nRepair damaged walls and floors\nEvery donation, no matter the size, will go directly toward the renovation of this home. Your support will help transform a cold, unsafe house into a warm and secure place where this family can live with dignity and peace.\nTogether, we can make sure that this family does not have to face the winter in unsafe conditions. Your kindness today can give them warmth, safety, and hope for the future.";

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const campaign = await getCampaign(id);
  const donors = await getDonors(id);
  const featuredFundraisers = await getRelatedFundraisers(id);
  const percent = Math.round(
    (campaign.raisedAmount / campaign.goalAmount) * 100
  );

  return (
    <div className="pt-10 pb-16">
      <div className="max-w-container mx-auto px-[clamp(20px,5vw,100px)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            <CampaignHeader title={campaign.title} />

            {/* Video thumbnail */}
            <div className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-4 bg-bg-off-white">
              <a
                href="https://www.youtube.com/watch?v=slFSnCxUS4E"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative w-full aspect-video bg-black group"
              >
                <Image
                  src={campaign.heroImage}
                  alt={campaign.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <div className="w-[80px] h-[80px] rounded-full bg-white/30 backdrop-blur-[4px] flex items-center justify-center hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-5 left-5">
                  <Image src="/assets/bf_white.svg" alt="Benefactor" width={80} height={24} />
                </div>
                <div className="absolute bottom-5 right-5">
                  <Image src="/assets/yt.svg" alt="YouTube" width={80} height={18} />
                </div>
              </a>
            </div>

            {/* Gallery */}
            <DetailGallery images={campaign.galleryImages} />

            {/* Story */}
            <CampaignStory truncated={storyTruncated} full={storyFull} />

            {/* Bottom stats bar */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-between mb-5">
                <div className="flex flex-col items-start text-left">
                  <span className="text-[18px] font-bold text-primary-navy">
                    {campaign.currency}{campaign.raisedAmount.toLocaleString()}
                  </span>
                  <span className="text-[14px] font-normal text-[#888]">
                    Raised
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-[18px] font-bold text-primary-navy">
                    {campaign.donationCount}
                  </span>
                  <span className="text-[14px] font-normal text-[#888]">
                    Donations
                  </span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className="text-[18px] font-bold text-primary-navy">
                    {campaign.currency}{campaign.goalAmount.toLocaleString()}
                  </span>
                  <span className="text-[14px] font-normal text-[#888]">
                    Purpose
                  </span>
                </div>
              </div>

              {/* Progress bar — matching homepage format */}
              <div className="w-full h-[14px] bg-[#eee] rounded-full overflow-hidden mb-2.5 relative">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-yellow to-[#FF6B00] relative overflow-hidden transition-all duration-500"
                  style={{ width: `${percent}%` }}
                >
                  <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-4 mt-6">
                <Link 
                  href="/checkout"
                  className="flex-1 inline-flex items-center justify-center h-[52px] rounded-btn font-bold text-[16px] bg-primary-yellow text-primary-navy shadow-[0_4px_14px_rgba(255,193,7,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,107,0,0.4)] transition-all"
                >
                  Donate
                </Link>
                <button className="flex-1 inline-flex items-center justify-center h-[52px] rounded-btn font-bold text-[16px] border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white transition-colors">
                  Share
                </button>
              </div>
              <style>{`
                @keyframes shimmer {
                  0% { left: -100%; }
                  100% { left: 100%; }
                }
              `}</style>
            </div>
          </div>

          {/* Right Column */}
          <div className="hidden lg:block">
            <DonationSidebar campaign={campaign} donors={donors} />
          </div>
        </div>

        {/* Related Fundraisers */}
        <div className="mt-16">
          <RelatedFundraisers fundraisers={featuredFundraisers} />
        </div>
      </div>
    </div>
  );
}
