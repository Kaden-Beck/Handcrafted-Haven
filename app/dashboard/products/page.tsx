import ProductCardSeller from '@/components/product-card-seller';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Product, User } from '@/prisma/generated/prisma';
import { redirect } from 'next/navigation';
import { ProductAddForm } from './product-add-form';

export default async function ProductManagement() {
  // let user: User;
  let sellerProducts: Product[] = [];

  try {
    const session = await auth();
    if (!session) redirect('/login');
    const user: User = await prisma.user.findUniqueOrThrow({ where: { id: session.user?.id } });

    // const foundUser = await prisma.user.findFirst();

    // if (!foundUser) {
    //   redirect('/login');
    // }

    // user = foundUser;

    sellerProducts = await prisma.user.findUniqueOrThrow({ where: { id: user.id } }).products();
  } catch (error) {
    console.log(error);
    redirect('/login');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-balance">Manage Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sellerProducts.map((p) => (
          <ProductCardSeller key={p.id} product={p} />
        ))}
      </div>
      <h1 className="text-2xl font-semibold text-balance">Add Products</h1>

      <ProductAddForm />
    </div>
  );
}
