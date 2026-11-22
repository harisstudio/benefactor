"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IconCircleCheck,
  IconShieldCheck,
  IconBuildingBank,
  IconArrowRight,
  IconBrandYoutube,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { claimAudio, onAudioClaim } from "@/lib/single-audio";

export function RedesignHero() {
  const { t, language } = useLanguage();
  // Full story on YouTube — Lithuanian original vs the English-dubbed cut.
  const youtubeUrl =
    language === "lt"
      ? "https://www.youtube.com/watch?v=MwtgErY-R0g&t=5s"
      : "https://www.youtube.com/watch?v=4ZFVxwX8VCU&t=216s";
  const videoRef = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // Videos start paused with sound; the play button starts the clip with audio.
  const [paused, setPaused] = useState(true);

  // In Lithuanian the hero box plays the LT story straight from YouTube; in
  // English it keeps the local dubbed clip.
  const isLt = language === "lt";
  const ytEmbed = "https://www.youtube.com/embed/MwtgErY-R0g?start=5&autoplay=1&rel=0";
  const ytThumb = "https://img.youtube.com/vi/MwtgErY-R0g/maxresdefault.jpg";
  const [ytActive, setYtActive] = useState(false);

  // Leaving Lithuanian collapses the embed back to its play-button facade.
  useEffect(() => {
    if (!isLt) setYtActive(false);
  }, [isLt]);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      claimAudio("hero"); // pause every other clip when this one starts
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }

  // Only one clip plays at a time: pause (and stop the YouTube embed) when
  // another video starts, or when the hero scrolls out of view.
  useEffect(() => {
    const off = onAudioClaim("hero", () => {
      videoRef.current?.pause();
      setYtActive(false);
    });
    let obs: IntersectionObserver | undefined;
    const el = boxRef.current;
    if (el) {
      obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) {
            videoRef.current?.pause();
            setYtActive(false);
          }
        },
        { threshold: 0.2 },
      );
      obs.observe(el);
    }
    return () => {
      off();
      obs?.disconnect();
    };
  }, []);

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
          {/* Left column — desktop only; on mobile this intro is rendered
              lower down the page (after the featured campaign). */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="hidden lg:block text-center lg:text-left order-2 lg:order-1"
          >
            <HeroIntro />
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
              </div>

              <div ref={boxRef} className="relative aspect-[16/9] w-full">
                {isLt ? (
                  ytActive ? (
                    <iframe
                      src={ytEmbed}
                      title={t("heroHelpFamilyLithuania")}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        claimAudio("hero");
                        setYtActive(true);
                      }}
                      aria-label="Play"
                      className="absolute inset-0 z-10 flex items-center justify-center"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ytThumb}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <span className="absolute inset-0 bg-black/25" />
                      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-primary-navy shadow-lg">
                        <IconPlayerPlayFilled size={28} className="ml-0.5" />
                      </span>
                    </button>
                  )
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      src="/assets/hero-video.mp4"
                      poster="/assets/campaign-man-new.jpg"
                      preload="metadata"
                      loop
                      playsInline
                      onClick={togglePlay}
                      onPlay={() => setPaused(false)}
                      onPause={() => setPaused(true)}
                      className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                    />
                    {paused && (
                      <button
                        type="button"
                        onClick={togglePlay}
                        aria-label="Play"
                        className="absolute inset-0 z-10 flex items-center justify-center bg-black/25"
                      >
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-primary-navy shadow-lg">
                          <IconPlayerPlayFilled size={28} className="ml-0.5" />
                        </span>
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Footer bar */}
              <div className="absolute bottom-0 inset-x-0 z-10 flex items-end justify-end p-4 sm:p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <a
                  href={youtubeUrl}
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

// The hero's headline + value props + CTAs. Lives in the hero's left column on
// desktop; on mobile it is rendered separately, below the featured campaign.
export function HeroIntro() {
  const { t } = useLanguage();

  const trustRows = [
    { Icon: IconCircleCheck, text: t("heroFeeFree") },
    { Icon: IconShieldCheck, text: t("heroReviewed") },
    { Icon: IconBuildingBank, text: t("heroWithdraw") },
  ];

  return (
    <>
      <h1 className="font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-0.02em] text-primary-navy font-extrabold mb-5">
        <span className="italic font-bold">{t("heroTitle2")}</span>
        <br />
        <span className="italic font-bold">{t("heroTitle3")}</span>
      </h1>

      <p className="text-[clamp(15px,1.3vw,18px)] text-text-gray leading-[1.6] max-w-[500px] mx-auto lg:mx-0 mb-8">
        {t("heroSubtitle")}
      </p>

      <ul className="space-y-2.5 mb-9 max-w-[460px] mx-auto lg:mx-0 text-left">
        {trustRows.map(({ Icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-[14px] text-text-dark">
            <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-yellow/20">
              <Icon size={15} className="text-primary-navy" stroke={2} />
            </span>
            {text}
          </li>
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
    </>
  );
}
