import type { Metadata } from "next";
import { FullNavbar } from "@/components/layout/full-navbar";
import { GlobalFooter } from "@/components/layout/footer/index";
import { RedesignHero, HeroIntro } from "@/components/home/redesign/hero";
import { DimitriPart2 } from "@/components/home/redesign/dimitri-part2";
import { RedesignFeatured } from "@/components/home/redesign/featured";
import { RedesignHowAndTrust } from "@/components/home/redesign/how-and-trust";
import { RedesignUsefulLinks } from "@/components/home/redesign/useful-links";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Benefactor | World Wide Fundraising Platform",
  description:
    "Start your fundraiser in minutes. Raise money for yourself, a loved one, or a cause you believe in. Transparent, verified, and fee-free.",
};

export default function HomePage() {
  return (
    <>
      <FullNavbar alwaysShowLogo />
      <main>
        <RedesignHero />
        <DimitriPart2 />
        <RedesignFeatured />
        {/* On mobile the hero intro sits here, after the featured campaign.
            On desktop it lives inside the hero's left column, so this is hidden. */}
        <section className="lg:hidden bg-bg-off-white pb-4">
          <div className="max-w-[1600px] mx-auto px-5 sm:px-8 text-center">
            <HeroIntro />
          </div>
        </section>
        <RedesignHowAndTrust />
        <RedesignUsefulLinks />
      </main>
      <GlobalFooter />
    </>
  );
}
