import { cn } from "@/lib/utils";
import { CATEGORIES, COUNTRIES } from "@/lib/constants";

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
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-primary-navy mb-1">
          Where will the funds go?
        </h2>
        <p className="text-sm text-text-gray">
          Choose the location where you plan to withdraw your funds.{" "}
          <a href="#" className="underline">Countries we support.</a>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="block text-xs text-text-gray mb-1">Country</span>
          <select
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
            className="w-full h-12 px-3 border border-gray-300 rounded-sm text-sm text-text-dark bg-white focus:outline-none focus:border-primary-navy"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <span className="block text-xs text-text-gray mb-1">Postcode</span>
          <input
            type="text"
            value={postcode}
            onChange={(e) => onPostcodeChange(e.target.value)}
            className="w-full h-12 px-3 border border-gray-300 rounded-sm text-sm text-text-dark placeholder:text-text-gray focus:outline-none focus:border-primary-navy"
            placeholder="Enter postcode"
          />
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold text-primary-navy mb-3">
          What best describes why you&rsquo;re fundraising?
        </h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={cn(
                "px-4 py-2.5 rounded-sm border text-sm font-medium transition-all min-h-[44px]",
                category === cat
                  ? "border-primary-navy bg-primary-navy text-white"
                  : "border-gray-200 text-text-dark hover:border-gray-400"
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
