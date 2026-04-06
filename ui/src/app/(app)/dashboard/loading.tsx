export default function DashboardLoading() {
  return (
    <div className="max-w-[1100px] mx-auto px-5 py-8 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-40 bg-gray-200 rounded" />
        <div className="h-10 w-36 bg-gray-200 rounded-btn" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-md" />
        ))}
      </div>

      {/* Fundraiser skeleton */}
      <div className="mt-8 h-32 bg-gray-200 rounded-md" />

      {/* Bottom sections skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <div className="h-64 bg-gray-200 rounded-md" />
        <div className="h-64 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
}
