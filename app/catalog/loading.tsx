import ProductCardSkeleton from '@/components/skeletons/product-card-skeleton';

export default function LoadingHome() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center p-6">Catalog</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </>
  );
}
