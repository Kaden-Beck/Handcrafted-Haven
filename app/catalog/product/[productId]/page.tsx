import prisma from '@/lib/prisma';
import { Product, User, Review } from '@/prisma/generated/prisma';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star } from 'lucide-react';
import { ReviewForm } from '@/components/reviews/review-form';
import { ReviewList } from '@/components/reviews/review-list';

type ProductWithSeller = Product & { seller: User; reviews: Review[] };

export default async function ProductPage({ params }: { params: { productId: string } }) {
  let product: ProductWithSeller;
  const { productId } = await params;

  if (!productId || isNaN(Number(productId))) {
    notFound();
  }

  try {
    product = await prisma.product.findUniqueOrThrow({
      where: {
        id: parseInt(productId),
      },
      include: {
        seller: true,
        reviews: true,
      },
    });
  } catch (error) {
    console.log(error);
    notFound();
  }

  const reviews = product.reviews ?? [];
  const ratings = reviews.map((review) => review.rating);
  const averageRating = ratings.length
    ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
    : 0;

  // const reviews = product.reviews ?? [];
  // const ratings = reviews.map((review) => review.rating);
  // const averageRating = ratings.length
  //   ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
  //   : 0;

  return (
    <div className="bg-background text-foreground pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Card className="overflow-hidden border-border">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative h-80 w-full bg-muted">
              <Image
                src={product?.image_src}
                alt={product?.name ?? ''}
                fill
                className="object-cover"
                priority
              />
            </div>
            <CardContent className="flex flex-col justify-between gap-6 py-8 pr-8">
              <div className="space-y-4">
                <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  Featured Product
                </span>
                <h1 className="text-4xl font-semibold">{product.name}</h1>
                {product.description && (
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {product.description}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <p>Ratings Pending...</p>
                  {/* <div className="flex items-center gap-1 text-yellow-400"> */}
                  {/* {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < Math.round(averageRating)
                            ? 'fill-yellow-400'
                            : 'fill-gray-300 text-gray-300'
                        }`}
                      />
                    ))} */}
                  {/* </div> */}
                  {/* <span className="text-sm text-muted-foreground">
                    {ratings.length
                      ? `${averageRating.toFixed(1)} · ${ratings.length} reviews`
                      : 'No reviews yet'}
                  </span> */}
                </div>
              </div>

              <div>
                <p className="text-3xl font-semibold text-primary mb-4">
                  ${Number(product.price).toFixed(2)}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" variant="outline" asChild>
                    <Link href={`/catalog/${product.seller.id}`}>View Seller</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-border">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border border-border">
                  <AvatarImage
                    src={product.seller.image ?? '/images/default.png'}
                    alt={product.seller.name ?? 'Seller avatar'}
                  />
                  <AvatarFallback>HH</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Seller</p>
                  <h2 className="text-2xl font-semibold">
                    {product.seller.name ?? 'Unnamed seller'}
                  </h2>
                  <Link href={`/catalog/${product.seller.id}`} className="text-primary text-sm">
                    View full profile →
                  </Link>
                </div>
              </div>
              {product.seller.bio && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {product.seller.bio}
                </p>
              )}
              <Separator />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Contact</p>
                <Link href={`mailto:${product.seller.email}`} className="hover:text-primary">
                  {product.seller.email}
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6 space-y-6">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-2xl font-semibold">Reviews</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-lg">
                      {averageRating > 0 ? averageRating.toFixed(1) : 'New'}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <ReviewList reviews={reviews} />
              
              <ReviewForm productId={product.id} />
            </CardContent>
          </Card>
        </section>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
            asChild
          >
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors"
            >
              ← Back to catalog
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
