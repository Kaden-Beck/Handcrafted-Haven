import Image from 'next/image';
import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardTitle } from './ui/card';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

type Props = {
  sellerId: string;
};

export default async function SellerCard({ sellerId }: Props) {
  const seller = await prisma.user.findUnique({
    where: { id: sellerId },
    include: {
      products: {
        select: {
          reviews: {
            select: { rating: true },
          },
        },
      },
      _count: {
        select: { products: true },
      },
    },
  });

  if (!seller) {
    notFound();
  }

  const ratings = seller.products.flatMap((product) =>
    product.reviews.map((review) => review.rating)
  );
  const averageRating = ratings.length
    ? ratings.reduce((total, rating) => total + rating, 0) / ratings.length
    : 0;

  return (
    <Link href={`/catalog/${sellerId}`} className="group block h-full">
      <Card className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col hover:-translate-y-1 gap-0 p-0 py-0">
        {/* Seller Image */}
        <div className="relative w-full h-48 overflow-hidden bg-muted">
          <Image
            src={seller.image ?? '/images/josue.png'}
            alt={seller.name ?? 'Seller avatar'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Seller Info */}
        <CardContent className="p-6 flex flex-col grow">
          {/* Name */}
          <CardTitle className="text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {seller.name ?? 'Unnamed seller'}
          </CardTitle>

          {/* Bio */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex">
            {seller.bio ?? 'This seller has not added a bio yet.'}
          </p>

          {/* Rating and Product Count */}
          <div className="flex items-center justify-between mb-4 pt-4 border-t border-border/70">
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(averageRating)
                      ? 'fill-yellow-400'
                      : 'fill-gray-300 text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-secondary-foreground bg-secondary px-3 py-1 rounded-full">
              {seller._count?.products ?? 0} items
            </span>
          </div>
        </CardContent>

        {/* CTA Button */}
        <CardFooter className="p-6 pt-0">
          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
            View Shop
          </button>
        </CardFooter>
      </Card>
    </Link>
  );
}
