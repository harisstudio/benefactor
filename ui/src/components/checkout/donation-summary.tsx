interface DonationSummaryProps {
  donation: number;
  tip: number;
  total: number;
}

function formatGBP(amount: number): string {
  return `\u00A3${amount.toFixed(2)}`;
}

export function DonationSummary({ donation, tip, total }: DonationSummaryProps) {
  return (
    <div className="space-y-2 pt-4 border-t border-gray-200">
      <h4 className="text-sm font-bold text-primary-navy">Your donation</h4>
      <div className="flex justify-between text-sm text-text-dark">
        <span>Your donation</span>
        <span>{formatGBP(donation)}</span>
      </div>
      <div className="flex justify-between text-sm text-text-dark">
        <span>Benefactor tip</span>
        <span>{formatGBP(tip)}</span>
      </div>
      <div className="flex justify-between text-sm font-bold text-primary-navy pt-2 border-t border-gray-100">
        <span>Total due today</span>
        <span>{formatGBP(total)}</span>
      </div>
    </div>
  );
}
