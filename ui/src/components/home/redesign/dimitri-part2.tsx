"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IconArrowRight,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

type AudioLang = "en" | "lt" | "ru" | "tr";

// Each language gets its own dubbed video.
const VIDEO_SRC: Record<AudioLang, string> = {
  en: "/assets/ches/ches-en.mp4",
  lt: "/assets/ches/ches-lt.mp4",
  ru: "/assets/ches/ches-ru.mp4",
  tr: "/assets/ches/ches-tr.mp4",
};

const LANG_LABEL: Record<AudioLang, string> = {
  en: "English",
  lt: "Lietuvių",
  ru: "Русский",
  tr: "Türkçe",
};

const LANG_FLAG: Record<AudioLang, string> = {
  en: "🇬🇧",
  lt: "🇱🇹",
  ru: "🇷🇺",
  tr: "🇹🇷",
};

export function DimitriPart2() {
  const { t, language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [audioLang, setAudioLang] = useState<AudioLang>(() => {
    // Default to the user's current UI language when supported.
    if (language === "lt") return "lt";
    if (language === "ru") return "ru";
    if (language === "tr") return "tr";
    return "en";
  });

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  // Reload the video element when the language (and therefore src) changes
  // so playback restarts from the beginning with the new audio track.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    void v.play().catch(() => {
      /* autoplay can fail when unmuted — user gesture will resume it */
    });
  }, [audioLang]);

  return (
    <section className="relative overflow-hidden bg-bg-off-white border-t border-surface-muted">
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-primary-yellow/15 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)] py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-8 md:mb-10"
        >
          <span className="inline-flex items-center h-7 px-3 rounded-full bg-primary-yellow text-primary-navy text-[11px] font-bold uppercase tracking-[0.14em] mb-4">
            {t("dimitriPart2Badge")}
          </span>
          <h2 className="font-heading text-[28px] md:text-[40px] font-extrabold text-primary-navy leading-tight">
            {t("dimitriPart2Title")}
          </h2>
          <p className="mt-3 text-text-gray text-[15px] md:text-[16px] max-w-[640px] mx-auto">
            {t("dimitriPart2Subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full mx-auto"
        >
          <div className="relative rounded-[28px] border border-surface-muted shadow-xl overflow-hidden bg-primary-navy">
            <div className="absolute top-0 inset-x-0 z-10 flex items-start justify-between p-4 sm:p-5 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none">
              <div className="pointer-events-auto">
                <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-primary-yellow text-primary-navy text-[10px] font-bold uppercase tracking-[0.12em]">
                  {t("dimitriPart2Chapter")}
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
                key={audioLang}
                src={VIDEO_SRC[audioLang]}
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
          </div>

          {/* Language switcher */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
            {(Object.keys(LANG_LABEL) as AudioLang[]).map((code) => {
              const isActive = audioLang === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setAudioLang(code)}
                  aria-pressed={isActive}
                  className={cn(
                    "inline-flex items-center gap-2 h-11 px-4 sm:px-5 rounded-[100px] text-[13px] sm:text-[14px] font-semibold transition-all border",
                    isActive
                      ? "bg-primary-navy text-white border-primary-navy shadow-md"
                      : "bg-white text-primary-navy border-surface-muted hover:border-primary-navy/40 hover:shadow-sm",
                  )}
                >
                  <span aria-hidden className="text-base leading-none">
                    {LANG_FLAG[code]}
                  </span>
                  {LANG_LABEL[code]}
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="font-heading text-[18px] md:text-[20px] font-extrabold text-primary-navy leading-tight text-center sm:text-left">
              {t("dimitriPart2HelpLine")}
            </h3>
            <Link
              href="/checkout"
              className="shrink-0 inline-flex items-center justify-center gap-1.5 h-[48px] px-7 rounded-[100px] font-bold text-[15px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all"
            >
              {t("heroDonateNow")}
              <IconArrowRight size={17} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
