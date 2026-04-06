import Image from "next/image";

interface ReviewState {
  title: string;
  goalAmount: string;
  category: string;
  country: string;
  postcode: string;
  story: string;
  coverImage: string | null;
}

interface StepReviewProps {
  state: ReviewState;
  onEdit: (step: number) => void;
  onLaunch: () => void;
}

function ReviewRow({ label, value, editStep, onEdit }: { label: string; value: string; editStep: number; onEdit: (s: number) => void }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-gray-100">
      <div>
        <span className="block text-xs text-text-gray">{label}</span>
        <span className="block text-sm font-medium text-text-dark mt-0.5">
          {value || "—"}
        </span>
      </div>
      <button
        onClick={() => onEdit(editStep)}
        className="text-xs font-semibold text-primary-navy hover:underline min-h-[44px] flex items-center"
      >
        Edit
      </button>
    </div>
  );
}

export function StepReview({ state, onEdit, onLaunch }: StepReviewProps) {
  return (
    <div className="space-y-4">
      {state.coverImage && (
        <div className="relative rounded-md overflow-hidden aspect-video">
          <Image src={state.coverImage} alt="Cover" fill className="object-cover" />
        </div>
      )}

      <ReviewRow label="Title" value={state.title} editStep={4} onEdit={onEdit} />
      <ReviewRow label="Goal" value={state.goalAmount ? `\u00A3${state.goalAmount}` : ""} editStep={2} onEdit={onEdit} />
      <ReviewRow label="Category" value={state.category} editStep={0} onEdit={onEdit} />
      <ReviewRow label="Location" value={`${state.country}${state.postcode ? `, ${state.postcode}` : ""}`} editStep={0} onEdit={onEdit} />
      <ReviewRow label="Story" value={state.story.length > 100 ? state.story.slice(0, 100) + "..." : state.story} editStep={4} onEdit={onEdit} />

      <div className="flex gap-3 pt-4">
        <button
          onClick={() => alert("Preview coming soon!")}
          className="flex-1 h-11 rounded-btn font-bold text-sm border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white transition-colors"
        >
          Preview
        </button>
        <button
          onClick={onLaunch}
          className="flex-1 h-11 rounded-btn font-bold text-sm bg-primary-yellow text-primary-navy hover:brightness-110 transition-all"
        >
          Launch fundraiser
        </button>
      </div>
    </div>
  );
}
