"use client";

import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export function DashboardHeader() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-gray mb-2">
          {t("dashYourAccount")}
        </p>
        <h1 className="font-heading text-[clamp(28px,3.4vw,42px)] font-extrabold text-primary-navy tracking-[-0.015em]">
          {t("dashTitle")}
        </h1>
      </div>
      <Link
        href="/start"
        className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-[100px] text-[14px] font-bold bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all self-start"
      >
        <IconPlus size={16} stroke={2.4} />
        {t("dashNewFundraiser")}
      </Link>
    </div>
  );
}
