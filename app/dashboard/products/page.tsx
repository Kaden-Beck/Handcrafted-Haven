import prisma from '@/lib/prisma';
import { Product, User } from '@/prisma/generated/prisma';

import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  let user: User;
  let sellerProducts: Product[] = [];

  try {
    // const session = await auth();
    // if (!session) redirect('/login');
    // const foundUser = await prisma.user.findUnique({ where: { id: session.user?.id } });

    const foundUser = await prisma.user.findFirst();

    if (!foundUser) {
      redirect('/login');
    }

    user = foundUser;

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
        <CardHeader>
          <CardTitle>New Product</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select defaultValue="us">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">🇺🇸 United States</SelectItem>
                <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" defaultValue="123 Main St" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue="New York" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input id="postalCode" defaultValue="10001" />
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
