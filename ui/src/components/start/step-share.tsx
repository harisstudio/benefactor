"use client";

import Link from "next/link";
import { IconCircleCheck } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export function StepShare() {
  const { t } = useLanguage();
  const steps = [
    { n: 1, title: t("stepShareStep1Title"), desc: t("stepShareStep1Desc") },
    { n: 2, title: t("stepShareStep2Title"), desc: t("stepShareStep2Desc") },
    { n: 3, title: t("stepShareStep3Title"), desc: t("stepShareStep3Desc") },
  ];
  return (
    <div className="text-center space-y-8 py-8 md:py-12">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100">
        <IconCircleCheck size={42} stroke={1.6} className="text-emerald-600" />
      </div>

      <div className="space-y-3">
        <h2 className="font-heading text-[clamp(26px,3.4vw,38px)] font-extrabold text-primary-navy tracking-[-0.015em]">
          {t("stepShareSubmissionReceived")}
        </h2>
        <p className="text-[15px] text-text-gray max-w-[440px] mx-auto leading-relaxed">
          {t("stepShareDesc")}
        </p>
      </div>

      <div className="bg-bg-off-white border border-surface-muted rounded-2xl p-6 text-left max-w-[440px] mx-auto">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-gray mb-4">
          {t("stepShareWhatNext")}
        </p>
        <ul className="space-y-4">
          {steps.map(({ n, title, desc }) => (
            <li key={n} className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-primary-navy text-white flex items-center justify-center text-[12px] font-bold">
                {n}
              </span>
              <div>
                <p className="text-[14px] font-bold text-primary-navy">{title}</p>
                <p className="text-[13px] text-text-gray mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center max-w-[440px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center justify-center h-12 px-8 rounded-[100px] font-bold text-[14px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all"
        >
          {t("stepShareBackHome")}
        </Link>
      </div>
    </div>
  );
}
