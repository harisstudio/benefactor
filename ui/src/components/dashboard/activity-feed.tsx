"use client";

import { IconHeartFilled, IconShare3, type Icon } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

type Activity = {
  Icon: Icon;
  iconClass: string;
  nameKey: string;
  actionKey: string;
  timeKey: string;
  amount?: string;
};

const activities: Activity[] = [
  { Icon: IconHeartFilled, iconClass: "text-rose-500 bg-rose-50", nameKey: "dashActDonorEmma", actionKey: "dashActDonated", timeKey: "dashActTime2m", amount: "£50" },
  { Icon: IconHeartFilled, iconClass: "text-rose-500 bg-rose-50", nameKey: "dashActDonorJames", actionKey: "dashActDonated", timeKey: "dashActTime15m", amount: "£100" },
  { Icon: IconHeartFilled, iconClass: "text-rose-500 bg-rose-50", nameKey: "dashActDonorSarah", actionKey: "dashActDonated", timeKey: "dashActTime1h", amount: "£25" },
  { Icon: IconShare3, iconClass: "text-sky-600 bg-sky-50", nameKey: "dashActDonorAli", actionKey: "dashActShared", timeKey: "dashActTime2h" },
  { Icon: IconHeartFilled, iconClass: "text-rose-500 bg-rose-50", nameKey: "dashActDonorAnonymous", actionKey: "dashActDonated", timeKey: "dashActTime3h", amount: "£75" },
];

export function ActivityFeed() {
  const { t } = useLanguage();
  return (
    <div className="bg-white border border-surface-muted rounded-2xl p-5 md:p-6">
      <h2 className="font-heading text-[18px] font-extrabold text-primary-navy mb-4">
        {t("dashRecentActivity")}
      </h2>
      <ul>
        {activities.map((a, i) => (
          <li
            key={i}
            className="flex items-center gap-3 py-3 border-b border-surface-muted last:border-0"
          >
            <span className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${a.iconClass}`}>
              <a.Icon size={15} stroke={1.8} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] text-primary-navy">
                <strong className="font-bold">{t(a.nameKey)}</strong>{" "}
                <span className="text-text-gray">{t(a.actionKey)}</span>
              </p>
              <p className="text-[12px] text-text-gray mt-0.5">{t(a.timeKey)}</p>
            </div>
            {a.amount && (
              <span className="font-heading text-[14px] font-extrabold text-primary-navy shrink-0 tabular-nums">
                {a.amount}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
