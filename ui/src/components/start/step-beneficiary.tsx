"use client";

import { IconUser, IconUsers, IconHeartHandshake } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

type Beneficiary = "yourself" | "someone" | "charity" | "";

interface StepBeneficiaryProps {
  selected: Beneficiary;
  onSelect: (value: Beneficiary) => void;
}

export function StepBeneficiary({ selected, onSelect }: StepBeneficiaryProps) {
  const { t } = useLanguage();
  const options: {
    key: Beneficiary;
    title: string;
    description: string;
    Icon: typeof IconUser;
  }[] = [
    { key: "yourself", title: t("stepBenYourselfTitle"), description: t("stepBenYourselfDesc"), Icon: IconUser },
    { key: "someone", title: t("stepBenSomeoneTitle"), description: t("stepBenSomeoneDesc"), Icon: IconUsers },
    { key: "charity", title: t("stepBenCharityTitle"), description: t("stepBenCharityDesc"), Icon: IconHeartHandshake },
  ];

  return (
    <div className="space-y-3">
      <h2 className="font-heading text-[18px] font-extrabold text-primary-navy mb-2">
        {t("stepBeneficiaryHeading")}
      </h2>
      {options.map((opt) => {
        const isSelected = selected === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onSelect(opt.key)}
            className={cn(
              "w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all",
              isSelected
                ? "border-primary-navy bg-primary-navy/5 shadow-sm"
                : "border-surface-muted bg-white hover:border-primary-navy/40 hover:shadow-sm",
            )}
          >
            <span
              className={cn(
                "shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center",
                isSelected ? "bg-primary-navy text-white" : "bg-bg-off-white text-primary-navy",
              )}
            >
              <opt.Icon size={24} stroke={1.7} />
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-[15px] font-extrabold text-primary-navy">
                {opt.title}
              </h3>
              <p className="text-[13px] text-text-gray mt-0.5 leading-relaxed">
                {opt.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
