"use client";

import { useRef, useState } from "react";
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";

interface CampaignHeroVideoProps {
  src: string;
}

/**
 * Auto-playing (muted) hero video for a campaign detail page. Click anywhere
 * or use the speaker button to toggle sound; the yellow bar shows progress and
 * lets the viewer scrub, with the Benefactor smiley riding along as the handle.
 */
export function CampaignHeroVideo({ src }: CampaignHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  }

  function seek(e: React.PointerEvent<HTMLDivElement>) {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * v.duration;
    setProgress(ratio);
  }

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-md">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        onClick={toggleMute}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration) setProgress(v.currentTime / v.duration);
        }}
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
      />

      {/* Mute toggle */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute" : "Mute"}
        className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/15 text-white hover:bg-white/25 transition-all backdrop-blur-md border border-white/20"
      >
        {muted ? <IconVolumeOff size={18} /> : <IconVolume size={18} />}
      </button>

      {/* Bottom gradient with seek bar. The country is already shown in the
          page header, so it isn't repeated over the video. */}
      <div className="absolute bottom-0 inset-x-0 z-10 flex flex-col gap-2.5 p-4 sm:p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <div
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          tabIndex={0}
          onPointerDown={seek}
          className="group/seek -my-2 py-2 cursor-pointer"
        >
          <div className="relative h-1.5 w-full rounded-full bg-white/30 group-hover/seek:h-2 transition-[height]">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-primary-yellow"
              style={{ width: `${progress * 100}%` }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/fav-smile.png"
              alt=""
              aria-hidden
              className="absolute top-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] pointer-events-none select-none"
              style={{ left: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
