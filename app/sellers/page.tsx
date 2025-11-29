import prisma from '@/lib/prisma';
import type { Prisma } from '@/prisma/generated/prisma';

import Link from 'next/link';
import Image from 'next/image';

type SellerWithCount = Prisma.UserGetPayload<{
  include: {
    _count: {
      select: {
        products: true;
      };
    };
  };
}>;

export default async function SellersPage() {
  const sellers: SellerWithCount[] = await prisma.user.findMany({
    take: 3,
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
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

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sellers.map((seller) => (
            <Link key={seller.id} href={`/catalog/${seller.id}`} className="group">
              <div className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col hover:-translate-y-1">
                {/* Seller Image */}
                <div className="relative w-full h-48 overflow-hidden bg-muted">
                  <Image
                    src={seller?.image ?? 'josue.png'}
                    alt={seller?.name ?? 'seller'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Seller Info */}
                <div className="p-6 flex flex-col grow">
                  {/* Name */}
                  <h2 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {seller.name}
                  </h2>

                  {/* Bio */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex">
                    {seller.bio}
                  </p>

                  {/* Rating and Product Count */}
                  <div className="flex items-center justify-between mb-4 pt-4 border-t border-border/70">
                    <div className="flex items-center gap-1" />
                    <span className="text-xs font-semibold text-secondary-foreground bg-secondary px-3 py-1 rounded-full">
                      {seller._count.products} items
                    </span>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                    View Shop
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State (if needed) */}
        {sellers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No sellers found. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}
