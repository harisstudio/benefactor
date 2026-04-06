"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-primary-navy font-heading mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-text-gray mb-6">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="h-11 px-6 rounded-btn font-bold text-sm bg-primary-yellow text-primary-navy hover:brightness-110 transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
