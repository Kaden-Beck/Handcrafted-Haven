import { Skeleton } from '@/components/skeletons/skeleton';

export default function ProductCardSkeleton() {
  return (
    <>
      <Skeleton className=" rounded-xl border  overflow-hidden group">
        <Skeleton className="relative w-full h-52 bg-gray-200 animate-pulse"></Skeleton>
        <Skeleton className="p-4 space-y-2">
          <h3 className="h-6   animate-pulse"></h3>
          <p className="h-4   animate-pulse w-3/4"></p>
          <Skeleton className="flex items-center gap-2">
            <p className="h-6  rounded animate-pulse w-1/4"></p>
          </Skeleton>
        </Skeleton>
      </Skeleton>
    </>
  );
}
