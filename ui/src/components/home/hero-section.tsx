"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { FloatingHearts } from "./floating-hearts";
import { GlobeStatsBar } from "./globe-stats-bar";

export function HeroSection() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll animations for the hero logo
  const logoScale = Math.max(0.6, 1 - scrollY / 300);
  const logoOpacity = Math.max(0, 1 - scrollY / 150);
  const logoTranslateY = Math.min(50, scrollY * 0.2);

  return (
    <section className="relative bg-white overflow-hidden pt-0 pb-0 min-h-screen flex flex-col justify-start items-center">
      <FloatingHearts />

      <div className="relative z-10 max-w-[900px] w-full mx-auto px-5 text-center mt-4 md:mt-6 pb-0 flex flex-col items-center">
        <Image 
          src="/assets/logo.svg" 
          alt="Benefactor Logo" 
          width={411} 
          height={147} 
          className="mx-auto w-[240px] md:w-[320px] lg:w-[411px] h-auto mb-4 md:mb-6 pointer-events-none drop-shadow-sm will-change-transform" 
          style={{
            transform: `scale(${logoScale}) translateY(${logoTranslateY}px)`,
            opacity: logoOpacity,
          }}
          priority
        />

        <h1 className="text-[clamp(28px,5vw+1rem,60px)] text-primary-navy leading-[1.0] tracking-[-2px] font-[950] mb-[18px] w-full text-center">
          {t("heroTitle1")} <br className="hidden md:block" />
          {t("heroTitle2")} <br className="hidden md:block" />
          {t("heroTitle3")}
        </h1>
        <p className="font-heading text-[clamp(14px,2vw+0.5rem,24px)] text-primary-navy font-bold leading-[1.14] mb-[18px] w-full">
          {t("heroSubtitle").split("*")[0]}
          <br className="hidden md:block" />
          {t("heroSubtitle").split("*")[1]}
        </p>
        <p className="text-[clamp(13px,1vw+0.5rem,16px)] text-text-gray font-normal max-w-[460px] mx-auto leading-[1.42] mb-[18px] w-full">
          {t("heroDesc")}
        </p>
        <Link
          href="/start"
          className="mt-4 md:mt-6 mb-8 block w-fit mx-auto px-[32px] py-[14px] rounded-[30px] font-bold text-[16px] bg-primary-yellow text-primary-navy shadow-[0_4px_14px_rgba(255,193,7,0.3)] hover:scale-105 hover:shadow-[0_6px_20px_rgba(255,193,7,0.5)] transition-all relative z-20"
        >
          {t("startBenefactor")}
        </Link>
      </div>

      <GlobeStatsBar />
    </section>
  );
}
