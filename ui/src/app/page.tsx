import type { Metadata } from "next";
import { FullNavbar } from "@/components/layout/full-navbar";
import { GlobalFooter } from "@/components/layout/footer/index";
import { RedesignHero } from "@/components/home/redesign/hero";
import { AppPromo } from "@/components/home/redesign/app-promo";
import { DimitriPart2 } from "@/components/home/redesign/dimitri-part2";
import { RedesignLogoShowcase } from "@/components/home/redesign/logo-showcase";
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
        <AppPromo />
        <DimitriPart2 />
        <RedesignFeatured />
        <RedesignLogoShowcase />
        <RedesignHowAndTrust />
        <RedesignUsefulLinks />
      </main>
      <GlobalFooter />
    </>
  );
}
