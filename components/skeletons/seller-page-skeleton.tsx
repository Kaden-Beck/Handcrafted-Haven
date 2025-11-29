import { Skeleton } from './skeleton';

export default function SellerPageSkeleton() {
  return (
    <div className="bg-background text-foreground pb-16">
      {/* Seller info card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-3 items-center">
              <Skeleton className="size-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-8 w-48" />
              </div>
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>

            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        {/* Products grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 mt-12">
          <Skeleton className="mx-auto h-8 w-64 rounded-lg mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-4 space-y-3">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-5 w-1/3" />
              </div>
            ))}
          </div>
        </div>

        {/* Back button */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <Skeleton className="h-10 w-48 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
