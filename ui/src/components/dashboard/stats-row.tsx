import { IconCoin, IconHeartFilled, IconUsers, IconShare3, IconTrendingUp } from "@tabler/icons-react";

const stats = [
  { label: "Total raised", value: "£2,450", change: "+12% this week", Icon: IconCoin },
  { label: "Donations", value: "48", change: "+5 today", Icon: IconHeartFilled },
  { label: "Supporters", value: "34", change: "+3 new", Icon: IconUsers },
  { label: "Shares", value: "126", change: "+18 this week", Icon: IconShare3 },
];

export function StatsRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, change, Icon }) => (
        <div
          key={label}
          className="bg-white border border-surface-muted rounded-2xl p-5 md:p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-text-gray uppercase tracking-[0.1em]">
              {label}
            </span>
            <Icon size={18} stroke={1.7} className="text-primary-navy/60" />
          </div>
          <p className="font-heading text-[clamp(22px,2.4vw,30px)] font-extrabold text-primary-navy leading-none">
            {value}
          </p>
          <p className="flex items-center gap-1 mt-2 text-[12px] font-semibold text-emerald-600">
            <IconTrendingUp size={13} stroke={2} />
            {change}
          </p>
        </div>
      ))}
    </div>
  );
}
