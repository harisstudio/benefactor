"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function SimpleNavbar() {
  const { t } = useLanguage();
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-surface-muted">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)] h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/assets/logo.svg" alt="Benefactor" width={140} height={28} className="h-auto w-[120px] md:w-[140px]" priority />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/signin"
            className="hidden sm:inline-flex items-center h-11 px-4 text-sm font-semibold text-primary-navy hover:underline"
          >
            {t("signin")}
          </Link>
          <Link
            href="/start"
            className="inline-flex items-center justify-center h-11 px-5 sm:px-6 rounded-[100px] text-[14px] font-bold bg-primary-yellow text-primary-navy hover:bg-primary-yellow-hover transition-colors"
          >
            {t("startBenefactor")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
