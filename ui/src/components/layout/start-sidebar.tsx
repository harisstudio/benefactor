"use client";

import Image from "next/image";
import Link from "next/link";
import { IconCircleCheck } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

interface StartSidebarProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle: string;
}

export function StartSidebar({
  currentStep,
  title,
  subtitle,
}: StartSidebarProps) {
  const { t } = useLanguage();
  const labels = [
    t("wizardSidebarStep1"),
    t("wizardSidebarStep2"),
    t("wizardSidebarStep3"),
    t("wizardSidebarStep4"),
    t("wizardSidebarStep5"),
    t("wizardSidebarStep6"),
  ];
  return (
    <aside className="hidden lg:flex flex-col w-[38%] max-w-[520px] min-h-screen bg-primary-navy text-white p-10 sticky top-0">
      <Link href="/" className="inline-flex">
        <Image src="/assets/logo-dark.png" alt="Benefactor" width={140} height={28} className="h-auto w-[140px]" />
      </Link>

      <div className="my-auto">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-yellow mb-4">
          {t("wizardStepOf", { current: Math.min(currentStep + 1, 6), total: 6 })}
        </p>
        <h1 className="font-heading text-[clamp(28px,3vw,40px)] font-extrabold leading-[1.1] tracking-[-0.015em] !text-white mb-4">
          {title}
        </h1>
        <p className="text-[15px] text-white/70 leading-relaxed max-w-[360px]">
          {subtitle}
        </p>
      </div>

      <ol className="space-y-2.5">
        {labels.map((label, i) => {
          const isDone = i < currentStep;
          const isActive = i === currentStep;
          return (
            <li
              key={label}
              className={`flex items-center gap-3 text-[13px] ${
                isActive ? "text-white" : isDone ? "text-white/70" : "text-white/40"
              }`}
            >
              <span
                className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  isActive
                    ? "bg-primary-yellow text-primary-navy"
                    : isDone
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-white/40 border border-white/10"
                }`}
              >
                {isDone ? <IconCircleCheck size={14} stroke={2.2} /> : i + 1}
              </span>
              <span className="font-semibold">{label}</span>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
