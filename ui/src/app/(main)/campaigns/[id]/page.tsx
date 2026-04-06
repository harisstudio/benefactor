import type { Metadata } from "next";
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
    <div className="pt-20 pb-16">
      <div className="max-w-container mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            <CampaignHeader title={campaign.title} />

            {/* Video thumbnail */}
            <a
              href="https://www.youtube.com/watch?v=slFSnCxUS4E"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative rounded-md overflow-hidden group"
            >
              <Image
                src={campaign.heroImage}
                alt={campaign.title}
                width={800}
                height={450}
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="#0E3347" className="w-6 h-6 ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-3 left-3">
                <Image src="/assets/bf_white.svg" alt="Benefactor" width={80} height={24} />
              </div>
              <div className="absolute bottom-3 right-3">
                <Image src="/assets/yt.svg" alt="YouTube" width={80} height={18} />
              </div>
            </a>

            {/* Gallery */}
            <DetailGallery images={campaign.galleryImages} />

            {/* Story */}
            <CampaignStory truncated={storyTruncated} full={storyFull} />

            {/* Bottom stats bar */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex gap-6 text-sm">
                <span className="font-bold text-primary-navy">
                  {campaign.currency}16,200 Raised
                </span>
                <span className="font-bold text-primary-navy">
                  299 Donations
                </span>
                <span className="font-bold text-primary-navy">
                  {campaign.currency}19,200 Purpose
                </span>
              </div>
              <ProgressBar percent={percent} />
              <div className="flex gap-3">
                <button className="flex-1 h-11 rounded-btn font-bold bg-[#FF8C00] text-white hover:brightness-110 transition-all">
                  Donate
                </button>
                <button className="flex-1 h-11 rounded-btn font-bold border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white transition-colors">
                  Share
                </button>
              </div>
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
