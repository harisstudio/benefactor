const stats = [
  { label: "Total Raised", value: "\u00A32,450", change: "\u2191 12% this week" },
  { label: "Donations", value: "48", change: "\u2191 5 new today" },
  { label: "Supporters", value: "34", change: "\u2191 3 new" },
  { label: "Shares", value: "126", change: "\u2191 18 this week" },
];

export function StatsRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-md shadow-sm p-5">
          <span className="block text-xs text-text-gray">{stat.label}</span>
          <span className="block text-2xl font-bold text-primary-navy mt-1 font-heading">
            {stat.value}
          </span>
          <span className="block text-xs text-green-600 mt-1">{stat.change}</span>
        </div>
      ))}
    </div>
  );
}
