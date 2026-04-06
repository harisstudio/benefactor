import Link from "next/link";

export function StepShare() {
  return (
    <div className="text-center space-y-6 py-8">
      <div className="text-6xl">&#127881;</div>
      <h2 className="text-2xl font-bold text-primary-navy">
        Congratulations!
      </h2>
      <p className="text-sm text-text-gray max-w-sm mx-auto leading-relaxed">
        Your fundraiser has been published and is ready to receive donations.
        Share it with friends and family to start collecting support.
      </p>

      {/* Share buttons */}
      <div className="flex items-center justify-center gap-3">
        {[
          { label: "Facebook", display: "f" },
          { label: "Twitter", display: "\uD835\uDD4F" },
          { label: "WhatsApp", display: "\uD83D\uDCAC" },
          { label: "Copy link", display: "\uD83D\uDD17" },
        ].map((btn) => (
          <button
            key={btn.label}
            title={btn.label}
            className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-lg hover:bg-bg-off-white transition-colors"
          >
            {btn.display}
          </button>
        ))}
      </div>

      <Link
        href="/dashboard"
        className="inline-flex items-center justify-center h-12 px-8 rounded-btn font-bold bg-primary-yellow text-primary-navy hover:brightness-110 transition-all"
      >
        Go to Dashboard &rarr;
      </Link>
    </div>
  );
}
