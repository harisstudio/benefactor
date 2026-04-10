import Image from "next/image";
import Link from "next/link";
import { ProgressBar } from "@/components/ui/progress-bar";
import { CampaignGallery } from "./campaign-gallery";
import { DiscoveryDonors } from "./discovery-donors";
import { getFeaturedCampaign, getDonors } from "@/lib/api";
import { TranslatedText } from "@/components/ui/translated-text";

export async function CampaignDiscovery() {
  const campaign = await getFeaturedCampaign();
  const donors = await getDonors(campaign.id);
  const progressPercent = Math.round(
    (campaign.raisedAmount / campaign.goalAmount) * 100
  );

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-container mx-auto px-[clamp(20px,5vw,100px)]">
        {/* Section heading */}
        <h2 className="text-[clamp(20px,2.5vw,32px)] font-bold text-primary-navy text-center mb-8 md:mb-12 leading-tight">
          <TranslatedText tKey="trustedHeading" fallback="Fundraising on Benefactor is easy, powerful, and trusted" />
        </h2>

        {/* Two-column grid — 1.6fr / 1fr like original */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 lg:gap-10 items-stretch">

          {/* ─── LEFT COLUMN: Media + Stats + CTAs ─── */}
          <div className="flex flex-col justify-between">
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
                {/* Play button */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <div className="w-[80px] h-[80px] rounded-full bg-white/30 backdrop-blur-[4px] flex items-center justify-center hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* YouTube logo */}
                <div className="absolute bottom-5 right-5">
                  <Image src="/assets/yt.svg" alt="YouTube" width={80} height={18} />
                </div>
              </a>
            </div>

            {/* Gallery slider */}
            <div className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-4 bg-bg-off-white">
              <CampaignGallery images={campaign.galleryImages} />
            </div>

            {/* Stats row + Progress + Buttons */}
            <div className="px-2 -mt-2">
              {/* Stats row — spread evenly, first left-aligned, mid center, last right-aligned */}
              <div className="flex justify-between mb-5">
                <div className="flex flex-col items-start text-left">
                  <span className="text-[18px] font-bold text-primary-navy">
                    {campaign.currency}{campaign.raisedAmount.toLocaleString()}
                  </span>
                  <span className="text-[14px] font-normal text-[#888]">
                    <TranslatedText tKey="raised" fallback="Raised" />
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-[18px] font-bold text-primary-navy">
                    {campaign.donationCount}
                  </span>
                  <span className="text-[14px] font-normal text-[#888]">
                    <TranslatedText tKey="donations" fallback="Donations" />
                  </span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className="text-[18px] font-bold text-primary-navy">
                    {campaign.currency}{campaign.goalAmount.toLocaleString()}
                  </span>
                  <span className="text-[14px] font-normal text-[#888]">
                    <TranslatedText tKey="purpose" fallback="Purpose" />
                  </span>
                </div>
              </div>

              {/* Progress bar — taller, with shimmer */}
              <div className="w-full h-[14px] bg-[#eee] rounded-full overflow-hidden mb-2.5 relative">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-yellow to-[#FF6B00] relative overflow-hidden transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-4 mt-4">
                <Link
                  href="/campaigns/1"
                  className="flex-1 inline-flex items-center justify-center h-[52px] rounded-btn font-bold text-[16px] bg-primary-yellow text-primary-navy shadow-[0_4px_14px_rgba(255,193,7,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,107,0,0.4)] transition-all"
                >
                  <TranslatedText tKey="donatePlain" fallback="Donate" />
                </Link>
                <button className="flex-1 inline-flex items-center justify-center h-[52px] rounded-btn font-bold text-[16px] border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white transition-colors">
                  <TranslatedText tKey="share" fallback="Share" />
                </button>
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Description + Donors ─── */}
          <div className="flex flex-col justify-between">
            {/* Campaign description */}
            <div className="flex flex-col">
              <h2 className="text-[clamp(22px,2vw,32px)] font-bold text-primary-navy leading-[1.2] mb-5">
                {campaign.title}
              </h2>
              <p className="text-[16px] leading-[1.6] text-[#444] font-medium mb-4">
                {campaign.description}
              </p>
              <p className="text-[16px] leading-[1.6] text-[#444] font-medium mb-4">
                {campaign.story}
              </p>
              <p className="mt-auto">
                <span className="text-primary-navy font-bold underline cursor-pointer hover:text-[#FF6B00] transition-colors">
                  <TranslatedText tKey="readMore" fallback="Read more" />
                </span>
              </p>
            </div>

            {/* Donors card */}
            <DiscoveryDonors donors={donors} />
          </div>
        </div>
      </div>

      {/* Shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </section>
  );
}
