import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';
import Link from 'next/link';

export function SellerNotFound() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex h-screen items-center border-x">
        <div>
          <div className="absolute inset-x-0 h-px bg-border" />
          <Empty>
            <EmptyHeader>
              <EmptyTitle className="font-black font-mono text-8xl">404</EmptyTitle>
              <EmptyDescription className="text-nowrap">
                <p className="text-gray-600 mb-6">The seller you are looking for does not exist.</p>
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href="/sellers">← Back to Sellers</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/catalog">
                    <Compass /> Catalog
                  </Link>
                </Button>
              </div>
            </EmptyContent>
          </Empty>
          <div className="absolute inset-x-0 h-px bg-border" />
        </div>
      </div>
    </div>
  );
}
