"use client";

import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft, IconLock } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export function CheckoutNavbar() {
  const { t } = useLanguage();
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-surface-muted">
      <div className="max-w-[1200px] mx-auto h-16 px-4 md:px-8 grid grid-cols-[1fr_auto_1fr] items-center">
        <Link
          href="/campaigns/1"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-text-gray hover:text-primary-navy transition-colors min-h-[44px] justify-self-start"
        >
          <IconArrowLeft size={16} stroke={1.8} />
          <span className="hidden sm:inline">{t("backToCampaign")}</span>
          <span className="sm:hidden">{t("back")}</span>
        </Link>

        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/assets/logo.svg"
            alt="Benefactor"
            width={140}
            height={28}
            className="h-auto w-[120px] md:w-[140px]"
            priority
          />
        </Link>

        <div className="justify-self-end flex items-center gap-3 sm:gap-4">
          <span className="hidden md:inline-flex items-center gap-1.5 text-[12px] font-semibold text-text-gray">
            <IconLock size={14} stroke={1.8} className="text-emerald-600" />
            {t("securedByStripe")}
          </span>
          <Link
            href="/signin"
            className="text-[13px] font-semibold text-primary-navy hover:underline min-h-[44px] flex items-center"
          >
            {t("signin")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
