export default function CampaignLoading() {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-container mx-auto px-5 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          <div className="space-y-6">
            <div className="h-10 w-3/4 bg-gray-200 rounded" />
            <div className="aspect-video bg-gray-200 rounded-md" />
            <div className="aspect-[16/10] bg-gray-200 rounded-md" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="h-[500px] bg-gray-200 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
