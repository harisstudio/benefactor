interface DonationSummaryProps {
  donation: number;
  tip: number;
  total: number;
}

function formatGBP(amount: number): string {
  return `£${amount.toFixed(2)}`;
}

export function DonationSummary({ donation, tip, total }: DonationSummaryProps) {
  return (
    <div className="border-t border-[#e0e0e0] pt-5 space-y-2">
      <h4 className="text-base font-bold text-primary-navy mb-4">
        Your donation
      </h4>
      <div className="flex justify-between text-[15px] text-text-gray font-normal">
        <span>Your donation</span>
        <span>{formatGBP(donation)}</span>
      </div>
      <div className="flex justify-between text-[15px] text-text-gray font-normal">
        <span>Benefactor tip</span>
        <span>{formatGBP(tip)}</span>
      </div>
      <div className="flex justify-between text-base font-bold text-primary-navy mt-3 pt-3 border-t border-[#e0e0e0]">
        <span>Total due today</span>
        <span>{formatGBP(total)}</span>
      </div>
    </div>
  );
}
