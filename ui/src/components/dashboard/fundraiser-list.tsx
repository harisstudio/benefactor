import { ProgressBar } from "@/components/ui/progress-bar";

export function FundraiserList() {
  return (
    <div>
      <h2 className="text-lg font-bold text-primary-navy mb-4">Your Fundraisers</h2>
      <div className="bg-white rounded-md shadow-sm p-5 flex flex-col md:flex-row md:items-center gap-4">
        {/* Thumb */}
        <div className="w-14 h-14 rounded-md bg-bg-off-white flex items-center justify-center text-3xl flex-shrink-0">
          &#127891;
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-primary-navy">
            Help fund my education journey
          </h3>
          <p className="text-xs text-text-gray mt-0.5">
            Created 2 days ago &middot; Education
          </p>
          <ProgressBar percent={35} className="mt-2" />
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-text-gray">
            <span><strong className="text-text-dark">&pound;2,450</strong> raised</span>
            <span>of <strong>&pound;7,000</strong> goal</span>
            <span><strong>48</strong> donations</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0">
          <button className="h-9 px-4 rounded-btn text-xs font-bold bg-primary-navy text-white hover:brightness-110 transition-all min-w-[44px]">
            Manage
          </button>
          <button className="h-9 px-4 rounded-btn text-xs font-bold border border-gray-300 text-text-dark hover:bg-bg-off-white transition-colors min-w-[44px]">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
