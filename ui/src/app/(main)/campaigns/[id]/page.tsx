import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { IconPlayerPlayFilled, IconShare3 } from "@tabler/icons-react";
import { CampaignHeader } from "@/components/campaign/campaign-header";
import { CampaignHeroVideo } from "@/components/campaign/campaign-hero-video";
import { DetailGallery } from "@/components/campaign/detail-gallery";
import { CampaignStory } from "@/components/campaign/campaign-story";
import { DonationSidebar } from "@/components/campaign/donation-sidebar";
import { MobileRecentDonors } from "@/components/campaign/mobile-recent-donors";
import { getCampaign, getDonors } from "@/lib/api";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const campaign = await getCampaign(id);
  return {
    title: `${campaign.title} | Benefactor`,
    description: campaign.description,
  };
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const campaign = await getCampaign(id);
  const donors = await getDonors(id);

  return (
    <div className="bg-bg-off-white pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-8 lg:gap-12">
          {/* Left column */}
          <div className="space-y-8">
            <CampaignHeader
              title={campaign.title}
              category={campaign.category}
              location={campaign.country}
              createdAt={campaign.createdAt}
              verified
            />

            {/* Hero: an autoplaying video when the campaign has one, otherwise
                the static image. */}
            {campaign.heroVideo ? (
              <CampaignHeroVideo src={campaign.heroVideo} />
            ) : (
              <a
                href="https://www.youtube.com/watch?v=slFSnCxUS4E"
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-md"
              >
                <Image
                  src={campaign.heroImage}
                  alt={campaign.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  style={{ objectPosition: campaign.imagePosition ?? "center" }}
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                  <div className="w-[78px] h-[78px] rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <IconPlayerPlayFilled size={30} className="text-primary-navy ml-1" />
                  </div>
                </div>
              </a>
            )}

            {/* Gallery */}
            {campaign.galleryImages.length > 0 && (
              <DetailGallery images={campaign.galleryImages} />
            )}

            {/* Story */}
            <div className="bg-white border border-surface-muted rounded-3xl p-6 md:p-8 lg:p-10">
              <CampaignStory
                truncated={campaign.story.split("\n").filter(Boolean)[0] ?? campaign.description}
                full={campaign.story}
              />
            </div>

            {/* Organizer */}
            <div className="bg-white border border-surface-muted rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary-yellow/30 flex items-center justify-center font-heading text-[18px] font-extrabold text-primary-navy">
                  {campaign.organizer.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-text-gray font-semibold">
                    Organizer
                  </p>
                  <p className="font-heading text-[17px] font-extrabold text-primary-navy">
                    {campaign.organizer.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[100px] font-semibold text-[14px] border border-surface-muted bg-white text-primary-navy hover:bg-bg-off-white transition-all self-start sm:self-auto"
              >
                Contact
              </button>
            </div>

            {/* Mobile donate CTA (visible on small screens since sidebar is hidden) */}
            <div className="lg:hidden bg-white border border-surface-muted rounded-3xl p-6 shadow-md space-y-4">
              <div>
                <p className="font-heading text-[26px] font-extrabold text-primary-navy leading-none">
                  {campaign.currency}
                  {campaign.raisedAmount.toLocaleString("en-US")}
                </p>
                <p className="mt-1.5 text-[13px] text-text-gray">
                  raised of {campaign.currency}
                  {campaign.goalAmount.toLocaleString("en-US")} goal
                </p>
              </div>
              <div className="h-2.5 bg-surface-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-yellow rounded-full"
                  style={{
                    width: `${Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100))}%`,
                  }}
                />
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/checkout?campaign=${campaign.id}`}
                  className="flex-1 inline-flex items-center justify-center h-[52px] rounded-[100px] font-bold text-[16px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover transition-all"
                >
                  Donate
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 h-[52px] px-5 rounded-[100px] font-semibold text-[14px] border border-surface-muted bg-white text-primary-navy hover:bg-bg-off-white transition-all"
                  aria-label="Share"
                >
                  <IconShare3 size={18} />
                </button>
              </div>
            </div>

            {/* Mobile recent donors (sidebar is hidden on small screens) */}
            <MobileRecentDonors donors={donors} totalCount={campaign.donationCount} campaignId={campaign.id} />
          </div>

          {/* Right column sidebar */}
          <div className="hidden lg:block">
            <DonationSidebar campaign={campaign} donors={donors} />
          </div>
        </div>
      </div>
    </div>
  );
}
