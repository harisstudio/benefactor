"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  LanguageCode, 
  CountryCode, 
  SUPPORTED_LANGUAGES, 
  SUPPORTED_COUNTRIES, 
  CYRILLIC_LANGUAGES 
} from "./config";
import { dictionary, TranslationKey } from "./translations";

interface LocaleContextType {
  language: LanguageCode;
  country: CountryCode;
  setLanguage: (lang: LanguageCode) => void;
  setCountry: (country: CountryCode) => void;
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleContextType>({
  language: 'en',
  country: 'GB',
  setLanguage: () => {},
  setCountry: () => {},
  t: (key) => key,
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [country, setCountryState] = useState<CountryCode>('GB');

  useEffect(() => {
    // Client-side hydration from storage
    const savedLang = localStorage.getItem("benefactor_locale_lang") as LanguageCode;
    const savedCountry = localStorage.getItem("benefactor_locale_country") as CountryCode;

    if (savedLang && SUPPORTED_LANGUAGES.some(l => l.code === savedLang)) {
      setLanguageState(savedLang);
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language?.split('-')[0].toLowerCase();
      if (browserLang && SUPPORTED_LANGUAGES.some(l => l.code === browserLang)) {
        setLanguageState(browserLang as LanguageCode);
      }
    }

    if (savedCountry && SUPPORTED_COUNTRIES.some(c => c.code === savedCountry)) {
      setCountryState(savedCountry);
    } else {
      // Attempt to read region from browser language like "en-GB", "en-US"
      const browserRegion = navigator.language?.split('-')[1]?.toUpperCase();
      if (browserRegion && SUPPORTED_COUNTRIES.some(c => c.code === browserRegion)) {
        setCountryState(browserRegion as CountryCode);
      }
    }
  }, []);

  useEffect(() => {
    // Dynamic Font Switching Logic
    const isCyrillic = CYRILLIC_LANGUAGES.includes(language);
    
    // Manage class on body or html for the font variable
    // inter is default, manrope for cyrillic
    if (isCyrillic) {
      document.documentElement.style.setProperty('--font-primary', 'var(--font-manrope)');
    } else {
      document.documentElement.style.setProperty('--font-primary', 'var(--font-inter)');
    }
  }, [language]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem("benefactor_locale_lang", lang);
  };

  const setCountry = (c: CountryCode) => {
    setCountryState(c);
    localStorage.setItem("benefactor_locale_country", c);
  };

  const t = (key: TranslationKey): string => {
    return dictionary[language]?.[key] || dictionary['en'][key] || key;
  };

  return (
    <LocaleContext.Provider value={{ language, country, setLanguage, setCountry, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
