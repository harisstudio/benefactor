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
    <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 mt-8 mb-12 flex justify-center">
      {/* Navy stats bar — responsive pill shape */}
      <div className="bg-primary-navy rounded-[32px] sm:rounded-[38px] w-full md:w-[95%] lg:w-[90%] shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex flex-col md:flex-row items-center justify-around py-6 md:py-0 md:h-[76px] px-6 gap-6 md:gap-4 overflow-hidden">
        {statsItems.map((item, i) => (
          <div key={item.text} className="flex items-center gap-3 text-white hover:text-primary-yellow transition-colors cursor-default group w-full md:w-auto justify-center md:justify-start">
            {i > 0 && (
              <div className="hidden md:block w-[1px] h-[30px] bg-white opacity-20 mr-4 ml-[-20px]" />
            )}
            <span className="text-primary-yellow shrink-0 w-6 h-6 md:w-7 md:h-7">
              {item.icon}
            </span>
            <span className="text-[14px] sm:text-[15px] md:text-[16px] font-medium leading-tight">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
