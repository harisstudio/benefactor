/** Placeholder while featured campaign + donors load (avoids long blank / stuck root loading). */
export function CampaignDiscoverySkeleton() {
  return (
    <section className="pt-2 md:pt-12 pb-8 md:pb-12 bg-bg-light">
      <div className="max-w-container mx-auto px-[clamp(20px,5vw,100px)]">
        <div className="h-9 md:h-10 w-[min(90%,28rem)] mx-auto rounded-lg bg-surface-muted animate-pulse mb-8 md:mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 lg:gap-10 items-stretch">
          <div className="flex flex-col gap-4">
            <div className="aspect-video rounded-2xl bg-surface-muted animate-pulse" />
            <div className="h-44 rounded-2xl bg-surface-muted animate-pulse" />
            <div className="h-24 rounded-xl bg-surface-muted/80 animate-pulse" />
          </div>
          <div className="flex flex-col gap-4 pt-2">
            <div className="hidden md:block h-8 w-4/5 rounded-lg bg-surface-muted animate-pulse" />
            <div className="h-28 rounded-xl bg-surface-muted animate-pulse" />
            <div className="h-28 rounded-xl bg-surface-muted animate-pulse" />
            <div className="mt-6 flex-1 min-h-[280px] rounded-2xl bg-surface-muted animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
