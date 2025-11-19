import Hero from '@/components/ui/hero';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProductCardHome from '@/components/ProductCardHome';

export default function Home() {
  return (
    <>
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
      <section className="mx-auto mb-10 w-full max-w-6xl px-4 py-8 sm:py-10">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Unique Handcrafted Goods Made by Real Artisans
        </h2>
        <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:grid sm:grid-cols-2 xl:grid-cols-3">
          <ProductCardHome />
          <ProductCardHome />
          <ProductCardHome />
        </div>
      </section>
    </>
  );
}
