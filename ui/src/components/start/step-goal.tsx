"use client";

import { useLanguage } from "@/context/LanguageContext";

interface StepGoalProps {
  amount: string;
  autoGoal: boolean;
  onAmountChange: (value: string) => void;
  onAutoGoalToggle: () => void;
}

export function StepGoal({ amount, autoGoal, onAmountChange, onAutoGoalToggle }: StepGoalProps) {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-[11px] font-semibold text-text-gray mb-2 uppercase tracking-[0.1em]">
          {t("stepGoalAmount")}
        </label>
        <div className="flex items-center border border-surface-muted rounded-[14px] overflow-hidden bg-white focus-within:border-primary-navy focus-within:ring-2 focus-within:ring-primary-navy/10 transition-all">
          <span className="font-heading text-[24px] font-extrabold text-primary-navy pl-5">£</span>
          <input
            type="text"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="0"
            className="flex-1 h-14 px-3 font-heading text-[22px] font-extrabold text-primary-navy outline-none placeholder:text-text-gray/50 bg-transparent"
          />
          <span className="text-[12px] font-semibold text-text-gray uppercase tracking-wider pr-5">GBP</span>
        </div>
        <p className="text-[13px] text-text-gray mt-2.5">
          {t("stepGoalHint")}
        </p>
      </div>

      <div className="flex items-start justify-between gap-4 p-5 bg-bg-off-white border border-surface-muted rounded-2xl">
        <div className="flex-1 min-w-0">
          <span className="inline-block px-2.5 py-0.5 bg-primary-yellow text-primary-navy text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">
            {t("stepGoalRecommended")}
          </span>
          <h4 className="font-heading text-[15px] font-extrabold text-primary-navy">
            {t("stepGoalAutoTitle")}
          </h4>
          <p className="text-[13px] text-text-gray mt-1 leading-relaxed">
            {t("stepGoalAutoDesc")}{" "}
            <a href="#" className="underline font-semibold text-primary-navy">{t("stepGoalMore")}</a>
          </p>
        </div>
        <button
          type="button"
          onClick={onAutoGoalToggle}
          className={`relative shrink-0 w-12 h-7 rounded-full transition-colors mt-0.5 ${autoGoal ? "bg-primary-navy" : "bg-surface-muted"}`}
          role="switch"
          aria-checked={autoGoal}
          aria-label={t("stepGoalAutoAria")}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${autoGoal ? "translate-x-5" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
