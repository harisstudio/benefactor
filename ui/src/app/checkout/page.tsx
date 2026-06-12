import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { CheckoutFooterTagline } from "@/components/checkout/checkout-footer-tagline";
import { campaignsById, featuredCampaign } from "@/data/campaigns";

const CheckoutCard = dynamic(
  () =>
    import("@/components/checkout/checkout-card").then((m) => m.CheckoutCard)
);

export const metadata: Metadata = {
  title: "Checkout | Benefactor",
  description: "Complete your donation securely on Benefactor.",
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ campaign?: string }>;
}) {
  // Resolve the campaign from the ?campaign=id link so the checkout header
  // reflects whichever cause the donor came from, not a fixed one.
  const { campaign: campaignId } = await searchParams;
  const campaign =
    (campaignId && campaignsById[campaignId]) || featuredCampaign;

  return (
    <>
      <div className="bg-bg-off-white py-8 md:py-14 min-h-[calc(100vh_-_200px)]">
        <div className="max-w-[680px] mx-auto px-4 md:px-5">
          <CheckoutCard campaign={campaign} />
        </div>
      </div>

      <div className="text-center py-10 px-5 bg-bg-off-white">
        <Link href="/" className="inline-flex">
          <Image
            src="/assets/logo.svg"
            alt="Benefactor"
            width={140}
            height={28}
            className="h-auto w-[120px] mx-auto mb-2"
          />
        </Link>
        <CheckoutFooterTagline />
      </div>
    </>
  );
}
