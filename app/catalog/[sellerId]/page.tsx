import prisma from '@/lib/prisma';
import { Product, User } from '@/prisma/generated/prisma';

import Link from 'next/link';

import ProductCard from '@/components/product-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { notFound } from 'next/navigation';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function SellerPage({ params }: { params: { sellerId: string } }) {
  // get sellerId from URL params
  const { sellerId } = await params;

  // await prisma lookup of sellerId, throw error if not found (error.code='P2025')
  try {
    const seller: User = await prisma.user.findUniqueOrThrow({
      where: {
        id: sellerId,
      },
    });

    // Get an array of the products associated with this seller
    const sellerProducts: Product[] = await prisma.user
      .findUniqueOrThrow({ where: { id: sellerId } })
      .products();

    // if data retrieved successfully return seller page
    return (
      <div className="pb-4">
        <div className=" sm:h-40 lg:h-40 bg-card overflow-hidden"></div>
        {/* Seller Info Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 mb-12">
          <div className="bg-card rounded-xl border border-border shadow-sm hover:shadow-lg p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              {/* Left: Seller Info */}
              <div className="flex-1">
                <div className="flex flex-row gap-3 items-center">
                  <Avatar className="size-12 border border-border">
                    <AvatarImage
                      src={seller?.image ?? 'default.png'}
                      alt={seller?.name ?? 'seller profile'}
                    />
                    <AvatarFallback>HH</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      Seller
                    </p>
                    <h1 className="text-4xl sm:text-5xl font-semibold text-foreground">
                      {seller?.name}
                    </h1>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg mt-4 mb-6">{seller?.bio}</p>

                {/* Contact Info */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary" />
                    <a
                      href={`mailto:${seller?.email}`}
                      className="hover:text-primary transition-colors"
                    >
                      {seller?.email}
                    </a>
                  </div>
                </div>

                {/* Right: Join Date */}
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-muted-foreground">
                    Joined{' '}
                    {seller.createdAt.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 mt-12">
            <h2 className="text-4xl font-semibold text-center text-foreground mb-8">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sellerProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
          {/* Back to Sellers Link */}
          <Button size="lg" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <Link
              href="/sellers"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors"
            >
              ← Back to All Sellers
            </Link>
          </Button>
        </div>
      </div>
    );
  } catch (error) {
    // If seller not found, redirect to not-found and log error
    console.log(error);
    return notFound();
  }
}
