import { Skeleton } from '@/components/ui/skeleton';

export default function SellersSkeleton() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-sm tracking-[0.2em] uppercase text-secondary-foreground/80">
            Artisans
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-foreground mb-4">
            Meet Our Artisans
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover talented creators and explore their unique handcrafted collections. Each seller
            brings their own passion and expertise to Handcrafted Haven.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl shadow-sm p-6 flex flex-col gap-4"
            >
              <Skeleton className="h-48 w-full rounded-xl" />
              <div className="space-y-3 flex-1">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="border-t border-border pt-4 flex items-center justify-between">
                <Skeleton className="h-4 w-12 rounded-full" />
                <Skeleton className="h-7 w-24 rounded-full" />
              </div>
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
