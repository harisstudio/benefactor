interface CampaignHeaderProps {
  title: string;
}

export function CampaignHeader({ title }: CampaignHeaderProps) {
  return (
    <h1 className="text-2xl md:text-3xl font-bold text-primary-navy leading-tight">
      {title}
    </h1>
  );
}
