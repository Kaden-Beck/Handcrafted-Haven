import prisma from '@/lib/prisma';
import { Product, User } from '@/prisma/generated/prisma';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCardSeller from '@/components/product-card-seller';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input id="productName" defaultValue={'product name'} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" defaultValue={0.0} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Type 1</SelectItem>
                    <SelectItem value="2">Type 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" defaultValue={'Product Description'} />
            </div>

            <div className="flex justify-end">
              <Button>Add Product</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
