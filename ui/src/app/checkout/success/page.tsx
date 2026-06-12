"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IconCheck, IconArrowLeft, IconHeartHandshake, IconShare3 } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { campaignsById, featuredCampaign } from "@/data/campaigns";

export default function CheckoutSuccessPage() {
  // useSearchParams needs a Suspense boundary so the page can prerender.
  return (
    <Suspense fallback={null}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

function CheckoutSuccessContent() {
  const { t } = useLanguage();
  // The checkout return_url carries ?campaign=id so the share + campaign
  // links here point back to the exact cause the donor supported.
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaign") ?? "";
  const campaign = campaignsById[campaignId] ?? featuredCampaign;
  const campaignUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/campaigns/${campaign.id}`
      : `/campaigns/${campaign.id}`;

  const handleShare = () => {
    if (typeof window === "undefined") return;
    if (navigator.share) {
      navigator
        .share({
          title: campaign.title,
          text: `${t("successShareText")} ${campaign.title}`,
          url: campaignUrl,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(campaignUrl);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-off-white flex flex-col">
      {/* Soft background accents */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-primary-yellow/20 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-emerald-200/30 blur-3xl pointer-events-none"
      />

      {/* Centered content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-5 py-8">
        <div className="max-w-[640px] w-full text-center">
          {/* Green check */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500 shadow-[0_12px_40px_-8px_rgba(16,185,129,0.55)] mb-7 animate-success-pop">
            <IconCheck size={52} className="text-white" stroke={3} />
          </div>

          {/* Thank you heading */}
          <h1 className="font-heading text-[clamp(32px,5vw,52px)] leading-[1.05] tracking-[-0.02em] font-extrabold text-primary-navy mb-4">
            {t("successHeading")}
          </h1>

          {/* Tagline */}
          <p className="font-heading italic text-[clamp(18px,2.2vw,24px)] text-emerald-700 font-semibold mb-5">
            {t("successTagline")}
          </p>

          {/* Body message */}
          <p className="text-[clamp(15px,1.5vw,17px)] text-text-gray leading-[1.65] max-w-[520px] mx-auto mb-10">
            {t("successBody")}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-1.5 h-[52px] px-7 rounded-[100px] font-bold text-[15px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all"
            >
              <IconArrowLeft size={17} />
              {t("successBackHome")}
            </Link>
            <Link
              href={campaignUrl}
              className="inline-flex items-center justify-center gap-1.5 h-[52px] px-6 rounded-[100px] font-semibold text-[14px] text-primary-navy bg-white border border-surface-muted hover:bg-bg-off-white transition-all"
            >
              <IconHeartHandshake size={17} />
              {t("successViewCampaign")}
            </Link>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-1.5 h-[52px] px-6 rounded-[100px] font-semibold text-[14px] text-primary-navy bg-white border border-surface-muted hover:bg-bg-off-white transition-all"
            >
              <IconShare3 size={17} />
              {t("successShare")}
            </button>
          </div>

          {/* Footer note */}
          <p className="text-[12px] text-text-gray/80">{t("successReceiptNote")}</p>
        </div>
      </div>
    </div>
  );
}
