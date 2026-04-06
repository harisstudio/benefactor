const actions = [
  { icon: "\uD83D\uDCE4", title: "Share Fundraiser", description: "Share via social media, email, or copy link" },
  { icon: "\u270F\uFE0F", title: "Edit Campaign", description: "Update your story, photos, or goal" },
  { icon: "\uD83D\uDCB0", title: "Withdraw Funds", description: "Transfer raised funds to your bank account" },
];

export function QuickActions() {
  return (
    <div>
      <h2 className="text-lg font-bold text-primary-navy mb-4">Quick Actions</h2>
      <div className="space-y-3">
        {actions.map((action) => (
          <button
            key={action.title}
            className="w-full flex items-start gap-3 p-4 bg-white rounded-md shadow-sm hover:shadow-md hover:translate-y-[-1px] transition-all text-left"
          >
            <span className="text-2xl flex-shrink-0">{action.icon}</span>
            <div>
              <h4 className="text-sm font-bold text-primary-navy">{action.title}</h4>
              <p className="text-xs text-text-gray mt-0.5">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
