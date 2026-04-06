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
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {amounts.map((amount) => (
          <button
            key={amount}
            onClick={() => onSelect(amount)}
            className={cn(
              "relative h-12 rounded-sm border-2 text-base font-bold transition-all min-h-[44px]",
              selected === amount
                ? "border-primary-navy bg-primary-navy text-white"
                : "border-gray-200 text-text-dark hover:border-gray-400"
            )}
          >
            &pound;{amount}
            {amount === 100 && (
              <span className="absolute -top-2 -right-1 bg-[#FF8C00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                Suggested
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div className="flex items-center border-2 border-gray-200 rounded-sm overflow-hidden focus-within:border-primary-navy transition-colors">
        <div className="flex items-center gap-1 px-3 bg-bg-off-white border-r border-gray-200 h-12">
          <span className="text-base font-bold text-text-dark">&pound;</span>
          <span className="text-xs text-text-gray">GBP</span>
        </div>
        <input
          type="text"
          value={customAmount}
          onChange={(e) => onCustomChange(e.target.value)}
          className="flex-1 h-12 px-3 text-base text-text-dark outline-none bg-white"
          placeholder=".00"
        />
      </div>
    </div>
  );
}
