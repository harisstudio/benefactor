"use client";

import {
  IconEye,
  IconBolt,
  IconWorld,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();
  const stats = [
    { value: "0%", label: t("aboutStat1Label") },
    { value: "24h", label: t("aboutStat2Label") },
    { value: "100%", label: t("aboutStat3Label") },
    { value: "EU", label: t("aboutStat4Label") },
  ];
  const values = [
    { Icon: IconEye, title: t("aboutValue1Title"), desc: t("aboutValue1Desc") },
    { Icon: IconBolt, title: t("aboutValue2Title"), desc: t("aboutValue2Desc") },
    { Icon: IconWorld, title: t("aboutValue3Title"), desc: t("aboutValue3Desc") },
  ];
  return (
    <>
      <section className="bg-bg-off-white pt-16 md:pt-24 pb-12 md:pb-20">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-gray mb-4">
            {t("aboutEyebrow")}
          </p>
          <h1 className="font-heading text-[clamp(36px,5.5vw,64px)] leading-[1.05] tracking-[-0.02em] text-primary-navy font-extrabold mb-5">
            {t("aboutTitlePart1")} <span className="italic">{t("aboutTitleEmph")}</span>{t("aboutTitlePart2")}
          </h1>
          <p className="text-[clamp(16px,1.4vw,20px)] text-text-gray leading-[1.55] max-w-[640px]">
            {t("aboutLede")}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24 border-y border-surface-muted">
        <div className="max-w-[760px] mx-auto px-5 sm:px-8 space-y-10">
          <div>
            <h2 className="font-heading text-[clamp(22px,2.5vw,30px)] font-extrabold text-primary-navy tracking-[-0.01em] mb-4">
              {t("aboutOurStory")}
            </h2>
            <p className="text-[16px] text-text-gray leading-[1.75] mb-4">
              {t("aboutStoryP1")}
            </p>
            <p className="text-[16px] text-text-gray leading-[1.75]">
              {t("aboutStoryP2")}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-[clamp(22px,2.5vw,30px)] font-extrabold text-primary-navy tracking-[-0.01em] mb-4">
              {t("aboutWhatWeDo")}
            </h2>
            <p className="text-[16px] text-text-gray leading-[1.75]">
              {t("aboutWhatWeDoP")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bg-off-white py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)]">
          <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-extrabold text-primary-navy tracking-[-0.01em] mb-10 md:mb-14">
            {t("aboutCommitment")}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white border border-surface-muted rounded-2xl p-6 md:p-8"
              >
                <p className="font-heading text-[clamp(32px,4vw,52px)] font-extrabold text-primary-navy leading-none mb-3">
                  {s.value}
                </p>
                <p className="text-[13px] text-text-gray font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24 border-t border-surface-muted">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)]">
          <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-extrabold text-primary-navy tracking-[-0.01em] mb-10 md:mb-14">
            {t("aboutValues")}
          </h2>
          <div className="grid gap-8 md:gap-10 md:grid-cols-3">
            {values.map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-5">
                <Icon size={48} stroke={1.4} className="text-primary-navy" />
                <h3 className="font-heading text-[22px] font-extrabold text-primary-navy leading-tight">
                  {title}
                </h3>
                <p className="text-[15px] text-text-gray leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
