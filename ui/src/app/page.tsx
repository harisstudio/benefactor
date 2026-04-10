import type { Metadata } from "next";
import { FullNavbar } from "@/components/layout/full-navbar";
import { GlobalFooter } from "@/components/layout/footer/index";
import { HeroSection } from "@/components/home/hero-section";
import { CampaignDiscovery } from "@/components/home/campaign-discovery";
import { TopicFilter } from "@/components/home/topic-filter";
import { FeaturedFundraisers } from "@/components/home/featured-fundraisers";
import { getFeaturedFundraisers, getTopicLabels, getTopicCards } from "@/lib/api";

export const metadata: Metadata = {
  title: "Benefactor — World Wide Fundraising Platform",
  description:
    "Start your fundraiser in minutes. Raise money for yourself, a loved one, or a charity. Trusted by millions worldwide.",
};

export default async function HomePage() {
  const [featuredFundraisers, topicLabels, topicCards] = await Promise.all([
    getFeaturedFundraisers(),
    getTopicLabels(),
    getTopicCards(),
  ]);
  return (
    <>
      <FullNavbar />

      {/* SVG clip path for heart shapes */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="heartPath" clipPathUnits="objectBoundingBox">
            <path d="M0.5,0.95 L0.44,0.89 C0.2,0.67 0.05,0.53 0.05,0.37 C0.05,0.23 0.15,0.13 0.28,0.13 C0.36,0.13 0.44,0.17 0.5,0.23 C0.56,0.17 0.64,0.13 0.72,0.13 C0.85,0.13 0.95,0.23 0.95,0.37 C0.95,0.53 0.8,0.67 0.56,0.89 L0.5,0.95 Z" />
          </clipPath>
        </defs>
      </svg>

      <main>
        <HeroSection />
        <CampaignDiscovery />

        {/* Topics + Featured Fundraisers */}
        <section className="bg-bg-off-white py-12 md:py-20">
          <div className="max-w-container mx-auto px-[clamp(20px,5vw,100px)] space-y-16">
            <TopicFilter labels={topicLabels} cards={topicCards} />
            <FeaturedFundraisers fundraisers={featuredFundraisers} />
          </div>
        </section>
      </main>

      <GlobalFooter />

    </>
  );
}
