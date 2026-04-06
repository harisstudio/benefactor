import type { Metadata } from "next";
import dynamic from "next/dynamic";

const CampaignWizard = dynamic(
  () => import("@/components/start/campaign-wizard").then((m) => m.CampaignWizard)
);

export const metadata: Metadata = {
  title: "Start a Benefactor — Create Your Fundraiser",
  description: "Start your fundraiser in minutes. Set your goal, tell your story, and share it with the world.",
};

export default function StartPage() {
  return <CampaignWizard />;
}
