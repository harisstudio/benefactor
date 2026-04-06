import { cn } from "@/lib/utils";

interface DonationTabsProps {
  frequency: "once" | "monthly";
  onChange: (frequency: "once" | "monthly") => void;
}

export function DonationTabs({ frequency, onChange }: DonationTabsProps) {
  return (
    <div>
      <div className="flex border border-gray-200 rounded-btn overflow-hidden">
        <button
          onClick={() => onChange("once")}
          className={cn(
            "flex-1 py-3 px-4 text-sm font-semibold transition-colors min-h-[44px]",
            frequency === "once"
              ? "bg-primary-navy text-white"
              : "bg-white text-text-dark hover:bg-bg-off-white"
          )}
        >
          Give once
        </button>
        <button
          onClick={() => onChange("monthly")}
          className={cn(
            "flex-1 py-3 px-4 text-sm font-semibold transition-colors min-h-[44px]",
            frequency === "monthly"
              ? "bg-primary-navy text-white"
              : "bg-white text-text-dark hover:bg-bg-off-white"
          )}
        >
          Monthly
        </button>
      </div>
      <p className="text-xs text-text-gray mt-2 text-center">
        Boost your impact by giving monthly
      </p>
    </div>
  );
}
