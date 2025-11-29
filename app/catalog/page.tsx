import ProductCard from '@/components/product-card';
import prisma from '@/lib/prisma';
import { Product } from '@/prisma/generated/prisma';

export default async function CatalogPage() {
  const products: Product[] = await prisma.product.findMany({ take: 10 });

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center p-6">Catalog</h1>

      {/* 👉 Responsive grid here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
