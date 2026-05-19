"use client";

import React, { useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { useLanguage } from "@/context/LanguageContext";
import { SUPPORTED_LANGUAGES, SUPPORTED_COUNTRIES, LanguageCode, CountryCode } from "@/lib/i18n/config";

const LEGACY_SUPPORTED = ["en", "lt", "ru", "tr", "de", "fr", "es"];

import { IconWorld, IconChevronDown, IconX } from "@tabler/icons-react";

export function LocaleSelector() {
  const { language, country, setLanguage, setCountry } = useLocale();
  const { setLanguage: setLegacyLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language);
  const currentCountry = SUPPORTED_COUNTRIES.find(c => c.code === country);

  const handleLanguageChange = (code: LanguageCode) => {
    setLanguage(code);
    if (LEGACY_SUPPORTED.includes(code)) {
      setLegacyLanguage(code as any);
    }
  };

  // In a real app we might close on outside click, but here we just toggle
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 h-11 px-4 rounded-[100px] border border-surface-muted bg-white hover:border-primary-navy/30 transition-colors text-[13px] font-semibold text-primary-navy focus:outline-none focus:ring-2 focus:ring-primary-navy/10"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <IconWorld size={16} stroke={1.8} />
        <span>{currentLang?.nativeName}</span>
        <span className="text-text-gray/40 font-light">·</span>
        <span>{currentCountry?.name}</span>
        <IconChevronDown size={14} stroke={2} className="opacity-60" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal — centered, above everything */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 pointer-events-none">
            <div
              className="pointer-events-auto w-full max-w-[460px] bg-white rounded-2xl shadow-2xl border border-surface-muted p-6 animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-heading text-[18px] font-extrabold text-primary-navy">
                  {t("localeRegionLanguage")}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label={t("localeClose")}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-bg-off-white text-text-gray transition-colors"
                >
                  <IconX size={16} stroke={1.8} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-text-gray mb-2">
                    {t('localeLanguage')}
                  </label>
                  <select
                    title={t('localeLanguage')}
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value as LanguageCode)}
                    className="w-full h-11 bg-bg-off-white border border-surface-muted text-primary-navy text-[14px] font-medium rounded-[14px] px-3 focus:outline-none focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/10 transition-all"
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.nativeName} ({lang.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-text-gray mb-2">
                    {t('localeCountry')}
                  </label>
                  <select
                    title={t('localeCountry')}
                    value={country}
                    onChange={(e) => setCountry(e.target.value as CountryCode)}
                    className="w-full h-11 bg-bg-off-white border border-surface-muted text-primary-navy text-[14px] font-medium rounded-[14px] px-3 focus:outline-none focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/10 transition-all"
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
                className="w-full h-12 bg-primary-yellow hover:bg-primary-yellow-hover text-primary-navy font-bold text-[14px] rounded-[100px] shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
              >
                {t("localeSave")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
