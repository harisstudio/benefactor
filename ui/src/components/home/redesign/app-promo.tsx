"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconSearch, IconHeartHandshake, IconShieldCheck } from "@tabler/icons-react";
import { allCampaigns } from "@/data/campaigns";
import type { Campaign } from "@/types/campaign";
import { useLanguage } from "@/context/LanguageContext";

function pctOf(c: Campaign) {
  return c.goalAmount ? Math.min(100, Math.round((c.raisedAmount / c.goalAmount) * 100)) : 0;
}
function money(c: Campaign, amount: number) {
  return `${c.currency}${amount.toLocaleString()}`;
}

// A realistic iPhone-style mockup: concentric rounded corners, a floating
// Dynamic Island, the white BeConnect wordmark in the app bar, a subtle 3D
// tilt, a gentle float, and a screen that cycles through campaigns. Tapping
// advances to the next campaign.
function PhoneMockup({
  campaign,
  onTap,
  tilt,
  roll,
  float,
  className = "",
}: {
  campaign: Campaign;
  onTap: () => void;
  tilt: number;
  roll: number;
  float: number;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onTap}
      aria-label="Next campaign"
      style={{ rotateY: tilt, rotateZ: roll, transformPerspective: 1800 }}
      animate={{ y: [0, -float, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      className={
        "w-[220px] sm:w-[248px] rounded-[44px] bg-[#0b0e16] p-[8px] cursor-pointer " +
        "shadow-[0_40px_70px_-24px_rgba(15,30,60,0.55)] ring-1 ring-black/15 " +
        "[box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.06)] " +
        className
      }
    >
      {/* Screen: inner radius = outer (44) - bezel (8) for concentric corners.
          translateZ(0) forces its own layer so the rounded corners always clip
          transformed/animated children (no square corners leaking on swap). */}
      <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[36px] bg-primary-navy [transform:translateZ(0)] [-webkit-mask-image:-webkit-radial-gradient(white,black)]">
        {/* Cycling screen */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={campaign.heroImage}
              alt={campaign.title}
              fill
              sizes="250px"
              style={{ objectPosition: campaign.imagePosition ?? "center" }}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />

            {/* Bottom info card */}
            <div className="absolute bottom-0 inset-x-0 z-20 p-3.5 text-left">
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-3.5">
                <p className="text-white font-heading font-extrabold text-[14px] leading-tight mb-2 line-clamp-2">
                  {campaign.title}
                </p>
                <div className="h-1.5 w-full rounded-full bg-white/25 overflow-hidden mb-1.5">
                  <motion.div
                    key={campaign.id + "-bar"}
                    initial={{ width: 0 }}
                    animate={{ width: `${pctOf(campaign)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-primary-yellow"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-white/80 mb-3">
                  <span className="font-bold text-white">{money(campaign, campaign.raisedAmount)}</span>
                  <span>of {money(campaign, campaign.goalAmount)}</span>
                </div>
                <div className="h-9 rounded-full bg-primary-yellow flex items-center justify-center text-primary-navy font-bold text-[13px]">
                  Donate
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Top status gradient for contrast (above the cycling screen) */}
        <div aria-hidden className="absolute top-0 inset-x-0 h-24 z-20 bg-gradient-to-b from-black/55 to-transparent pointer-events-none" />

        {/* Dynamic Island */}
        <div aria-hidden className="absolute top-2.5 left-1/2 -translate-x-1/2 z-40 h-[22px] w-[78px] rounded-full bg-black" />

        {/* App bar with the white BeConnect wordmark */}
        <div className="absolute top-[40px] inset-x-0 z-30 px-4 flex items-center pointer-events-none">
          <Image
            src="/assets/beconnect-logo-white.png"
            alt="BeConnect"
            width={120}
            height={40}
            className="h-[17px] w-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </motion.button>
  );
}

export function AppPromo() {
  const { t } = useLanguage();
  const n = allCampaigns.length;
  const [tick, setTick] = useState(0);

  // Auto-advance the phone screens so they feel alive.
  useEffect(() => {
    const id = setInterval(() => setTick((x) => x + 1), 5000);
    return () => clearInterval(id);
  }, []);

  const features = [
    { Icon: IconSearch, title: t("appPromoFeature1Title"), desc: t("appPromoFeature1Desc") },
    { Icon: IconHeartHandshake, title: t("appPromoFeature2Title"), desc: t("appPromoFeature2Desc") },
    { Icon: IconShieldCheck, title: t("appPromoFeature3Title"), desc: t("appPromoFeature3Desc") },
  ];

  return (
    <section className="relative overflow-hidden bg-bg-off-white border-y border-surface-muted">
      {/* Soft accents */}
      <div aria-hidden className="absolute -top-32 -right-24 w-[480px] h-[480px] rounded-full bg-primary-yellow/20 blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute -bottom-40 -left-32 w-[460px] h-[460px] rounded-full bg-primary-navy/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)] py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* App identity: iOS-style app icon + name + "mobile app" tag */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <div className="relative w-[72px] h-[72px] rounded-[20px] overflow-hidden shadow-[0_14px_34px_-10px_rgba(15,30,60,0.5)] ring-1 ring-black/5">
                <Image src="/assets/beconnect-app-icon-dark.png" alt="BeConnect app icon" fill sizes="72px" className="object-cover" />
                <div aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent" />
              </div>
              <Image
                src="/assets/beconnect-logo.png"
                alt="BeConnect"
                width={170}
                height={56}
                className="h-9 w-auto"
              />
            </div>

            <h2 className="font-heading text-[clamp(30px,4vw,46px)] font-extrabold text-primary-navy leading-[1.08] tracking-[-0.02em] mb-4">
              {t("appPromoTitle")}
            </h2>
            <p className="font-heading text-[clamp(17px,1.8vw,21px)] font-semibold text-primary-navy/80 mb-5">
              {t("appPromoTagline")}
            </p>
            <p className="text-[15px] text-text-gray leading-relaxed max-w-[500px] mx-auto lg:mx-0 mb-8">
              {t("appPromoLead")}
            </p>

            {/* Features */}
            <ul className="space-y-4 mb-9 max-w-[460px] mx-auto lg:mx-0 text-left">
              {features.map(({ Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-3.5">
                  <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-surface-muted shadow-sm text-primary-navy">
                    <Icon size={20} stroke={1.8} />
                  </span>
                  <div>
                    <p className="font-heading font-extrabold text-primary-navy text-[15px] leading-tight">{title}</p>
                    <p className="text-[13px] text-text-gray leading-snug">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Store badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a href="#" aria-label="Download on the App Store" className="transition-transform hover:scale-[1.03] active:scale-95">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/app-store-badge.svg" alt="Download on the App Store" className="h-[46px] w-auto" />
              </a>
              <a href="#" aria-label="Get it on Google Play" className="transition-transform hover:scale-[1.03] active:scale-95">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/google-play-badge.svg" alt="Get it on Google Play" className="h-[46px] w-auto" />
              </a>
            </div>
            <div className="mt-5 flex justify-center lg:justify-start">
              <span className="inline-flex items-center h-9 px-4 rounded-full bg-primary-yellow text-primary-navy text-[12px] font-bold uppercase tracking-[0.14em] shadow-sm">
                {t("appPromoBadge")}
              </span>
            </div>
          </motion.div>

          {/* Right: animated 3D phone mockups */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center"
            style={{ perspective: "1600px" }}
          >
            <div className="relative mx-auto h-[480px] w-[240px] sm:h-[560px] sm:w-[440px]">
              {/* Back phone */}
              <div className="absolute right-0 top-10 hidden sm:block opacity-95">
                <PhoneMockup campaign={allCampaigns[(tick + 2) % n]} onTap={() => setTick((x) => x + 1)} tilt={-6} roll={4} float={7} />
              </div>
              {/* Front phone */}
              <div className="absolute left-2.5 sm:left-12 top-0 z-10">
                <PhoneMockup campaign={allCampaigns[tick % n]} onTap={() => setTick((x) => x + 1)} tilt={-5} roll={-2} float={5} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
