"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function GlobeStatsBar() {
  const { t } = useLanguage();
  
  const statsItems = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      text: t("stats1"),
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      text: t("stats2"),
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      text: t("stats3"),
    },
  ];

  return (
    <div className="relative mt-[clamp(120px,20vw,280px)] left-0 flex flex-col items-center z-[2] w-full max-w-[1600px]">
      {/* Globe image acting as the bottom arch */}
      <img
        src="/assets/world-smile-outline.svg"
        alt="World Smile Globe"
        className="w-full max-w-[920px] h-auto object-contain block transform -translate-x-[10px] scale-[0.836] mt-[clamp(-280px,-20vw,-120px)] mb-[clamp(-130px,-10vw,-60px)] relative z-[-1]"
      />

      {/* Navy stats bar — pill shape matching the design */}
      <div className="absolute bottom-[32px] z-20 bg-primary-navy rounded-[38px] h-[76px] w-[90%] lg:w-[84%] xl:w-[72%] max-w-[1300px] shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-around px-2 md:px-[clamp(15px,3vw,50px)]">
        {statsItems.map((item, i) => (
          <div key={item.text} className="flex items-center gap-2 md:gap-3 text-white hover:text-primary-yellow transition-colors cursor-default">
            {i > 0 && (
              <div className="hidden md:block w-[2px] h-[30px] bg-white opacity-30 mr-2 md:mr-4 ml-[-8px] md:ml-[-16px]" />
            )}
            <span className="text-primary-yellow scale-[0.8] md:scale-100 flex-shrink-0 w-[24px] md:w-[28px] h-[24px] md:h-[28px]">
              {item.icon}
            </span>
            <span className="text-[14px] md:text-[16px] font-normal leading-tight tracking-normal whitespace-nowrap hidden sm:block md:whitespace-normal">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
