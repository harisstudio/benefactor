interface TipSectionProps {
  percent: number;
  onChange: (value: number) => void;
}

export function TipSection({ percent, onChange }: TipSectionProps) {
  const fillPercent = (percent / 30) * 100;

  return (
    <div className="space-y-3">
      <h3 className="text-base font-bold text-primary-navy">
        Tip Benefactor services
      </h3>
      <p className="text-xs text-text-gray">
        Benefactor has a 0% platform fee for organisers. Benefactor will continue
        offering its services thanks to donors who will leave an optional amount
        here:
      </p>

      <div className="space-y-2">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary-navy">
            {percent}
          </span>
          <span className="text-sm font-bold text-primary-navy">%</span>
        </div>

        <input
          type="range"
          min={0}
          max={30}
          step={0.5}
          value={percent}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-primary-yellow"
          style={{
            background: `linear-gradient(to right, #FFC800 0%, #FF8C00 ${fillPercent}%, #e5e7eb ${fillPercent}%)`,
          }}
        />

        <button className="text-xs text-primary-navy font-medium hover:underline">
          Enter custom tip
        </button>
      </div>
    </div>
  );
}
