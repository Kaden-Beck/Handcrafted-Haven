import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import prisma from '@/lib/prisma';
import { Product } from '@/prisma/generated/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';

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
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold text-balance">Update Product</h1>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div>
                <Image src={product.image_src} alt={product.name} fill></Image>
                <span className="text-2xl">{product?.name}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input id="productName" defaultValue={product.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" defaultValue={price} />
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
              <Input id="description" defaultValue={product.description || 'Product Description'} />
            </div>

            <div className="flex justify-end">
              <Button>Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <Button variant="destructive" className="bg-red-800 max-w-3xs self-center">
          Delete Item
        </Button>
      </Card>
    </div>
  );
}
