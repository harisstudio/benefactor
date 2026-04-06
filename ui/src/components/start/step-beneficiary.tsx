import { cn } from "@/lib/utils";

type Beneficiary = "yourself" | "someone" | "charity" | "";

interface StepBeneficiaryProps {
  selected: Beneficiary;
  onSelect: (value: Beneficiary) => void;
}

const options: { key: Beneficiary; title: string; description: string; icon: React.ReactNode }[] = [
  {
    key: "yourself",
    title: "Yourself",
    description: "Funds are delivered to your bank account for your own use",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    key: "someone",
    title: "Someone else",
    description: "You'll invite a beneficiary to receive funds or distribute them yourself",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    key: "charity",
    title: "Charity",
    description: "Funds are delivered to your chosen nonprofit for you",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export function StepBeneficiary({ selected, onSelect }: StepBeneficiaryProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-primary-navy">
        Who are you fundraising for?
      </h2>
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onSelect(opt.key)}
          className={cn(
            "w-full flex items-center gap-4 p-4 rounded-sm border-2 text-left transition-all min-h-[44px]",
            selected === opt.key
              ? "border-primary-navy bg-bg-off-white"
              : "border-gray-200 hover:border-gray-400"
          )}
        >
          <div className="flex-shrink-0 text-text-gray">{opt.icon}</div>
          <div>
            <h3 className="text-sm font-bold text-primary-navy">{opt.title}</h3>
            <p className="text-xs text-text-gray mt-0.5">{opt.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
