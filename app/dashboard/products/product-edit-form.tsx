'use client';

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
import { Product } from '@/prisma/generated/prisma';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProductEditFormProps {
  product: Product;
}

export function ProductEditForm({ product }: ProductEditFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Ensure product.price is handled correctly if it's a Decimal
  const defaultPrice = product.price ? Number(product.price) : 0.0;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      id: product.id,
      name: formData.get('name'),
      price: formData.get('price'),
      type: formData.get('type'),
      description: formData.get('description'),
      image_src: formData.get('image_src'),
    };

    try {
      const response = await fetch('/api/product', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update product');
      }

      toast.success('Product updated successfully');
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    setDeleteLoading(true);

    try {
      const response = await fetch(`/api/product?id=${product.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete product');
      }

      toast.success('Product deleted successfully');
      router.push('/dashboard/products');
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong');
      }
      setDeleteLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold text-balance">Update Product</h1>
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 bg-muted rounded overflow-hidden">
                <Image
                  src={product.image_src || 'https://bundui-images.netlify.app/api/products/2.png'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-2xl">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" defaultValue={product.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={defaultPrice}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select name="type" defaultValue={String(product.type)}>
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
              <Label htmlFor="image_src">Image URL</Label>
              <Input
                id="image_src"
                name="image_src"
                defaultValue={product.image_src}
                placeholder="https://example.com/image.png"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                defaultValue={product.description || ''}
                placeholder="Product Description"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading || deleteLoading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <div className="p-6 flex justify-center">
          <Button
            variant="destructive"
            className="bg-red-800"
            onClick={handleDelete}
            disabled={loading || deleteLoading}
          >
            {deleteLoading ? 'Deleting...' : 'Delete Item'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
