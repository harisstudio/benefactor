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
    <div className="pt-5 border-t border-surface-muted space-y-3">
      <label className="block text-[11px] font-semibold text-text-gray uppercase tracking-[0.1em]">
        {t("checkoutSummary")}
      </label>

      {/* Sub-line items */}
      <div className="space-y-2 px-1">
        <div className="flex justify-between text-[14px] text-text-gray">
          <span>{t("checkoutYourDonation")}</span>
          <span className="tabular-nums font-semibold text-primary-navy">{fmt(donation)}</span>
        </div>
        <div className="flex justify-between text-[14px] text-text-gray">
          <span>{t("checkoutBenefactorTip")}</span>
          <span className="tabular-nums font-semibold text-primary-navy">{fmt(tip)}</span>
        </div>
      </div>

      {/* Total — large bold tile matching AmountGrid custom input */}
      <div className="flex items-center justify-between border border-surface-muted rounded-[14px] bg-white px-5 py-4">
        <div className="flex flex-col">
          <span className="font-heading text-[22px] font-extrabold text-primary-navy leading-none">{symbol}</span>
          <span className="text-[11px] font-semibold text-text-gray uppercase tracking-[0.12em] mt-1.5">
            {currency} · {t("checkoutTotalToday")}
          </span>
        </div>
        <span className="font-heading text-[36px] md:text-[40px] font-extrabold text-primary-navy tabular-nums tracking-[-0.02em] leading-none">
          {total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
