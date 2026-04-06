import Image from "next/image";
import Link from "next/link";
import { ProgressBar } from "@/components/ui/progress-bar";
import { CampaignGallery } from "./campaign-gallery";
import { DonorScroll } from "./donor-scroll";
import { getFeaturedCampaign, getDonors } from "@/lib/api";

export async function CampaignDiscovery() {
  const campaign = await getFeaturedCampaign();
  const donors = await getDonors(campaign.id);
  const progressPercent = Math.round(
    (campaign.raisedAmount / campaign.goalAmount) * 100
  );

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-container mx-auto px-5">
        <h2 className="text-xl md:text-2xl font-bold text-primary-navy text-center mb-10">
          Fundraising on Benefactor is easy, powerful, and trusted
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* Left: Media + Stats */}
          <div className="space-y-4">
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
              <div className="absolute bottom-3 right-3">
                <Image src="/assets/yt.svg" alt="YouTube" width={80} height={18} />
              </div>
            </a>

            {/* Gallery */}
            <CampaignGallery images={campaign.galleryImages} />

            {/* Stats + Progress + CTAs */}
            <div className="space-y-4">
              <div className="flex items-center gap-6 md:gap-10">
                <div>
                  <span className="block text-lg font-bold text-primary-navy">
                    {campaign.currency}
                    {campaign.raisedAmount.toLocaleString()}
                  </span>
                  <span className="text-xs text-text-gray">Raised</span>
                </div>
                <div>
                  <span className="block text-lg font-bold text-primary-navy">
                    {campaign.donationCount}
                  </span>
                  <span className="text-xs text-text-gray">Donations</span>
                </div>
                <div>
                  <span className="block text-lg font-bold text-primary-navy">
                    {campaign.currency}
                    {campaign.goalAmount.toLocaleString()}
                  </span>
                  <span className="text-xs text-text-gray">Purpose</span>
                </div>
              </div>

              <ProgressBar percent={progressPercent} />

              <div className="flex gap-3">
                <Link
                  href="/campaigns/1"
                  className="flex-1 inline-flex items-center justify-center h-12 rounded-btn font-bold bg-primary-yellow text-primary-navy shadow-[0_4px_14px_rgba(255,193,7,0.3)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(255,107,0,0.4)] transition-all"
                >
                  Donate
                </Link>
                <button className="flex-1 inline-flex items-center justify-center h-12 rounded-btn font-bold border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white transition-colors">
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Right: Description + Donors */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-primary-navy mb-3">
                {campaign.title}
              </h2>
              <p className="text-sm text-text-gray leading-relaxed">
                {campaign.description}
              </p>
              <p className="mt-3 text-sm text-text-gray leading-relaxed">
                {campaign.story}
              </p>
            </div>

            <DonorScroll donors={donors} />
          </div>
        </div>
      </div>
    </section>
  );
}
