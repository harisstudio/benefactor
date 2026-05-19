"use client";

import Link from "next/link";
import {
  IconTarget,
  IconHome,
  IconTrendingUp,
  IconHeart,
  IconUsersGroup,
  IconGift,
  IconBuilding,
  IconMapPin,
  IconClock,
  IconArrowRight,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CareersPage() {
  const { t } = useLanguage();
  const perks = [
    { Icon: IconTarget, title: t("careersPerk1Title"), desc: t("careersPerk1Desc") },
    { Icon: IconHome, title: t("careersPerk2Title"), desc: t("careersPerk2Desc") },
    { Icon: IconTrendingUp, title: t("careersPerk3Title"), desc: t("careersPerk3Desc") },
    { Icon: IconHeart, title: t("careersPerk4Title"), desc: t("careersPerk4Desc") },
    { Icon: IconUsersGroup, title: t("careersPerk5Title"), desc: t("careersPerk5Desc") },
    { Icon: IconGift, title: t("careersPerk6Title"), desc: t("careersPerk6Desc") },
  ];
  const roles = [
    { id: "senior-frontend", title: t("careersRoleSeniorFrontend"), department: t("careersDeptEngineering"), location: t("careersLocRemote"), type: t("careersFullTime") },
    { id: "product-designer", title: t("careersRoleProductDesigner"), department: t("careersDeptDesign"), location: t("careersLocRemote"), type: t("careersFullTime") },
    { id: "community-manager", title: t("careersRoleCommunityManager"), department: t("careersDeptCommunity"), location: t("careersLocLondon"), type: t("careersFullTime") },
    { id: "data-analyst", title: t("careersRoleDataAnalyst"), department: t("careersDeptAnalytics"), location: t("careersLocRemote"), type: t("careersFullTime") },
    { id: "marketing-specialist", title: t("careersRoleMarketingSpecialist"), department: t("careersDeptMarketing"), location: t("careersLocRemote"), type: t("careersFullTime") },
    { id: "content-editor", title: t("careersRoleContentEditor"), department: t("careersDeptMarketing"), location: t("careersLocRemote"), type: t("careersFullTime") },
    { id: "volunteer", title: t("careersRoleVolunteer"), department: t("careersDeptCommunity"), location: t("careersLocRemote"), type: t("careersVolunteer") },
  ];
  return (
    <>
      <section className="bg-bg-off-white pt-16 md:pt-24 pb-12 md:pb-20">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-gray mb-4">
            {t("careersEyebrow")}
          </p>
          <h1 className="font-heading text-[clamp(36px,5.5vw,64px)] leading-[1.05] tracking-[-0.02em] text-primary-navy font-extrabold mb-5">
            {t("careersTitlePart1")} <span className="italic">{t("careersTitleEmph")}</span>{t("careersTitlePart2")}
          </h1>
          <p className="text-[clamp(16px,1.4vw,20px)] text-text-gray leading-[1.55] max-w-[640px]">
            {t("careersLede")}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24 border-y border-surface-muted">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)]">
          <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-extrabold text-primary-navy tracking-[-0.01em] mb-10 md:mb-14">
            {t("careersWhyHeading")}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-bg-off-white border border-surface-muted rounded-2xl p-7 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <Icon size={36} stroke={1.5} className="text-primary-navy mb-5" />
                <h3 className="font-heading text-[18px] font-extrabold text-primary-navy mb-2">
                  {title}
                </h3>
                <p className="text-[14px] text-text-gray leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-off-white py-16 md:py-24">
        <div className="max-w-[920px] mx-auto px-5 sm:px-8">
          <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-extrabold text-primary-navy tracking-[-0.01em] mb-3">
            {t("careersOpenPositions")}
          </h2>
          <p className="text-[15px] text-text-gray leading-relaxed mb-10 md:mb-14 max-w-[640px]">
            {t("careersVolunteerCallout")}
          </p>
          <div className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.id}
                className="bg-white border border-surface-muted rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-primary-yellow hover:shadow-md transition-all"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-[18px] font-extrabold text-primary-navy mb-2">
                    {role.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-text-gray">
                    <span className="inline-flex items-center gap-1.5">
                      <IconBuilding size={15} stroke={1.6} />
                      {role.department}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <IconMapPin size={15} stroke={1.6} />
                      {role.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <IconClock size={15} stroke={1.6} />
                      {role.type}
                    </span>
                  </div>
                </div>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-[100px] text-[14px] font-bold bg-primary-yellow text-primary-navy hover:bg-primary-yellow-hover transition-all whitespace-nowrap"
                >
                  {t("careersApply")}
                  <IconArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24 border-t border-surface-muted">
        <div className="max-w-[700px] mx-auto px-5 text-center">
          <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-extrabold text-primary-navy tracking-[-0.01em] mb-4">
            {t("careersNoRoleHeading")}
          </h2>
          <p className="text-[16px] text-text-gray mb-8">
            {t("careersNoRoleDesc")}
          </p>
          <a
            href="mailto:careers@benefactorteam.com"
            className="inline-flex items-center justify-center h-[52px] px-8 rounded-[100px] font-bold text-[16px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all"
          >
            {t("careersGetInTouch")}
          </a>
        </div>
      </section>
    </>
  );
}
