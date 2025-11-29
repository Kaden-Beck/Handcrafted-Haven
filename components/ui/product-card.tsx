import Image from 'next/image';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import type { Product, User } from '@/prisma/generated/prisma';
import { notFound } from 'next/navigation';

type ProductWithSeller = Product & { seller?: User | null };

type Props = {
  product?: ProductWithSeller;
  productId?: Product['id'];
};

export default async function ProductCard({ product, productId }: Props) {
  let productData: ProductWithSeller | null = product ?? null;

  // Allow fetching when only an id is provided.
  if (!productData && typeof productId === 'number') {
    productData = await prisma.product.findUnique({
      where: { id: productId },
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

  return (
    <div className="bg-card text-foreground rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative w-full h-52 bg-muted">
        <Image
          src={resolvedProduct.image_src}
          alt={resolvedProduct.name}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Name */}
        <h3 className="text-lg font-semibold line-clamp-1">{resolvedProduct.name}</h3>

        {/* Seller */}
        <Link href={`/catalog/${seller.id}`}>
          <p className="text-sm text-muted-foreground">
            Seller:
            <span className="font-medium text-foreground"> {seller.name}</span>
          </p>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold text-primary">${price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
