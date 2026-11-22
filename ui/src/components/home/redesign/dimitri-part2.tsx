"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IconArrowRight,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { claimAudio, onAudioClaim } from "@/lib/single-audio";

type AudioLang = "en" | "lt";

// The landscape clip (Part 3) has a dubbed copy per language.
const LANDSCAPE_SRC: Record<AudioLang, string> = {
  en: "/assets/ches/ches-en.mp4",
  lt: "/assets/ches/ches-lt.mp4",
};

// The portrait slot holds two nested chapters toggled in place:
//   Part 1 → the original phone-format story (dubbed per language)
//   Part 2 → Cheslovas' newer portrait clip (Lithuanian original only for now)
const PART1_SRC: Record<AudioLang, string> = {
  en: "/assets/ches/story-en.mp4",
  lt: "/assets/ches/story-lt.mp4",
};
const PART2_SRC = "/assets/ches/part2-lt.mp4";

const LANG_LABEL: Record<AudioLang, string> = {
  en: "English",
  lt: "Lietuvių",
};

type PortraitPart = 1 | 2;
type ResumeState = { time: number; wasPlaying: boolean };

export function DimitriPart2() {
  const { t, language } = useLanguage();
  const landscapeRef = useRef<HTMLVideoElement>(null);
  const portraitRef = useRef<HTMLVideoElement>(null);
  // Clips start paused with sound; the play button starts them with audio.
  const [landscapePaused, setLandscapePaused] = useState(true);
  const [portraitPaused, setPortraitPaused] = useState(true);
  // Playback progress (0–1) for the Part 3 landscape clip's seek bar.
  const [landscapeProgress, setLandscapeProgress] = useState(0);
  // Which chapter the portrait slot is showing.
  const [portraitPart, setPortraitPart] = useState<PortraitPart>(1);
  const [audioLang, setAudioLang] = useState<AudioLang>(() => {
    if (language === "lt") return "lt";
    return "en";
  });

  // Part 2 only has Lithuanian audio; Part 1 follows the language switcher.
  const portraitSrc = portraitPart === 2 ? PART2_SRC : PART1_SRC[audioLang];

  // Defer loading the heavy clips until the section is about to enter view, so
  // they don't weigh down the initial homepage load.
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || inView) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [inView]);

  // Per-video resume buffer so a language switch continues from the same
  // moment. A chapter switch leaves this null so the new clip plays from 0.
  const resumeRef = useRef<{
    landscape: ResumeState | null;
    portrait: ResumeState | null;
  }>({ landscape: null, portrait: null });

  // Last-frame snapshots painted as a bridge while the next src loads, so a
  // swap never flashes to the dark backdrop.
  const [landscapeBridge, setLandscapeBridge] = useState<string | null>(null);
  const [portraitBridge, setPortraitBridge] = useState<string | null>(null);

  function captureResume(v: HTMLVideoElement | null): ResumeState | null {
    if (!v) return null;
    return { time: v.currentTime, wasPlaying: !v.paused && !v.ended };
  }

  function captureFrame(v: HTMLVideoElement | null): string | null {
    if (!v || !v.videoWidth || !v.videoHeight) return null;
    try {
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, 640 / v.videoWidth);
      canvas.width = Math.round(v.videoWidth * scale);
      canvas.height = Math.round(v.videoHeight * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpeg", 0.75);
    } catch {
      return null;
    }
  }

  function toggleLandscapePlay() {
    const v = landscapeRef.current;
    if (!v) return;
    if (v.paused) {
      // Starting one clip pauses the portrait clip and the hero video.
      if (portraitRef.current) portraitRef.current.pause();
      claimAudio("dimitri");
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }

  function togglePortraitPlay() {
    const v = portraitRef.current;
    if (!v) return;
    if (v.paused) {
      if (landscapeRef.current) landscapeRef.current.pause();
      claimAudio("dimitri");
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }

  // Only one clip plays at a time: pause both when another video starts, or
  // when the section scrolls out of view.
  useEffect(() => {
    const off = onAudioClaim("dimitri", () => {
      landscapeRef.current?.pause();
      portraitRef.current?.pause();
    });
    const el = sectionRef.current;
    let obs: IntersectionObserver | undefined;
    if (el) {
      obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) {
            landscapeRef.current?.pause();
            portraitRef.current?.pause();
          }
        },
        { threshold: 0.15 },
      );
      obs.observe(el);
    }
    return () => {
      off();
      obs?.disconnect();
    };
  }, []);

  // Follow the site-wide language: switching to LT/EN/TR re-dubs the clips
  // automatically (de/fr/es fall back to the English dub).
  useEffect(() => {
    const mapped: AudioLang = language === "lt" ? "lt" : "en";
    changeAudio(mapped);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  function changeAudio(next: AudioLang) {
    if (next === audioLang) return;
    resumeRef.current.landscape = captureResume(landscapeRef.current);
    // Only Part 1 resumes on a language change — Part 2 has no dubs so its
    // src doesn't change and it keeps playing untouched.
    if (portraitPart === 1) {
      resumeRef.current.portrait = captureResume(portraitRef.current);
      setPortraitBridge(captureFrame(portraitRef.current));
    }
    setLandscapeBridge(captureFrame(landscapeRef.current));
    setAudioLang(next);
  }

  function seekLandscape(e: React.PointerEvent<HTMLDivElement>) {
    const v = landscapeRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * v.duration;
    setLandscapeProgress(ratio);
  }

  function changePortraitPart(next: PortraitPart) {
    if (next === portraitPart) return;
    // New chapter starts from the beginning, paused behind the play button.
    resumeRef.current.portrait = null;
    setPortraitBridge(captureFrame(portraitRef.current));
    setPortraitPaused(true);
    setPortraitPart(next);
  }

  // Landscape: reload + resume on language change.
  useEffect(() => {
    const v = landscapeRef.current;
    if (!v) return;
    const resume = resumeRef.current.landscape;
    resumeRef.current.landscape = null;
    v.load();
    const onLoaded = () => {
      if (resume && Number.isFinite(resume.time)) {
        try {
          v.currentTime = resume.time;
        } catch {
          /* ignore */
        }
      }
      // Only keep playing if it was already playing before the reload — a
      // fresh load (or chapter switch) stays paused behind the play button.
      if (resume?.wasPlaying) void v.play().catch(() => {});
    };
    const onPlaying = () => setLandscapeBridge(null);
    v.addEventListener("loadedmetadata", onLoaded, { once: true });
    v.addEventListener("playing", onPlaying, { once: true });
    const timeout = window.setTimeout(() => setLandscapeBridge(null), 1500);
    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("playing", onPlaying);
      window.clearTimeout(timeout);
    };
  }, [audioLang]);

  // Portrait: reload on either a language change (Part 1) or a chapter
  // switch. Resume buffer decides whether to seek back or start fresh.
  useEffect(() => {
    const v = portraitRef.current;
    if (!v) return;
    const resume = resumeRef.current.portrait;
    resumeRef.current.portrait = null;
    v.load();
    const onLoaded = () => {
      if (resume && Number.isFinite(resume.time)) {
        try {
          v.currentTime = resume.time;
        } catch {
          /* ignore */
        }
      }
      // Only keep playing if it was already playing before the reload — a
      // fresh load (or chapter switch) stays paused behind the play button.
      if (resume?.wasPlaying) void v.play().catch(() => {});
    };
    const onPlaying = () => setPortraitBridge(null);
    v.addEventListener("loadedmetadata", onLoaded, { once: true });
    v.addEventListener("playing", onPlaying, { once: true });
    const timeout = window.setTimeout(() => setPortraitBridge(null), 1500);
    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("playing", onPlaying);
      window.clearTimeout(timeout);
    };
  }, [portraitSrc]);

  return (
    <section
      ref={sectionRef}
      id="chapter-part3"
      className="relative overflow-hidden bg-bg-off-white border-t border-surface-muted"
    >
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-primary-yellow/15 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)] py-16 md:py-24">
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
        </motion.div>

        {/* Language switcher (applies to Part 1 + the landscape Part 3). */}
        <div className="mb-6 md:mb-8 mx-auto w-full max-w-[420px] sm:max-w-none grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3">
          {(Object.keys(LANG_LABEL) as AudioLang[]).map((code) => {
            const isActive = audioLang === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => changeAudio(code)}
                aria-pressed={isActive}
                className={cn(
                  "inline-flex items-center justify-center h-11 px-5 sm:px-6 rounded-[100px] text-[13px] sm:text-[14px] font-semibold transition-all border",
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
          className="grid gap-5 md:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,3.16fr)] items-stretch lg:h-[600px]"
        >
          {/* Portrait slot — Part 1 / Part 2 nested in place. */}
          <div className="order-1 lg:order-1 relative rounded-[28px] border border-surface-muted shadow-xl overflow-hidden bg-primary-navy w-full lg:h-full">
            <div className="relative aspect-[9/16] lg:aspect-auto w-full lg:h-full bg-primary-navy">
              <video
                ref={portraitRef}
                src={inView ? portraitSrc : undefined}
                preload="metadata"
                loop
                playsInline
                onClick={togglePortraitPlay}
                onPlay={() => setPortraitPaused(false)}
                onPause={() => setPortraitPaused(true)}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              />
              {portraitPaused && (
                <button
                  type="button"
                  onClick={togglePortraitPlay}
                  aria-label="Play"
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/25"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-primary-navy shadow-lg">
                    <IconPlayerPlayFilled size={24} className="ml-0.5" />
                  </span>
                </button>
              )}
              {portraitBridge ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={portraitBridge}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              ) : null}
            </div>

            {/* Part 1 / Part 2 toggle — replaces the old STORY badge. */}
            <div className="absolute bottom-0 inset-x-0 z-10 flex items-end justify-start gap-2.5 p-4 sm:p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              {([1, 2] as PortraitPart[]).map((p) => {
                const isActive = portraitPart === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => changePortraitPart(p)}
                    aria-pressed={isActive}
                    className={cn(
                      "inline-flex items-center justify-center h-11 px-5 sm:h-9 sm:px-4 rounded-full text-[13px] sm:text-[12px] font-bold uppercase tracking-[0.1em] transition-all border",
                      isActive
                        ? "bg-white text-primary-navy border-white shadow-sm"
                        : p === 2
                          // Inactive Part 2 pulses yellow so viewers notice the
                          // newer chapter and don't miss it.
                          ? "bg-primary-yellow/30 text-white border-primary-yellow/80 backdrop-blur-md hover:bg-primary-yellow/45 animate-attention"
                          : "bg-white/15 text-white border-white/30 hover:bg-white/25 backdrop-blur-md",
                    )}
                  >
                    {t(p === 1 ? "dimitriChapter1" : "dimitriChapter2")}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Landscape Part 3 clip. */}
          <div className="order-2 lg:order-2 relative rounded-[28px] border border-surface-muted shadow-xl overflow-hidden bg-primary-navy lg:h-full">
            <div className="relative aspect-[16/9] lg:aspect-auto w-full lg:h-full bg-primary-navy">
              <video
                ref={landscapeRef}
                src={inView ? LANDSCAPE_SRC[audioLang] : undefined}
                preload="metadata"
                loop
                playsInline
                onClick={toggleLandscapePlay}
                onPlay={() => setLandscapePaused(false)}
                onPause={() => setLandscapePaused(true)}
                onTimeUpdate={(e) => {
                  const v = e.currentTarget;
                  if (v.duration) setLandscapeProgress(v.currentTime / v.duration);
                }}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              />
              {landscapePaused && (
                <button
                  type="button"
                  onClick={toggleLandscapePlay}
                  aria-label="Play"
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/25"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-primary-navy shadow-lg">
                    <IconPlayerPlayFilled size={28} className="ml-0.5" />
                  </span>
                </button>
              )}
              {landscapeBridge ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={landscapeBridge}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              ) : null}
            </div>

            <div className="absolute bottom-0 inset-x-0 z-10 flex flex-col gap-2.5 p-4 sm:p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              <span className="self-start inline-flex items-center h-6 px-2.5 rounded-full bg-primary-yellow text-primary-navy text-[10px] font-bold uppercase tracking-[0.12em]">
                {t("dimitriPart2Chapter")}
              </span>
              {/* Click/tap anywhere on the track to seek. The padded wrapper
                  gives a 44px-tall hit area while the bar stays slim. */}
              <div
                role="slider"
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(landscapeProgress * 100)}
                tabIndex={0}
                onPointerDown={seekLandscape}
                className="group/seek -my-2 py-2 cursor-pointer"
              >
                <div className="relative h-1.5 w-full rounded-full bg-white/30 group-hover/seek:h-2 transition-[height]">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-primary-yellow"
                    style={{ width: `${landscapeProgress * 100}%` }}
                  />
                  {/* Benefactor favicon rides the bar as the scrub handle. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/fav-smile.png"
                    alt=""
                    aria-hidden
                    className="absolute top-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] pointer-events-none select-none"
                    style={{ left: `${landscapeProgress * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="font-heading text-[18px] md:text-[20px] font-extrabold text-primary-navy leading-tight text-center sm:text-left">
            {t("dimitriPart2HelpLine")}
          </h3>
          <Link
            href="/checkout?campaign=1"
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
