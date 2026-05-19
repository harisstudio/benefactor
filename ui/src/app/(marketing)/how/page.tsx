"use client";

import Link from "next/link";
import {
  IconPencil,
  IconSend,
  IconCoin,
  IconCircleDashedNumber0,
  IconShieldCheck,
  IconBolt,
  IconWorld,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HowPage() {
  const { t } = useLanguage();

  const steps = [
    { n: 1, Icon: IconPencil, title: t("howStepAltTitle1"), desc: t("howStepAltDesc1") },
    { n: 2, Icon: IconSend, title: t("howStepAltTitle2"), desc: t("howStepAltDesc2") },
    { n: 3, Icon: IconCoin, title: t("howStepAltTitle3"), desc: t("howStepAltDesc3") },
  ];
  const features = [
    { Icon: IconCircleDashedNumber0, title: t("howFeat1Title"), desc: t("howFeat1Desc") },
    { Icon: IconShieldCheck, title: t("howFeat2Title"), desc: t("howFeat2Desc") },
    { Icon: IconBolt, title: t("howFeat3Title"), desc: t("howFeat3Desc") },
    { Icon: IconWorld, title: t("howFeat4Title"), desc: t("howFeat4Desc") },
  ];

  return (
    <>
      <section className="bg-bg-off-white pt-16 md:pt-24 pb-12 md:pb-20">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-gray mb-4">
            {t("howPageEyebrow")}
          </p>
          <h1 className="font-heading text-[clamp(36px,5.5vw,64px)] leading-[1.05] tracking-[-0.02em] text-primary-navy font-extrabold mb-5">
            {t("howPageTitlePart1")} <span className="italic">{t("howPageTitleEmph")}</span>{t("howPageTitlePart2")}
          </h1>
          <p className="text-[clamp(16px,1.4vw,20px)] text-text-gray leading-[1.55] max-w-[640px]">
            {t("howPageLede")}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24 border-y border-surface-muted">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)]">
          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            {steps.map(({ n, Icon, title, desc }) => (
              <div
                key={n}
                className="relative bg-bg-off-white border border-surface-muted rounded-3xl p-7 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary-navy text-white text-[14px] font-bold">
                    {n}
                  </span>
                  <Icon size={28} stroke={1.5} className="text-primary-navy" />
                </div>
                <h3 className="font-heading text-[20px] font-extrabold text-primary-navy mb-2">
                  {title}
                </h3>
                <p className="text-[15px] text-text-gray leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-off-white py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-extrabold text-primary-navy tracking-[-0.01em] mb-10 md:mb-14">
            {t("howWhyHeading")}
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {features.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-5 bg-white border border-surface-muted rounded-2xl p-6 hover:shadow-md transition-all"
              >
                <Icon size={36} stroke={1.5} className="text-primary-navy shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-[17px] font-extrabold text-primary-navy mb-1.5">
                    {title}
                  </h4>
                  <p className="text-[14px] text-text-gray leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24 border-t border-surface-muted">
        <div className="max-w-[700px] mx-auto px-5 text-center">
          <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-extrabold text-primary-navy tracking-[-0.01em] mb-4">
            {t("howReadyHeading")}
          </h2>
          <p className="text-[16px] text-text-gray mb-8">
            {t("howReadyDesc")}
          </p>
          <Link
            href="/start"
            className="inline-flex items-center justify-center h-[52px] px-8 rounded-[100px] font-bold text-[16px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all"
          >
            {t("startBenefactor")}
          </Link>
        </div>
      </section>
    </>
  );
}
