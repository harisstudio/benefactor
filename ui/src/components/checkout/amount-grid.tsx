import Image from "next/image";
import { cn } from "@/lib/utils";

interface AmountGridProps {
  amounts: number[];
  selected: number | null;
  customAmount: string;
  onSelect: (amount: number) => void;
  onCustomChange: (value: string) => void;
}

export function AmountGrid({
  amounts,
  selected,
  customAmount,
  onSelect,
  onCustomChange,
}: AmountGridProps) {
  return (
    <div className="space-y-5">
      {/* Amount buttons - 6 columns on desktop, 3 on mobile */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {amounts.map((amount) => (
          <button
            key={amount}
            onClick={() => onSelect(amount)}
            className={cn(
              "relative py-4 px-2 border-2 rounded-lg text-[15px] font-semibold cursor-pointer transition-all duration-200 min-h-[44px]",
              selected === amount
                ? "border-primary-yellow bg-primary-yellow text-primary-navy"
                : "border-[#e0e0e0] bg-white text-primary-navy hover:border-primary-yellow"
            )}
          >
            £{amount}
            {amount === 100 && (
              <Image
                src="/assets/suggested-badge.svg"
                alt="Suggested"
                width={60}
                height={20}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-5 w-auto z-[2]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Custom amount input - matching original design */}
      <div className="flex items-center justify-between border-2 border-[#e0e0e0] rounded-xl py-4 px-5 bg-white focus-within:border-primary-navy transition-colors">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[28px] font-extrabold text-primary-navy leading-none">
            £
          </span>
          <span className="text-sm text-text-gray font-medium">GBP</span>
        </div>
        <input
          type="text"
          value={customAmount}
          onChange={(e) => onCustomChange(e.target.value)}
          className="border-none outline-none text-[28px] font-extrabold text-right text-primary-navy w-[120px] bg-transparent placeholder:text-text-gray"
          placeholder=".00"
        />
      </div>
    </div>
  );
}
