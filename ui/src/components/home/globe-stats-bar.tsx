"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function GlobeStatsBar() {
  const { t } = useLanguage();
  const [activeStatIndex, setActiveStatIndex] = useState(0);

  const statsItems = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      text: t("stats1"),
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      text: t("stats2"),
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      text: t("stats3"),
    },
  ];

  useEffect(() => {
    const statTimer = setInterval(() => {
      setActiveStatIndex((prev: number) => (prev + 1) % statsItems.length);
    }, 4000);
    
    return () => clearInterval(statTimer);
  }, [statsItems.length]);

  return (
    <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 flex justify-center">
      <style>{`
        @keyframes rotate-360 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-rotate-360 {
          animation: rotate-360 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
      
      {/* Navy stats bar — responsive pill shape */}
      <div className="bg-primary-navy rounded-full w-full md:w-[85%] lg:w-[432px] shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex items-center justify-around py-4 md:py-0 md:h-[60px] px-6 md:px-8 overflow-hidden border border-white/5">
        
        {/* Stats Section with Slot Machine Animation for all devices */}
        <div className="w-full flex items-center justify-center h-[32px] md:h-full overflow-hidden relative">
          
          <div className="w-full h-full relative">
            {statsItems.map((item, i) => {
              const isActive = i === activeStatIndex;
              const isPrev = i === (activeStatIndex - 1 + statsItems.length) % statsItems.length;

              return (
                <div 
                  key={i}
                  className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-800 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]
                    ${isActive 
                      ? "translate-y-0 opacity-100 scale-100" 
                      : (isPrev 
                          ? "translate-y-full opacity-0 scale-95" 
                          : "-translate-y-full opacity-0 scale-95")
                    }
                  `}
                >
                  <span className={`text-primary-yellow shrink-0 w-7 h-7 md:w-9 md:h-9 flex items-center justify-center ${isActive ? 'animate-rotate-360' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="text-white text-[16px] md:text-[20px] font-semibold leading-none tracking-tight whitespace-nowrap">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
