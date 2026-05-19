"use client";

import Image from "next/image";
import { IconLock, IconUserCheck, IconShieldLock } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export function TrustSection() {
  const { t } = useLanguage();

  const items = [
    { Icon: IconLock, label: t("footerTrustSecure") },
    { Icon: IconUserCheck, label: t("footerTrustVerified") },
    { Icon: IconShieldLock, label: t("footerTrustData") },
  ];

  return (
    <div className="flex flex-col gap-5 py-8 border-t border-surface-muted w-full mt-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 text-[14px] font-medium text-text-gray">
          {items.map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon size={18} stroke={1.7} className="text-primary-navy" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-gray/70">
            {t("poweredBy")}
          </span>
          <Image
            src="/assets/stripe-logo.png"
            alt="Stripe"
            width={70}
            height={30}
            className="h-7 w-auto opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      <p className="text-[12px] text-text-gray/70 max-w-3xl leading-relaxed">
        {t("footerStripeNotice")}
      </p>
    </div>
  );
}
