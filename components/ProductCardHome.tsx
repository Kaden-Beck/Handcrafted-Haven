import Link from 'next/link';
import { Card } from './ui/card';
import Image from 'next/image';

export default function ProductCardHome() {
  return (
    <Link href="/catalog/#">
      <Card className="items-center justify-center p-6">
        <Image
          src="/quilt.webp"
          alt="quilt"
          width={400}
          height={267}
          className="h-48 w-auto object-contain"
        />
      </Card>
    </Link>
  );
}
