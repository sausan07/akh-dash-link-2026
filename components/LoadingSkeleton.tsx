export function LoadingSkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="h-4 bg-gray-200 rounded w-3/5" />
        <div className="h-5 bg-gray-100 rounded-full w-20" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-4/5" />
      </div>
      <div className="flex items-center gap-2 justify-between">
        <div className="h-3 bg-gray-100 rounded w-24" />
        <div className="h-8 bg-gray-200 rounded-lg w-24" />
      </div>
    </div>
  );
}

export function LoadingSkeletonStat() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 bg-gray-200 rounded-xl" />
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-12 mb-1" />
          <div className="h-3 bg-gray-100 rounded w-28" />
        </div>
      </div>
    </div>
  );
}

export function LoadingSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingSkeletonCard key={i} />
      ))}
    </div>
  );
}
