"use client";

import { cn } from "@/lib/utils";
import { CATEGORIES, COUNTRIES } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";

interface StepCategoryProps {
  country: string;
  postcode: string;
  category: string;
  onCountryChange: (value: string) => void;
  onPostcodeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function StepCategory({
  country,
  postcode,
  category,
  onCountryChange,
  onPostcodeChange,
  onCategoryChange,
}: StepCategoryProps) {
  const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-[18px] font-extrabold text-primary-navy mb-1.5">
          {t("stepCategoryHeading")}
        </h2>
        <p className="text-[14px] text-text-gray">
          {t("stepCategoryDesc")}{" "}
          <a href="#" className="underline font-semibold text-primary-navy">
            {t("stepCategorySupportedCountries")}
          </a>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-text-gray mb-1.5 uppercase tracking-[0.1em]">
            {t("stepCategoryCountry")}
          </label>
          <select
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
            className="w-full h-12 px-4 border border-surface-muted rounded-[14px] text-[15px] text-text-dark bg-white focus:outline-none focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/10 transition-all"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-text-gray mb-1.5 uppercase tracking-[0.1em]">
            {t("stepCategoryPostcode")}
          </label>
          <input
            type="text"
            value={postcode}
            onChange={(e) => onPostcodeChange(e.target.value)}
            placeholder={t("stepCategoryPostcodePlaceholder")}
            className="w-full h-12 px-4 border border-surface-muted rounded-[14px] text-[15px] text-text-dark placeholder:text-text-gray/70 focus:outline-none focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/10 transition-all"
          />
        </div>
      </div>

      <div>
        <h3 className="font-heading text-[16px] font-extrabold text-primary-navy mb-4">
          {t("stepCategoryWhichDescribes")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={cn(
                "px-4 py-2.5 rounded-[100px] border text-[14px] font-semibold transition-all min-h-[44px]",
                category === cat
                  ? "border-primary-navy bg-primary-navy text-white"
                  : "border-surface-muted bg-white text-primary-navy hover:border-primary-navy/40 hover:bg-bg-off-white",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
