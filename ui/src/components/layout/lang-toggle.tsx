"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

/**
 * Compact EN / LT segmented toggle for the top navbar.
 */
export function LangToggle({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  const isLt = language === "lt";

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center h-9 rounded-full border border-surface-muted bg-white p-0.5 text-[12px] font-bold shadow-sm",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setLanguage("en" as any)}
        aria-pressed={!isLt}
        className={cn(
          "h-8 px-3 rounded-full transition-colors",
          !isLt
            ? "bg-primary-navy text-white"
            : "text-primary-navy hover:bg-bg-off-white",
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("lt" as any)}
        aria-pressed={isLt}
        className={cn(
          "h-8 px-3 rounded-full transition-colors",
          isLt
            ? "bg-primary-navy text-white"
            : "text-primary-navy hover:bg-bg-off-white",
        )}
      >
        LT
      </button>
    </div>
  );
}
