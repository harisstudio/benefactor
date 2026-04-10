import { cn } from "@/lib/utils";

interface DonationTabsProps {
  frequency: "once" | "monthly";
  onChange: (frequency: "once" | "monthly") => void;
}

export function DonationTabs({ frequency, onChange }: DonationTabsProps) {
  return (
    <div>
      <div className="flex bg-[#f5f5f5] rounded-[30px] p-1">
        <button
          onClick={() => onChange("once")}
          className={cn(
            "flex-1 py-3.5 px-5 rounded-[26px] text-[15px] font-semibold text-primary-navy cursor-pointer transition-all duration-300 min-h-[44px]",
            frequency === "once"
              ? "bg-primary-yellow shadow-sm"
              : "bg-transparent hover:bg-white/50"
          )}
        >
          Give once
        </button>
        <button
          onClick={() => onChange("monthly")}
          className={cn(
            "flex-1 py-3.5 px-5 rounded-[26px] text-[15px] font-semibold text-primary-navy cursor-pointer transition-all duration-300 min-h-[44px]",
            frequency === "monthly"
              ? "bg-primary-yellow shadow-sm"
              : "bg-transparent hover:bg-white/50"
          )}
        >
          Monthly
        </button>
      </div>
      <p className="text-sm text-text-gray font-medium mt-3 text-center">
        Boost your impact by giving monthly
      </p>
    </div>
  );
}
