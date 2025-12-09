import prisma from '@/lib/prisma';
import { Product } from '@/prisma/generated/prisma';
import { notFound } from 'next/navigation';
import { ProductEditForm } from '../product-edit-form';

export default async function UpdateProduct({ params }: { params: { productId: string } }) {
  const { productId } = await params;
  if (!productId) {
    notFound();
  }

  let product: Product;

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

  // Ensure `product.price` is defined before calling `toNumber()`
  const price = product.price?.toNumber() || 0.0;

  return (
    <ProductEditForm product={product} />
  );
}
