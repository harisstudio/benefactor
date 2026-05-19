"use client";

import { IconRefresh, IconAlertCircle } from "@tabler/icons-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] bg-bg-off-white flex items-center justify-center px-5 py-16">
      <div className="text-center max-w-[440px]">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-50 border border-rose-100 mb-5">
          <IconAlertCircle size={32} stroke={1.6} className="text-rose-500" />
        </span>
        <h2 className="font-heading text-[clamp(22px,3vw,30px)] font-extrabold text-primary-navy tracking-[-0.01em] mb-3">
          Something went wrong
        </h2>
        <p className="text-[14px] text-text-gray leading-relaxed mb-7">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center gap-1.5 h-12 px-7 rounded-[100px] font-bold text-[14px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all"
        >
          <IconRefresh size={16} stroke={1.8} />
          Try again
        </button>
      </div>
    </div>
  );
}
