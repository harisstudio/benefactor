"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { FloatingHearts } from "./floating-hearts";
import { GlobeStatsBar } from "./globe-stats-bar";
import { MobileHeartSlider } from "./mobile-heart-slider";

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
    <section className="relative bg-white overflow-hidden pt-0 md:pt-2 pb-0 min-h-screen flex flex-col justify-start items-center">
      <FloatingHearts />

      <div className="relative z-10 max-w-[1000px] w-full mx-auto px-5 text-center mt-0 md:mt-2 pb-0 flex flex-col items-center">
        <Image 
          src="/assets/logo.svg" 
          alt="Benefactor Logo" 
          width={411} 
          height={147} 
          className="mx-auto w-[160px] md:w-[280px] lg:w-[340px] h-auto mb-0 md:mb-2 pointer-events-none drop-shadow-sm will-change-transform" 
          style={{
            transform: `scale(${logoScale}) translateY(${logoTranslateY}px)`,
            opacity: logoOpacity,
          }}
          priority
        />
        
        <MobileHeartSlider />

        
        <h1 className="text-[clamp(32px,5vw+1rem,56px)] text-primary-navy leading-[1.0] tracking-[-2px] font-extrabold mb-2 md:mb-3 w-full text-center">
          {t("heroTitle1")} <br className="hidden md:block" />
          {t("heroTitle2")} <br className="hidden md:block" />
          {t("heroTitle3")}
        </h1>
        
        <p className="font-heading text-[clamp(16px,2vw+0.5rem,22px)] text-primary-navy font-bold leading-[1.14] mb-2 md:mb-3 w-full">
          {t("heroSubtitle").split("*")[0]}
          <br className="hidden md:block" />
          {t("heroSubtitle").split("*")[1]}
        </p>
        <p className="text-[clamp(14px,1vw+0.5rem,18px)] text-text-gray font-medium max-w-[500px] mx-auto leading-[1.4] mb-2 md:mb-5 w-full">
          {t("heroDesc")}
        </p>
      </div>

      <div className="w-full flex flex-col items-center gap-4 md:gap-6 z-20">
        <GlobeStatsBar />
        
        <Link
          href="/start"
          className="block w-fit px-[48px] py-[18px] rounded-[100px] font-bold text-[18px] bg-primary-yellow text-primary-navy shadow-[0_4px_14px_rgba(255,193,7,0.3)] hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,193,7,0.5)] transition-all"
        >
          {t("startBenefactor")}
        </Link>
      </div>


      {/* Down Arrow — fills space and encourages scroll */}
      <style>{`
        @keyframes slow-bounce {
          0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
        .animate-slow-bounce {
          animation: slow-bounce 2s infinite;
        }
      `}</style>
      <div className="mt-8 md:mt-12 mb-10 animate-slow-bounce flex flex-col items-center opacity-30">
        <svg 
          className="w-10 h-10 text-primary-navy" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7-7-7M19 7l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
