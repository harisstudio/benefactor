const activities = [
  { avatar: "\uD83D\uDC9B", name: "Emma W.", action: "donated", time: "2 minutes ago", amount: "\u00A350" },
  { avatar: "\uD83D\uDC9B", name: "James M.", action: "donated", time: "15 minutes ago", amount: "\u00A3100" },
  { avatar: "\uD83D\uDC9B", name: "Sarah K.", action: "donated", time: "1 hour ago", amount: "\u00A325" },
  { avatar: "\uD83D\uDD17", name: "Ali R.", action: "shared your fundraiser", time: "2 hours ago", amount: "" },
  { avatar: "\uD83D\uDC9B", name: "Anonymous", action: "donated", time: "3 hours ago", amount: "\u00A375" },
];

export function ActivityFeed() {
  return (
    <div>
      <h2 className="text-lg font-bold text-primary-navy mb-4">Recent Activity</h2>
      <div className="space-y-0">
        {activities.map((a, i) => (
          <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
            <span className="text-xl flex-shrink-0">{a.avatar}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-dark">
                <strong>{a.name}</strong> {a.action}
              </p>
              <span className="text-xs text-text-gray">{a.time}</span>
            </div>
            {a.amount && (
              <span className="text-sm font-bold text-primary-navy flex-shrink-0">
                {a.amount}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
