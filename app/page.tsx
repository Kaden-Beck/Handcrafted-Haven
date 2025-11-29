import Hero from '@/components/ui/hero';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProductCardHome from '@/components/ui/product-card-home';
import ProductCard from '@/components/ui/product-card';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section>
        <Hero src="/hero.webp" alt="Handcrafted Haven Hero">
          <p className="text-sm uppercase tracking-wide text-white">Autumn Extravaganza</p>
          <h1 className="text-3xl sm:text-5xl font-semibold text-white">
            Handcrafted pieces for every room.
          </h1>
          <Link href="/catalog">
            <Button className="w-fit" variant="outline">
              Shop the catalog
            </Button>
          </Link>
        </Hero>
      </section>

      {/* Handcrafted Products Section */}
      <section className="mx-auto mb-10 w-full max-w-6xl px-4 py-8 sm:py-10">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Unique Handcrafted Goods Made by Real Artisans
        </h2>

        <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:grid sm:grid-cols-2 xl:grid-cols-3">
          <ProductCard productId={1} />
          <ProductCard productId={2} />
          <ProductCard productId={3} />
          <ProductCard productId={26} />
          <ProductCard productId={25} />
          <ProductCard productId={2} />
        </div>
      </section>
    </>
  );
}
