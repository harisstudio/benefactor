interface CampaignHeaderProps {
  title: string;
}

export function CampaignHeader({ title }: CampaignHeaderProps) {
  return (
    <h1 className="text-[clamp(22px,2vw,32px)] font-bold text-primary-navy leading-[1.2]">
      {title}
    </h1>
  );
}
