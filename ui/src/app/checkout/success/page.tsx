"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconCheck, IconArrowLeft, IconHeartHandshake, IconShare3 } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CheckoutSuccessPage() {
  const { t } = useLanguage();

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-off-white flex flex-col">
      {/* Soft background accents */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-primary-yellow/20 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-emerald-200/30 blur-3xl pointer-events-none"
      />

      {/* Header with logo */}
      <header className="relative z-10 px-5 sm:px-8 lg:px-12 py-6">
        <Link href="/" className="inline-flex">
          <Image
            src="/assets/logo.svg"
            alt="Benefactor"
            width={140}
            height={28}
            className="h-auto w-[120px] sm:w-[140px]"
            priority
          />
        </Link>
      </header>

      {/* Centered content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-5 py-8">
        <div className="max-w-[640px] w-full text-center">
          {/* Animated green check */}
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.05 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500 shadow-[0_12px_40px_-8px_rgba(16,185,129,0.55)] mb-7"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.35, type: "spring", stiffness: 260, damping: 16 }}
            >
              <IconCheck size={52} className="text-white" stroke={3} />
            </motion.div>
          </motion.div>

          {/* Thank you heading */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="font-heading text-[clamp(32px,5vw,52px)] leading-[1.05] tracking-[-0.02em] font-extrabold text-primary-navy mb-4"
          >
            {t("successHeading")}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="font-heading italic text-[clamp(18px,2.2vw,24px)] text-emerald-700 font-semibold mb-5"
          >
            {t("successTagline")}
          </motion.p>

          {/* Body message */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="text-[clamp(15px,1.5vw,17px)] text-text-gray leading-[1.65] max-w-[520px] mx-auto mb-10"
          >
            {t("successBody")}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-1.5 h-[52px] px-7 rounded-[100px] font-bold text-[15px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all"
            >
              <IconArrowLeft size={17} />
              {t("successBackHome")}
            </Link>
            <Link
              href="/campaigns/1"
              className="inline-flex items-center justify-center gap-1.5 h-[52px] px-6 rounded-[100px] font-semibold text-[14px] text-primary-navy bg-white border border-surface-muted hover:bg-bg-off-white transition-all"
            >
              <IconHeartHandshake size={17} />
              {t("successViewCampaign")}
            </Link>
            <button
              type="button"
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.share) {
                  navigator.share({
                    title: "Benefactor",
                    text: t("successShareText"),
                    url: window.location.origin,
                  }).catch(() => {});
                } else {
                  navigator.clipboard?.writeText(window.location.origin);
                }
              }}
              className="inline-flex items-center justify-center gap-1.5 h-[52px] px-6 rounded-[100px] font-semibold text-[14px] text-primary-navy bg-white border border-surface-muted hover:bg-bg-off-white transition-all"
            >
              <IconShare3 size={17} />
              {t("successShare")}
            </button>
          </motion.div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="text-[12px] text-text-gray/80"
          >
            {t("successReceiptNote")}
          </motion.p>
        </div>
      </div>
    </main>
  );
}
