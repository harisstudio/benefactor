"use client";

import Image from "next/image";
import Link from "next/link";
import { IconHome, IconCoin, IconHeartFilled } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export function DashboardNavbar() {
  const { t } = useLanguage();
  const navLinks = [
    { href: "/", label: t("navHome"), Icon: IconHome },
    { href: "/dashboard", label: t("navFundraisers"), Icon: IconCoin },
    { href: "#", label: t("navDonations"), Icon: IconHeartFilled },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-surface-muted">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center">
          <Image src="/assets/logo.svg" alt="Benefactor" width={140} height={28} className="h-auto w-[120px] md:w-[140px]" priority />
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {navLinks.map(({ href, label, Icon }) => (
            <Link
              key={label}
              href={href}
              className="inline-flex items-center gap-1.5 h-11 px-3 rounded-full text-[13px] font-semibold text-text-gray hover:text-primary-navy hover:bg-bg-off-white transition-colors"
            >
              <Icon size={16} stroke={1.7} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
          <Link
            href="/profile"
            className="ml-2 w-10 h-10 rounded-full bg-primary-navy text-white flex items-center justify-center font-heading text-[14px] font-extrabold hover:bg-primary-navy/90 transition-colors shadow-sm"
            aria-label={t("profile")}
          >
            H
          </Link>
        </div>
      </div>
    </nav>
  );
}
