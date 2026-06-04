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

  // Remember where the viewer was when they swap audio tracks so playback
  // resumes from the exact same moment in the new language instead of
  // restarting from the beginning.
  const resumeStateRef = useRef<{ time: number; wasPlaying: boolean } | null>(
    null,
  );

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  function changeAudio(next: AudioLang) {
    if (next === audioLang) return;
    const v = videoRef.current;
    if (v) {
      resumeStateRef.current = {
        time: v.currentTime,
        wasPlaying: !v.paused && !v.ended,
      };
    }
    setAudioLang(next);
  }

  // After the new src loads, jump back to the previously remembered moment
  // and resume playback (autoplay survives because video stays muted by
  // default — manual unmute via toggle isn't affected).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const resume = resumeStateRef.current;
    resumeStateRef.current = null;
    v.load();
    const handleLoaded = () => {
      if (resume && Number.isFinite(resume.time)) {
        try {
          v.currentTime = resume.time;
        } catch {
          /* ignore seek errors on metadata-less load */
        }
      }
      if (!resume || resume.wasPlaying) {
        void v.play().catch(() => {
          /* user gesture will resume if autoplay is blocked */
        });
      }
    };
    v.addEventListener("loadedmetadata", handleLoaded, { once: true });
    return () => v.removeEventListener("loadedmetadata", handleLoaded);
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
            {/* Top bar — only the mute toggle now; chapter badge moved to
                the footer so it no longer collides with the logo overlay
                from the brand watermark inside the video. */}
            <div className="absolute top-0 inset-x-0 z-10 flex items-start justify-end p-4 sm:p-5 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? t("heroUnmuteVideo") : t("heroMuteVideo")}
                className="pointer-events-auto shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/15 text-white hover:bg-white/25 transition-all backdrop-blur-md border border-white/20"
              >
                {muted ? <IconVolumeOff size={18} /> : <IconVolume size={18} />}
              </button>
            </div>

            <div className="relative aspect-[16/9] w-full bg-primary-navy">
              <video
                ref={videoRef}
                src={VIDEO_SRC[audioLang]}
                preload="auto"
                autoPlay
                muted
                loop
                playsInline
                onClick={toggleMute}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              />
            </div>

            {/* Bottom bar — chapter badge lives here so it sits clear of
                any logo / wordmark that appears at the top of the clip. */}
            <div className="absolute bottom-0 inset-x-0 z-10 flex items-end justify-start p-4 sm:p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none">
              <span className="pointer-events-auto inline-flex items-center h-6 px-2.5 rounded-full bg-primary-yellow text-primary-navy text-[10px] font-bold uppercase tracking-[0.12em]">
                {t("dimitriPart2Chapter")}
              </span>
            </div>
          </div>

          {/* Language switcher — text labels only, no flags, so the
              audio track choice reads as a script/dubbing toggle rather
              than a nationality flag. */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
            {(Object.keys(LANG_LABEL) as AudioLang[]).map((code) => {
              const isActive = audioLang === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => changeAudio(code)}
                  aria-pressed={isActive}
                  className={cn(
                    "inline-flex items-center h-11 px-5 sm:px-6 rounded-[100px] text-[13px] sm:text-[14px] font-semibold transition-all border",
                    isActive
                      ? "bg-primary-navy text-white border-primary-navy shadow-md"
                      : "bg-white text-primary-navy border-surface-muted hover:border-primary-navy/40 hover:shadow-sm",
                  )}
                >
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
