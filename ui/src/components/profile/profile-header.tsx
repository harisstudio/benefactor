"use client";

import { IconCamera, IconCircleCheck } from "@tabler/icons-react";

export function ProfileHeader() {
  return (
    <div className="bg-white rounded-3xl border border-surface-muted shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 mb-8">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-primary-navy flex items-center justify-center text-white font-heading text-[28px] font-extrabold shadow-sm">
          HO
        </div>
        <button
          type="button"
          className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-primary-yellow text-primary-navy border-2 border-white flex items-center justify-center shadow-md hover:bg-primary-yellow-hover transition-colors"
          aria-label="Change photo"
        >
          <IconCamera size={16} stroke={1.8} />
        </button>
      </div>

      <div className="flex-1 text-center md:text-left">
        <h2 className="font-heading text-[24px] font-extrabold text-primary-navy tracking-[-0.01em]">
          Haris Ozturk
        </h2>
        <p className="text-[13px] text-text-gray mt-1">
          Member since April 2024 · London, UK
        </p>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-3 py-1 rounded-full">
            <IconCircleCheck size={12} stroke={2.2} />
            Verified
          </span>
          <span className="inline-flex items-center text-[11px] font-semibold text-primary-navy bg-bg-off-white border border-surface-muted px-3 py-1 rounded-full">
            Fundraiser
          </span>
        </div>
      </div>

      <div className="flex gap-8 md:border-l border-surface-muted md:pl-8">
        <div className="text-center">
          <p className="font-heading text-[22px] font-extrabold text-primary-navy">12</p>
          <p className="text-[10px] text-text-gray uppercase tracking-[0.14em] font-semibold mt-0.5">
            Donations
          </p>
        </div>
        <div className="text-center">
          <p className="font-heading text-[22px] font-extrabold text-primary-navy">2</p>
          <p className="text-[10px] text-text-gray uppercase tracking-[0.14em] font-semibold mt-0.5">
            Projects
          </p>
        </div>
      </div>
    </div>
  );
}
