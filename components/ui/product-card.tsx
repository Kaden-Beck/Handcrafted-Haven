import Image from 'next/image';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import type { Product } from '@/prisma/generated/prisma';

type Props = {
  product: Product;
};

export default async function ProductCard({ product }: Props) {
  const seller = await prisma.user.findUniqueOrThrow({
    where: {
      id: product.sellerId,
    },
  });

  const price = Number(product.price);

  return (
    <div className="bg-card text-foreground rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative w-full h-52 bg-muted">
        <Image
          src={product.image_src}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Name */}
        <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>

        {/* Seller */}
        <Link href={`/sellers/${seller.id}`}>
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
