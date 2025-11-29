import { Skeleton } from '@/components/ui/skeleton';

export default function ProductPageSkeleton() {
  return (
    <>
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="flex flex-col gap-6 rounded-xl border py-6 overflow-hidden">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <Skeleton className="relative h-80 w-full" />
              <div className="px-6 flex flex-col justify-between gap-6 py-8 pr-8">
                <div className="space-y-4">
                  <Skeleton className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide" />
                  <Skeleton className="text-4xl font-semibold h-8" />
                  <Skeleton className="text-base leading-relaxed h-6" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <div>
                  <Skeleton className="text-3xl font-semibold mb-4 h-8" />
                  <div className="flex flex-wrap gap-3">
                    <Skeleton className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-10 rounded-md px-6" />
                  </div>
                </div>
              </div>
            </div>

            <section className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="flex flex-col gap-6 rounded-xl border py-6">
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="relative flex size-8 shrink-0 overflow-hidden rounded-full h-16 w-16 border" />
                    <div>
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-6 w-48 rounded" />
                      <Skeleton className="h-4 w-32 rounded" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-px w-full" />
                  <div className="text-sm">
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-4 w-48 rounded" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 rounded-xl border py-6">
                <div className="p-6 space-y-6">
                  <Skeleton className="h-6 w-48 rounded" />
                  <Skeleton className="h-px w-full" />
                  <Skeleton className="h-4 w-full rounded" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
