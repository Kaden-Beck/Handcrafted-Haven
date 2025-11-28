import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import prisma from '@/lib/prisma';
import { Product, User } from '@/prisma/generated/prisma';
import ProductCard from '@/components/ui/product-card';

export default async function SellerPage({ params }: { params: { sellerId: string } }) {
  const { sellerId } = await params;

  const seller: User = await prisma.user.findUniqueOrThrow({
    where: {
      id: sellerId,
    },
  });

  const sellerProducts: Product[] = await prisma.user
    .findUniqueOrThrow({ where: { id: sellerId } })
    .products();

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row ">
          <Avatar className="size-10">
            <AvatarImage
              src={seller?.image ?? '/defaultprofile.png'}
              alt={seller?.name ?? 'seller profile'}
            />
            <AvatarFallback>HH</AvatarFallback>
          </Avatar>
          <CardTitle>
            <h1>{seller?.name}</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{seller?.bio}</p>
        </CardContent>
        <CardFooter>Products: #</CardFooter>
      </Card>
      <div>
        {sellerProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
