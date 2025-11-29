import ProductCardSkeleton from '@/components/skeletons/product-card-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomeSkeleton() {
  return (
    <>
      <div>
        <div className="relative isolate flex w-full overflow-hidden rounded-2xl  min-h-[360px] sm:min-h-[420px] lg:min-h-[520px] animate-pulse">
          <Skeleton className="absolute inset-0 "></Skeleton>
          <Skeleton className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
            <p className="h-4 w-1/4 rounded animate-pulse"></p>
            <h1 className="h-8 w-3/4  rounded animate-pulse"></h1>

            <button className="inline-flex items-center justify-center gap-2 h-9 w-fit rounded-md animate-pulse"></button>
          </Skeleton>
        </div>
        <div className="mx-auto mb-10 w-full max-w-6xl px-4 py-8 sm:py-10">
          <h2 className="h-6 w-1/2  rounded animate-pulse text-center"></h2>
          <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:grid sm:grid-cols-2 xl:grid-cols-3">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        </div>
      </div>
    </>
  );
}
