"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { TranslationKey } from "@/lib/i18n/translations";

const links: { key: TranslationKey; href: string }[] = [
  { key: 'footer.legal.terms', href: '#' },
  { key: 'footer.legal.privacy', href: '#' },
  { key: 'footer.legal.contact', href: '#' },
];

export function LegalLinks() {
  const { t } = useLocale();

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
