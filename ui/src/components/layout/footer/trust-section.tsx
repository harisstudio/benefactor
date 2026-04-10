"use client";

import React from "react";
import { useLocale } from "@/lib/i18n/LocaleContext";

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] text-emerald-400">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const VerifiedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] text-blue-400">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] text-amber-400">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export function TrustSection() {
  const { t } = useLocale();

  return (
    <div className="flex flex-col gap-4 py-8 border-t border-white/10 w-full mt-6">
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 text-[14px] font-medium text-white/80">
        
        <div className="flex items-center gap-2.5">
          <ShieldIcon />
          <span>{t('footer.trust.secure')}</span>
        </div>
        
        <div className="flex items-center gap-2.5">
          <VerifiedIcon />
          <span>{t('footer.trust.verified')}</span>
        </div>
        
        <div className="flex items-center gap-2.5">
          <LockIcon />
          <span>{t('footer.trust.data')}</span>
        </div>

      </div>
      <p className="text-[12px] text-white/40 max-w-3xl leading-relaxed">
        Benefactor complies with strict European financial security standards. All donations are processed through securely encrypted channels. We do not store full payment card details, and our verification team monitors all fundraisers to protect you.
      </p>
    </div>
  );
}
