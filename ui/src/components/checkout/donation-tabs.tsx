"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface DonationTabsProps {
  frequency: "once" | "monthly";
  onChange: (frequency: "once" | "monthly") => void;
}

export function DonationTabs({ frequency, onChange }: DonationTabsProps) {
  const { t } = useLanguage();
  return (
    <div>
      <div className="flex bg-bg-off-white border border-surface-muted rounded-[100px] p-1">
        <button
          type="button"
          onClick={() => onChange("once")}
          className={cn(
            "flex-1 h-11 px-5 rounded-[100px] text-[14px] font-bold transition-all min-h-[44px]",
            frequency === "once"
              ? "bg-primary-yellow text-primary-navy shadow-sm"
              : "text-primary-navy hover:bg-white/60",
          )}
        >
          {t("checkoutGiveOnce")}
        </button>
        <button
          type="button"
          onClick={() => onChange("monthly")}
          className={cn(
            "flex-1 h-11 px-5 rounded-[100px] text-[14px] font-bold transition-all min-h-[44px]",
            frequency === "monthly"
              ? "bg-primary-yellow text-primary-navy shadow-sm"
              : "text-primary-navy hover:bg-white/60",
          )}
        >
          {t("checkoutMonthly")}
        </button>
      </div>
      <p className="text-[12px] text-text-gray mt-2.5 text-center">
        {t("checkoutMonthlyNote")}
      </p>
    </div>
  );
}
