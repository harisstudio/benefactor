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

// Each video has its own dubbed copy per language. Both clips share a
// single language switcher and stay in sync when the viewer changes the
// audio track.
const LANDSCAPE_SRC: Record<AudioLang, string> = {
  en: "/assets/ches/ches-en.mp4",
  lt: "/assets/ches/ches-lt.mp4",
  ru: "/assets/ches/ches-ru.mp4",
  tr: "/assets/ches/ches-tr.mp4",
};

// Portrait phone-format companion clip. Turkish dub for this one isn't
// ready yet, so it falls back to the original Lithuanian audio.
const PORTRAIT_SRC: Record<AudioLang, string> = {
  en: "/assets/ches/story-en.mp4",
  lt: "/assets/ches/story-lt.mp4",
  ru: "/assets/ches/story-ru.mp4",
  tr: "/assets/ches/story-tr.mp4",
};

const LANG_LABEL: Record<AudioLang, string> = {
  en: "English",
  lt: "Lietuvių",
  ru: "Русский",
  tr: "Türkçe",
};

type ResumeState = { time: number; wasPlaying: boolean };

export function DimitriPart2() {
  const { t, language } = useLanguage();
  const landscapeRef = useRef<HTMLVideoElement>(null);
  const portraitRef = useRef<HTMLVideoElement>(null);
  // Each clip tracks its own mute state. Unmuting one auto-mutes the other
  // so two narrations never overlap, but the controls feel independent.
  const [landscapeMuted, setLandscapeMuted] = useState(true);
  const [portraitMuted, setPortraitMuted] = useState(true);
  const [audioLang, setAudioLang] = useState<AudioLang>(() => {
    if (language === "lt") return "lt";
    if (language === "ru") return "ru";
    if (language === "tr") return "tr";
    return "en";
  });

  // Per-video resume buffer so each clip continues from its own moment in
  // the new language instead of jumping back to zero.
  const resumeRef = useRef<{
    landscape: ResumeState | null;
    portrait: ResumeState | null;
  }>({ landscape: null, portrait: null });

  function captureResume(v: HTMLVideoElement | null): ResumeState | null {
    if (!v) return null;
    return { time: v.currentTime, wasPlaying: !v.paused && !v.ended };
  }

  function toggleLandscapeMute() {
    const next = !landscapeMuted;
    setLandscapeMuted(next);
    if (landscapeRef.current) landscapeRef.current.muted = next;
    // If we just unmuted landscape, mute portrait so audio never overlaps.
    if (!next) {
      setPortraitMuted(true);
      if (portraitRef.current) portraitRef.current.muted = true;
    }
  }

  function togglePortraitMute() {
    const next = !portraitMuted;
    setPortraitMuted(next);
    if (portraitRef.current) portraitRef.current.muted = next;
    if (!next) {
      setLandscapeMuted(true);
      if (landscapeRef.current) landscapeRef.current.muted = true;
    }
  }

  function changeAudio(next: AudioLang) {
    if (next === audioLang) return;
    resumeRef.current.landscape = captureResume(landscapeRef.current);
    resumeRef.current.portrait = captureResume(portraitRef.current);
    setAudioLang(next);
  }

  // After each clip's new src loads, seek back to the remembered point and
  // resume playback. Runs once per language change for each video.
  useEffect(() => {
    const setup = (
      v: HTMLVideoElement | null,
      slot: "landscape" | "portrait",
    ) => {
      if (!v) return () => {};
      const resume = resumeRef.current[slot];
      resumeRef.current[slot] = null;
      v.load();
      const onLoaded = () => {
        if (resume && Number.isFinite(resume.time)) {
          try {
            v.currentTime = resume.time;
          } catch {
            /* ignore seek errors */
          }
        }
        if (!resume || resume.wasPlaying) {
          void v.play().catch(() => {});
        }
      };
      v.addEventListener("loadedmetadata", onLoaded, { once: true });
      return () => v.removeEventListener("loadedmetadata", onLoaded);
    };
    const cleanupL = setup(landscapeRef.current, "landscape");
    const cleanupP = setup(portraitRef.current, "portrait");
    return () => {
      cleanupL();
      cleanupP();
    };
  }, [audioLang]);

  return (
    <section className="relative overflow-hidden bg-bg-off-white border-t border-surface-muted">
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-primary-yellow/15 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)] py-16 md:py-24">
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
          {t("dimitriPart2Subtitle") ? (
            <p className="mt-3 text-text-gray text-[15px] md:text-[16px] max-w-[640px] mx-auto">
              {t("dimitriPart2Subtitle")}
            </p>
          ) : null}
        </motion.div>

        {/* Language switcher above the video pair so the dub choice reads
            as a global toggle for both clips. */}
        <div className="mb-6 md:mb-8 flex flex-wrap justify-center gap-2 sm:gap-3">
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

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          // On desktop both clips share the same rendered height and the
          // grid columns are sized to each clip's natural aspect ratio
          // (portrait 9:16 ≈ 0.56, landscape 16:9 ≈ 1.78 → ~1 : 3.16) so
          // neither one balloons. On mobile they stack and each fills the
          // column width as normal.
          className="grid gap-5 md:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,3.16fr)] items-stretch lg:h-[460px]"
        >
          {/* Portrait (phone-format) clip on the left */}
          <div className="relative rounded-[28px] border border-surface-muted shadow-xl overflow-hidden bg-primary-navy max-w-[300px] w-full mx-auto lg:max-w-none lg:mx-0 lg:h-full">
            <div className="absolute top-0 inset-x-0 z-10 flex items-start justify-end p-3 sm:p-4 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none">
              <button
                type="button"
                onClick={togglePortraitMute}
                aria-label={portraitMuted ? t("heroUnmuteVideo") : t("heroMuteVideo")}
                className="pointer-events-auto shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/25 transition-all backdrop-blur-md border border-white/20"
              >
                {portraitMuted ? <IconVolumeOff size={16} /> : <IconVolume size={16} />}
              </button>
            </div>

            <div className="relative aspect-[9/16] lg:aspect-auto w-full h-full bg-primary-navy">
              <video
                ref={portraitRef}
                src={PORTRAIT_SRC[audioLang]}
                preload="auto"
                autoPlay
                muted
                loop
                playsInline
                onClick={togglePortraitMute}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              />
            </div>
            <div className="absolute bottom-0 inset-x-0 z-10 flex items-end justify-start p-4 sm:p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none">
              <span className="pointer-events-auto inline-flex items-center h-6 px-2.5 rounded-full bg-white/95 text-primary-navy text-[10px] font-bold uppercase tracking-[0.12em]">
                {t("dimitriStoryBadge")}
              </span>
            </div>
          </div>

          {/* Landscape Part 2 clip on the right */}
          <div className="relative rounded-[28px] border border-surface-muted shadow-xl overflow-hidden bg-primary-navy lg:h-full">
            <div className="absolute top-0 inset-x-0 z-10 flex items-start justify-end p-4 sm:p-5 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none">
              <button
                type="button"
                onClick={toggleLandscapeMute}
                aria-label={landscapeMuted ? t("heroUnmuteVideo") : t("heroMuteVideo")}
                className="pointer-events-auto shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/15 text-white hover:bg-white/25 transition-all backdrop-blur-md border border-white/20"
              >
                {landscapeMuted ? <IconVolumeOff size={18} /> : <IconVolume size={18} />}
              </button>
            </div>

            <div className="relative aspect-[16/9] lg:aspect-auto w-full h-full bg-primary-navy">
              <video
                ref={landscapeRef}
                src={LANDSCAPE_SRC[audioLang]}
                preload="auto"
                autoPlay
                muted
                loop
                playsInline
                onClick={toggleLandscapeMute}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              />
            </div>

            <div className="absolute bottom-0 inset-x-0 z-10 flex items-end justify-start p-4 sm:p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none">
              <span className="pointer-events-auto inline-flex items-center h-6 px-2.5 rounded-full bg-primary-yellow text-primary-navy text-[10px] font-bold uppercase tracking-[0.12em]">
                {t("dimitriPart2Chapter")}
              </span>
            </div>
          </div>
        </motion.div>

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
      </div>
    </section>
  );
}
