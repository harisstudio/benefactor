"use client";

import React, { useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { useLanguage } from "@/context/LanguageContext";
import { SUPPORTED_LANGUAGES, SUPPORTED_COUNTRIES, LanguageCode, CountryCode } from "@/lib/i18n/config";

const legacyMapping: Record<string, any> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  tr: "Türkçe"
};

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 ml-1.5 opacity-70">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export function LocaleSelector() {
  const { language, country, setLanguage, setCountry, t } = useLocale();
  const { setLanguage: setLegacyLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language);
  const currentCountry = SUPPORTED_COUNTRIES.find(c => c.code === country);

  const handleLanguageChange = (code: LanguageCode) => {
    setLanguage(code);
    if (legacyMapping[code]) {
      setLegacyLanguage(legacyMapping[code]);
    }
  };

  // In a real app we might close on outside click, but here we just toggle
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 -ml-3 rounded-md hover:bg-white/10 transition-colors text-[14px] font-medium text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <GlobeIcon />
        <span>{currentLang?.nativeName}</span>
        <span className="text-white/40 font-light px-0.5">|</span>
        <span>{currentCountry?.name}</span>
        <ChevronIcon />
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 w-full min-w-[300px] sm:min-w-[400px] bg-white rounded-xl shadow-2xl p-6 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-lg font-bold text-primary-navy">
              Settings
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {/* Language Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                {t('footer.selectLanguage')}
              </label>
              <select 
                title={t('footer.selectLanguage')}
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as LanguageCode)}
                className="w-full h-11 bg-gray-50 border border-gray-200 text-primary-navy text-sm rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-all"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Country Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                {t('footer.selectCountry')}
              </label>
              <select 
                title={t('footer.selectCountry')}
                value={country}
                onChange={(e) => setCountry(e.target.value as CountryCode)}
                className="w-full h-11 bg-gray-50 border border-gray-200 text-primary-navy text-sm rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-all"
              >
                {SUPPORTED_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button 
            onClick={() => setIsOpen(false)}
            className="w-full h-11 bg-primary-yellow hover:bg-[#E5B400] text-primary-navy font-bold rounded-lg transition-colors"
          >
            Save settings
          </button>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
