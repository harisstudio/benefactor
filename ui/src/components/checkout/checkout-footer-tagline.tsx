"use client";

import { useLanguage } from "@/context/LanguageContext";

export function CheckoutFooterTagline() {
  const { t } = useLanguage();
  return (
    <p className="text-[12px] text-text-gray">
      {t("checkoutPageFooterTagline")}
    </p>
  );
}
