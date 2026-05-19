"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  IconLock,
  IconUserCheck,
  IconBuildingBank,
  IconPencil,
  IconSend,
  IconHeartHandshake,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export function RedesignHowAndTrust() {
  const { t } = useLanguage();

  const steps = [
    { n: 1, Icon: IconPencil, title: t("howStep1Title"), desc: t("howStep1Desc") },
    { n: 2, Icon: IconSend, title: t("howStep2Title"), desc: t("howStep2Desc") },
    { n: 3, Icon: IconHeartHandshake, title: t("howStep3Title"), desc: t("howStep3Desc") },
  ];

  const trust = [
    { Icon: IconLock, title: t("trustItem1Title"), desc: t("trustItem1Desc") },
    { Icon: IconUserCheck, title: t("trustItem2Title"), desc: t("trustItem2Desc") },
    { Icon: IconBuildingBank, title: t("trustItem3Title"), desc: t("trustItem3Desc") },
  ];

  return (
    <>
      {/* How it works */}
      <section className="bg-white py-16 md:py-24 border-y border-surface-muted">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)]">
          <div className="mb-12 md:mb-16">
            <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-extrabold text-primary-navy tracking-[-0.01em]">
              {t("howHeading")}
            </h2>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            {steps.map(({ n, Icon, title, desc }, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                className="relative bg-bg-off-white border border-surface-muted rounded-3xl p-7 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-navy text-white text-[14px] font-bold">
                    {n}
                  </span>
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-yellow/25">
                    <Icon size={24} className="text-primary-navy" stroke={1.8} />
                  </span>
                </div>

                <h3 className="font-heading text-[20px] font-extrabold text-primary-navy mb-2">
                  {title}
                </h3>
                <p className="text-[15px] text-text-gray leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 md:mt-16">
            <Link
              href="/start"
              className="inline-flex items-center justify-center h-[52px] px-8 rounded-[100px] font-bold text-[16px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all"
            >
              {t("startBenefactor")}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="bg-[#635bff] py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)]">
          <div className="mb-12 md:mb-16">
            <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-extrabold tracking-[-0.01em] !text-white">
              {t("trustHeading")}
            </h2>
          </div>

          <div className="grid gap-8 md:gap-10 md:grid-cols-3">
            {trust.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                className="flex flex-col gap-5"
              >
                <Icon size={56} stroke={1.4} className="text-white" />
                <h3 className="font-heading text-[22px] md:text-[24px] font-extrabold !text-white leading-tight">
                  {title}
                </h3>
                <p className="text-[15px] text-white/85 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Stripe logo strip */}
          <div className="mt-14 pt-10 border-t border-white/20 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
              {t("poweredBy")}
            </p>
            <Image
              src="/assets/stripe-logo.png"
              alt="Stripe"
              width={80}
              height={34}
              className="h-8 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>
    </>
  );
}
