interface StepGoalProps {
  amount: string;
  autoGoal: boolean;
  onAmountChange: (value: string) => void;
  onAutoGoalToggle: () => void;
}

export function StepGoal({ amount, autoGoal, onAmountChange, onAutoGoalToggle }: StepGoalProps) {
  return (
    <div className="space-y-6">
      {/* Amount input */}
      <div className="flex items-center border-2 border-gray-200 rounded-sm overflow-hidden focus-within:border-primary-navy transition-colors">
        <span className="text-2xl font-bold text-text-dark pl-4">&pound;</span>
        <input
          type="text"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="Enter amount"
          className="flex-1 h-14 px-3 text-xl font-bold text-text-dark outline-none placeholder:text-text-gray placeholder:font-normal bg-white"
        />
        <span className="text-sm text-text-gray pr-4">GBP</span>
      </div>

      <p className="text-sm text-text-gray">
        Fundraisers like yours typically aim to raise &pound;3,500 or more.
      </p>

      {/* Auto goal toggle */}
      <div className="flex items-start justify-between gap-4 p-4 border border-gray-200 rounded-sm">
        <div>
          <span className="inline-block px-2 py-0.5 bg-primary-yellow text-primary-navy text-[10px] font-bold rounded-full mb-2">
            Recommended
          </span>
          <h4 className="text-sm font-bold text-primary-navy">
            Automated goal setting
          </h4>
          <p className="text-xs text-text-gray mt-1">
            We&rsquo;ll gradually adjust your goal as donations come in.{" "}
            <a href="#" className="underline">More details</a>
          </p>
        </div>
        <button
          onClick={onAutoGoalToggle}
          className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors ${autoGoal ? "bg-primary-navy" : "bg-gray-300"}`}
          role="switch"
          aria-checked={autoGoal}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${autoGoal ? "translate-x-5" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
