"use client";

import { useLanguage } from "@/context/LanguageContext";
import { CURRENCY_SYMBOL, type CurrencyCode } from "@/lib/fx";

interface DonationSummaryProps {
  donation: number;
  tip: number;
  total: number;
  currency?: CurrencyCode;
}

export function DonationSummary({ donation, tip, total, currency = "EUR" }: DonationSummaryProps) {
  const symbol = CURRENCY_SYMBOL[currency];
  const fmt = (n: number) => `${symbol}${n.toFixed(2)}`;
  const { t } = useLanguage();
  return (
    <div className="pt-5 border-t border-surface-muted">
      <h4 className="font-heading text-[14px] font-extrabold text-primary-navy mb-3 uppercase tracking-[0.08em]">
        {t("checkoutSummary")}
      </h4>
      <div className="space-y-2">
        <div className="flex justify-between text-[14px] text-text-gray">
          <span>{t("checkoutYourDonation")}</span>
          <span className="tabular-nums">{fmt(donation)}</span>
        </div>
        <div className="flex justify-between text-[14px] text-text-gray">
          <span>{t("checkoutBenefactorTip")}</span>
          <span className="tabular-nums">{fmt(tip)}</span>
        </div>
        <div className="flex justify-between font-heading text-[18px] font-extrabold text-primary-navy mt-3 pt-3 border-t border-surface-muted">
          <span>{t("checkoutTotalToday")}</span>
          <span className="tabular-nums">{fmt(total)}</span>
        </div>
      </div>
    </div>
  );
}
