"use client";

import { useLanguage } from "@/context/LanguageContext";

interface StepStoryProps {
  title: string;
  story: string;
  onTitleChange: (value: string) => void;
  onStoryChange: (value: string) => void;
}

export function StepStory({ title, story, onTitleChange, onStoryChange }: StepStoryProps) {
  const { t } = useLanguage();
  const remaining = 60 - title.length;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-[11px] font-semibold text-text-gray mb-1.5 uppercase tracking-[0.1em]">
          {t("stepStoryTitleLabel")}
        </label>
        <div className="relative">
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value.slice(0, 60))}
            maxLength={60}
            placeholder={t("stepStoryTitlePlaceholder")}
            className="w-full h-12 px-4 pr-14 border border-surface-muted rounded-[14px] text-[15px] text-text-dark placeholder:text-text-gray/70 focus:outline-none focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/10 transition-all"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-text-gray tabular-nums">
            {remaining}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-text-gray mb-1.5 uppercase tracking-[0.1em]">
          {t("stepStoryStoryLabel")}
        </label>
        <textarea
          value={story}
          onChange={(e) => onStoryChange(e.target.value)}
          placeholder={t("stepStoryStoryPlaceholder")}
          rows={7}
          className="w-full p-4 border border-surface-muted rounded-[14px] text-[15px] text-text-dark placeholder:text-text-gray/70 focus:outline-none focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/10 transition-all resize-y leading-relaxed"
        />
        <p className="text-[12px] text-text-gray mt-2">
          {t("stepStoryTip")}
        </p>
      </div>
    </div>
  );
}
