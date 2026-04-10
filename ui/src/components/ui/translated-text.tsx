"use client";

import { useLanguage } from "@/context/LanguageContext";

export function TranslatedText({ tKey, fallback }: { tKey: string; fallback?: string }) {
  const { t, language } = useLanguage();
  
  // A tiny local fallback logic if we didn't add every single string
  // For the sake of the prototype, if translation is missing, return fallback or key.
  const translated = t(tKey);
  return <>{translated !== tKey ? translated : (fallback || tKey)}</>;
}
