"use client";

import { IconSchool, IconShare3, IconSettings } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export function FundraiserList() {
  const { t } = useLanguage();
  return (
    <div>
      <h2 className="font-heading text-[20px] md:text-[22px] font-extrabold text-primary-navy mb-5 tracking-[-0.01em]">
        {t("dashYourFundraisers")}
      </h2>
      <div className="bg-white border border-surface-muted rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-primary-yellow/20 flex items-center justify-center shrink-0">
          <IconSchool size={26} stroke={1.6} className="text-primary-navy" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-[16px] font-extrabold text-primary-navy">
            {t("dashSampleFundraiserTitle")}
          </h3>
          <p className="text-[12px] text-text-gray mt-1">
            {t("dashSampleFundraiserMeta")}
          </p>
          <div className="mt-3 h-2 bg-surface-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary-yellow rounded-full" style={{ width: "35%" }} />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-[12px] text-text-gray">
            <span><strong className="text-primary-navy font-bold">£2,450</strong> {t("dashRaisedLower")}</span>
            <span>{t("dashOfGoalLower", { amount: "£7,000" })}</span>
            <span><strong className="text-primary-navy font-bold">48</strong> {t("dashDonationsLower")}</span>
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-[100px] text-[13px] font-bold bg-primary-navy text-white hover:bg-primary-navy/90 transition-all"
          >
            <IconSettings size={15} stroke={1.8} />
            {t("dashManage")}
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-[100px] text-[13px] font-semibold border border-surface-muted text-primary-navy hover:bg-bg-off-white transition-all"
          >
            <IconShare3 size={15} stroke={1.8} />
            {t("share")}
          </button>
        </div>
      </div>
    </div>
  );
}
