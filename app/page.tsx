import Hero from '@/components/ui/hero';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <section>
      <Hero src="/hero.webp" alt="**Alt Text**">
        <p className="text-sm uppercase tracking-wide text-white">Autumn Extravaganza</p>
        <h1 className="text-3xl sm:text-5xl font-semibold text-white">
          Handcrafted pieces for every room.
        </h1>
        <Link href="/catalog" className="">
          <Button className="w-fit" variant="outline">
            Shop the catalog
          </Button>
        </Link>
      </Hero>
    </section>
  );
}
