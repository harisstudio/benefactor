"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowRight, IconSparkles } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { SupportProjectModal } from "./support-project-modal";

export function RedesignLogoShowcase() {
  const { t } = useLanguage();
  const [supportOpen, setSupportOpen] = useState(false);
  return (
    <section className="bg-bg-off-white py-16 md:py-24 border-y border-surface-muted">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)]">
        <div className="grid gap-10 md:gap-14 lg:grid-cols-[1fr_1.1fr] items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-primary-yellow/20 text-primary-navy text-[11px] font-bold uppercase tracking-[0.14em] mb-5">
              <IconSparkles size={13} stroke={2.2} />
              {t("showcaseBadge")}
            </span>
            <h2 className="font-heading text-[clamp(28px,3.4vw,42px)] font-extrabold text-primary-navy tracking-[-0.01em] leading-[1.1] mb-5">
              {t("showcaseTitle")}
            </h2>
            <p className="text-[16px] text-text-gray leading-relaxed max-w-[480px] mb-7">
              {t("showcaseDesc")}
            </p>

            <button
              type="button"
              onClick={() => setSupportOpen(true)}
              className="inline-flex items-center gap-1.5 h-[48px] px-6 rounded-[100px] font-bold text-[14px] bg-primary-navy text-white hover:bg-primary-navy/90 active:scale-[0.98] transition-all"
            >
              {t("showcaseCta")}
              <IconArrowRight size={17} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link
              href="/campaigns/1"
              aria-label={t("showcaseTitle")}
              className="group relative w-full aspect-[4/3] rounded-[28px] border border-surface-muted shadow-lg overflow-hidden block"
            >
              <Image
                src="/assets/books-stationery.jpg"
                alt={t("showcaseImageAlt")}
                fill
                sizes="(max-width: 1024px) 90vw, 640px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-primary-navy/80 via-primary-navy/20 to-transparent">
                <p className="text-white text-[14px] font-semibold">
                  {t("showcaseImageCaption")}
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      <SupportProjectModal open={supportOpen} onClose={() => setSupportOpen(false)} />
    </section>
  );
}
