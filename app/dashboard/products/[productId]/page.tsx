import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function UpdateProduct({ params }: { params: { productId: string } }) {
  const { productId } = await params;

  if (!productId) {
    notFound();
  }

  let product;

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

  return <span>Update a Product</span>;
}
