import { IconShare3, IconPencil, IconBuildingBank, IconChevronRight, type Icon } from "@tabler/icons-react";

type Action = { Icon: Icon; title: string; description: string };

const actions: Action[] = [
  { Icon: IconShare3, title: "Share fundraiser", description: "Share via social, email, or copy link." },
  { Icon: IconPencil, title: "Edit campaign", description: "Update your story, photos, or goal." },
  { Icon: IconBuildingBank, title: "Withdraw funds", description: "Transfer raised funds to your bank." },
];

export function QuickActions() {
  return (
    <div className="bg-white border border-surface-muted rounded-2xl p-5 md:p-6">
      <h2 className="font-heading text-[18px] font-extrabold text-primary-navy mb-4">
        Quick actions
      </h2>
      <div className="space-y-2">
        {actions.map(({ Icon, title, description }) => (
          <button
            key={title}
            type="button"
            className="group w-full flex items-center gap-4 p-4 rounded-xl border border-surface-muted bg-bg-off-white hover:bg-white hover:border-primary-navy/30 hover:shadow-sm transition-all text-left"
          >
            <span className="shrink-0 w-10 h-10 rounded-xl bg-primary-yellow/20 flex items-center justify-center">
              <Icon size={20} stroke={1.7} className="text-primary-navy" />
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="font-heading text-[14px] font-extrabold text-primary-navy">
                {title}
              </h4>
              <p className="text-[12px] text-text-gray mt-0.5">{description}</p>
            </div>
            <IconChevronRight size={16} className="text-text-gray group-hover:text-primary-navy group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}
