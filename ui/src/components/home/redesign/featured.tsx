"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconShare3, IconUsers, IconTarget } from "@tabler/icons-react";
import { featuredCampaign } from "@/data/campaigns";
import { ShareModal } from "@/components/share/share-modal";
import { CircularProgress } from "@/components/ui/progress-bar";
import { Amount } from "@/components/ui/amount";
import { useLanguage } from "@/context/LanguageContext";

export function RedesignFeatured() {
  const { t } = useLanguage();
  const [shareOpen, setShareOpen] = useState(false);
  const c = featuredCampaign;
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/campaigns/${c.id}`
      : `/campaigns/${c.id}`;
  const pct = Math.min(100, Math.round((c.raisedAmount / c.goalAmount) * 100));

  return (
    <section className="bg-bg-off-white py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)]">
        <div className="flex items-end justify-between gap-4 mb-8 md:mb-12">
          <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-extrabold text-primary-navy tracking-[-0.01em]">
            {t("featuredHeading")}
          </h2>
          <Link
            href="/campaigns/1"
            className="hidden sm:inline-flex text-sm font-semibold text-primary-navy hover:underline"
          >
            {t("featuredViewAll")}
          </Link>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid lg:grid-cols-[1.15fr_1fr] bg-white rounded-3xl border border-surface-muted shadow-md overflow-hidden"
        >
          {/* Image */}
          <Link
            href={`/campaigns/${c.id}`}
            aria-label={c.title}
            className="group relative aspect-[16/10] lg:aspect-auto lg:min-h-[460px] block overflow-hidden"
          >
            <Image
              src={c.heroImage}
              alt={c.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <span className="absolute top-4 left-4 inline-flex items-center bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-primary-navy">
              {c.category}
            </span>
          </Link>

          {/* Body */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col">
            <Link href={`/campaigns/${c.id}`} className="inline-block">
              <h3 className="font-heading text-[clamp(22px,2vw,30px)] font-extrabold text-primary-navy leading-tight tracking-[-0.01em] mb-3 hover:underline decoration-2 underline-offset-4">
                {c.title}
              </h3>
            </Link>
            <p className="text-[15px] text-text-gray leading-relaxed mb-7 line-clamp-3">
              {c.description}
            </p>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                <Amount
                  amount={c.raisedAmount}
                  currency={c.currency}
                  showSecondary
                  className="text-[22px] sm:text-[26px] font-extrabold text-primary-navy"
                  secondaryClassName="ml-2 text-[13px] font-medium text-text-gray"
                />
                <span className="text-[13px] text-text-gray font-medium inline-flex items-baseline gap-1">
                  {t("featuredRaisedOf", { total: "" })}
                  <Amount amount={c.goalAmount} currency={c.currency} />
                </span>
              </div>
              <div className="h-2.5 bg-surface-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  className="h-full bg-primary-yellow rounded-full"
                />
              </div>
              <p className="mt-2 text-[12px] font-semibold text-primary-navy">{t("featuredPctFunded", { pct })}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-7">
              <div className="rounded-xl bg-bg-off-white border border-surface-muted p-3 text-center">
                <p className="text-[11px] uppercase tracking-wider text-text-gray font-semibold mb-1">{t("featuredStatRaised")}</p>
                <Amount amount={c.raisedAmount} currency={c.currency} className="text-[15px] font-extrabold text-primary-navy" />
              </div>
              <div className="rounded-xl bg-bg-off-white border border-surface-muted p-3 text-center">
                <p className="text-[11px] uppercase tracking-wider text-text-gray font-semibold mb-1 flex items-center justify-center gap-1">
                  <IconUsers size={11} /> {t("featuredStatDonors")}
                </p>
                <p className="text-[15px] font-extrabold text-primary-navy">{c.donationCount}</p>
              </div>
              <div className="rounded-xl bg-bg-off-white border border-surface-muted p-3 text-center">
                <p className="text-[11px] uppercase tracking-wider text-text-gray font-semibold mb-1 flex items-center justify-center gap-1">
                  <IconTarget size={11} /> {t("featuredStatGoal")}
                </p>
                <Amount amount={c.goalAmount} currency={c.currency} className="text-[15px] font-extrabold text-primary-navy" />
              </div>
            </div>

            <div className="flex gap-3 mt-auto">
              <Link
                href={`/checkout?campaign=${c.id}`}
                className="flex-1 inline-flex items-center justify-center h-[52px] px-6 rounded-[100px] font-bold text-[15px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all"
              >
                {t("donatePlain")}
              </Link>
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className="inline-flex items-center justify-center gap-2 h-[52px] px-5 rounded-[100px] font-semibold text-[14px] border border-surface-muted bg-white text-primary-navy hover:bg-bg-off-white transition-all"
                aria-label={t("featuredShareAria")}
              >
                <IconShare3 size={18} />
                {t("share")}
              </button>
            </div>
          </div>
        </motion.article>
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        url={shareUrl}
        title={c.title}
        text={c.description}
      />
    </section>
  );
}
