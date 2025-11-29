import Image from 'next/image';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import type { Product, User } from '@/prisma/generated/prisma';
import { notFound } from 'next/navigation';
import { Card, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';

type ProductWithSeller = Product & { seller?: User | null };

type Props = {
  product?: ProductWithSeller;
  productId?: Product['id'] | string;
};

export default async function ProductCard({ product, productId }: Props) {
  let productData: ProductWithSeller | null = product ?? null;

  const normalizedProductId =
    typeof productId === 'string' ? Number(productId) : (productId ?? null);

  // Allow fetching when only an id is provided.
  if (
    !productData &&
    typeof normalizedProductId === 'number' &&
    !Number.isNaN(normalizedProductId)
  ) {
    productData = await prisma.product.findUnique({
      where: { id: normalizedProductId },
      include: { seller: true },
    });
  }

  if (!productData) {
    notFound();
  }

  const resolvedProduct = productData;

  let seller = resolvedProduct.seller;
  if (!seller) {
    seller = await prisma.user.findUnique({
      where: { id: resolvedProduct.sellerId },
    });
  }

  if (!seller) {
    notFound();
  }

  const price = Number(resolvedProduct.price);
  const productLink = `/catalog/product/${resolvedProduct.id}`;
  return (
    <Card className="bg-card text-foreground border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group gap-0 p-0 py-0">
      {/* Product Image */}
      <Link href={productLink}>
        <div className="relative w-full h-52 bg-muted">
          <Image
            src={resolvedProduct.image_src}
            alt={resolvedProduct.name}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      </Link>
      <CardContent className="p-4 space-y-2">
        {/* Product Name */}
        <Link href={productLink}>
          <CardTitle className="text-lg font-semibold line-clamp-1 text-foreground">
            {resolvedProduct.name}
          </CardTitle>
        </Link>
        {/* Seller */}
        <Link href={`/catalog/${seller.id}`}>
          <CardDescription className="text-sm">
            <span className="font-medium text-foreground"> {seller.name}</span>
          </CardDescription>
        </Link>
        {/* Price */}
        <Link href={productLink}>
          <CardFooter className="px-0 pt-2">
            <p className="text-xl font-semibold text-primary">${price.toFixed(2)}</p>
          </CardFooter>
        </Link>
      </CardContent>
    </Card>
  );
}
