"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function LegalLinks() {
  const { t } = useLanguage();

  const links = [
    { key: "footerLegalTerms", href: "#" },
    { key: "footerLegalPrivacy", href: "#" },
    { key: "footerLegalContact", href: "#" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      {links.map((link) => (
        <Link
          key={link.key}
          href={link.href}
          className="text-[13px] font-medium text-primary-navy/70 hover:text-primary-navy transition-colors"
        >
          {t(link.key)}
        </Link>
      ))}
    </div>
  );
}
