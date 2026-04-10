"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountryState] = useState("United Kingdom");

  useEffect(() => {
    const saved = localStorage.getItem("benefactor_country");
    if (saved) {
      setCountryState(saved);
    }
  }, []);

  const setCountry = (c: string) => {
    setCountryState(c);
    localStorage.setItem("benefactor_country", c);
  };

  // A tiny helper to decide which flag to show based on country
  const getFlagCode = (c: string) => {
    switch (c) {
      case "United States": return "us";
      case "United Kingdom": return "gb";
      case "Canada": return "ca";
      case "Australia": return "au";
      case "Turkey": return "tr";
      default: return "us";
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 text-[14.5px] text-white font-medium px-6 py-2.5 rounded-[30px] border border-white/40 hover:bg-white/10 transition-all w-fit mt-2"
      >
        <img 
          src={`https://flagcdn.com/w20/${getFlagCode(country)}.png`} 
          alt={`${country} Flag`} 
          className="w-5 h-auto rounded-[2px]" 
        />
        <span>{country} - {language}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={() => setIsOpen(false)}>
          <div 
            className="bg-white text-primary-navy w-full max-w-[460px] rounded-[20px] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-7 pt-7 pb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-[22px] font-extrabold tracking-tight">Update your settings</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <p className="text-[15px] font-medium text-gray-500">Set what language you speak and where you live.</p>
            </div>

            {/* Form */}
            <div className="px-7 py-4 space-y-5">
              <div className="relative">
                <label className="text-[12px] font-bold text-gray-500 absolute top-2.5 left-4 z-10">Select a language</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="w-full pl-4 pr-10 pt-7 pb-2.5 bg-white border border-gray-300 rounded-xl text-[16px] font-semibold text-primary-navy appearance-none focus:outline-none focus:border-primary-navy focus:ring-1 focus:ring-primary-navy cursor-pointer transition-colors"
                >
                  <option value="English">English</option>
                  <option value="Español">Español</option>
                  <option value="Français">Français</option>
                  <option value="Deutsch">Deutsch</option>
                  <option value="Türkçe">Türkçe</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>

              <div className="relative">
                <label className="text-[12px] font-bold text-gray-500 absolute top-2.5 left-4 z-10">Select a country</label>
                <select 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full pl-4 pr-10 pt-7 pb-2.5 bg-white border border-gray-300 rounded-xl text-[16px] font-semibold text-primary-navy appearance-none focus:outline-none focus:border-primary-navy focus:ring-1 focus:ring-primary-navy cursor-pointer transition-colors"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Turkey">Turkey</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="px-7 py-6 flex justify-end gap-3 mt-2 border-t border-gray-100">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 rounded-[100px] border border-gray-300 text-[15px] font-bold text-primary-navy hover:bg-gray-50 hover:border-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-8 py-2.5 rounded-[100px] bg-[#FFC800] hover:bg-[#FFB800] text-[#0E3347] text-[15px] font-bold shadow-sm transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
