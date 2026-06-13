"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IconCircleCheck,
  IconShieldCheck,
  IconBuildingBank,
  IconArrowRight,
  IconVolume,
  IconVolumeOff,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export function RedesignHero() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const trustRows = [
    { Icon: IconCircleCheck, text: t("heroFeeFree") },
    { Icon: IconShieldCheck, text: t("heroReviewed") },
    { Icon: IconBuildingBank, text: t("heroWithdraw") },
  ];

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <section className="relative overflow-hidden bg-bg-off-white">
      {/* Soft background accents */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-primary-yellow/20 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-primary-navy/5 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)] pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="grid gap-10 lg:gap-12 xl:gap-16 lg:grid-cols-[1fr_1.5fr] items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <h1 className="font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-0.02em] text-primary-navy font-extrabold mb-5">
              {t("heroTitle1")}
              <br />
              <span className="italic font-bold">{t("heroTitle2")}</span>
              <br />
              <span className="italic font-bold">{t("heroTitle3")}</span>
            </h1>

            <p className="text-[clamp(15px,1.3vw,18px)] text-text-gray leading-[1.6] max-w-[500px] mx-auto lg:mx-0 mb-8">
              {t("heroSubtitle")}
            </p>

            <ul className="space-y-2.5 mb-9 max-w-[460px] mx-auto lg:mx-0">
              {trustRows.map(({ Icon, text }, i) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
                  className="flex items-center gap-3 text-[14px] text-text-dark"
                >
                  <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-yellow/20">
                    <Icon size={15} className="text-primary-navy" stroke={2} />
                  </span>
                  {text}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start items-center">
              <Link
                href="/start"
                className="inline-flex items-center justify-center h-[52px] px-7 rounded-[100px] font-bold text-[15px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all"
              >
                {t("startBenefactor")}
              </Link>
              <Link
                href="/how"
                className="inline-flex items-center gap-1.5 h-[52px] px-5 rounded-[100px] font-semibold text-[14px] text-primary-navy bg-white border border-surface-muted hover:bg-bg-off-white hover:gap-2.5 transition-all"
              >
                {t("fundraiseHow")}
                <IconArrowRight size={17} />
              </Link>
            </div>
          </motion.div>

          {/* Right column — video card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="w-full mx-auto order-1 lg:order-2"
          >
            <div className="relative rounded-[28px] border border-surface-muted shadow-xl overflow-hidden bg-primary-navy">
              {/* Header bar */}
              <div className="absolute top-0 inset-x-0 z-10 flex items-start justify-between p-4 sm:p-5 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none">
                <div className="pointer-events-auto">
                  <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-primary-yellow text-primary-navy text-[10px] font-bold uppercase tracking-[0.12em]">
                    {t("heroFeaturedStoryBadge")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? t("heroUnmuteVideo") : t("heroMuteVideo")}
                  className="pointer-events-auto shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/15 text-white hover:bg-white/25 transition-all backdrop-blur-md border border-white/20"
                >
                  {muted ? <IconVolumeOff size={18} /> : <IconVolume size={18} />}
                </button>
              </div>

              <div className="relative aspect-[16/9] w-full">
                <video
                  ref={videoRef}
                  src="/assets/hero-video.mp4"
                  poster="/assets/campaign-man-new.jpg"
                  preload="metadata"
                  autoPlay
                  muted
                  loop
                  playsInline
                  onClick={toggleMute}
                  className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                />
              </div>

              {/* Footer bar */}
              <div className="absolute bottom-0 inset-x-0 z-10 flex items-end justify-end p-4 sm:p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <a
                  href="https://www.youtube.com/watch?v=4ZFVxwX8VCU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-[100px] bg-white/15 text-white text-[13px] font-semibold hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] active:scale-[0.98] transition-all backdrop-blur-md border border-white/20"
                >
                  <IconBrandYoutube size={18} />
                  {t("heroWatchOnYoutube")}
                </a>
              </div>
            </div>

            {/* Under-video caption + donate CTA */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="font-heading text-[18px] md:text-[20px] font-extrabold text-primary-navy leading-tight text-center sm:text-left">
                {t("heroHelpFamilyLithuania")}
              </h3>
              <Link
                href="/checkout?campaign=1"
                className="shrink-0 inline-flex items-center justify-center gap-1.5 h-[48px] px-7 rounded-[100px] font-bold text-[15px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all"
              >
                {t("heroDonateNow")}
                <IconArrowRight size={17} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
