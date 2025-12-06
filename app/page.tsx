// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION – Full-screen hero with fixed Image error */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Hero Image – fill + sizes fixes the "width" error */}
        <Image
          src="/images/hero.webp"
          alt="Handcrafted Haven – Autumn Collection"
          fill
          priority
          className="object-cover brightness-75"
          sizes="100vw"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#023047]/60" />

        {/* Deep Space Blue overlay */}

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#ffb703]">
            Autumn Extravaganza
          </p>
          <h1 className="mt-6 text-4xl font-black text-white sm:text-6xl lg:text-7xl leading-tight">
            Handcrafted pieces
            <br />
            for every room.
          </h1>

          <Link href="/catalog" className="mt-12">
            <button className="bg-[#ffb703] px-12 py-7 text-xl font-black text-[#023047] rounded-2xl shadow-2xl transition-all hover:bg-[#fb8500] hover:scale-105">
              Shop the catalog
            </button>
          </Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-4xl font-black text-[#023047] sm:text-5xl lg:text-6xl">
            Unique Handcrafted Goods
            <br />
            Made by Real Artisans
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-3xl bg-gray-50 shadow-lg transition-all hover:shadow-2xl"
              >
                <div className="aspect-square bg-gray-200" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#023047]">Product {i}</h3>
                  <p className="mt-2 text-[#023047]/70">Handmade with love</p>
                  <p className="mt-4 text-2xl font-black text-[#fb8500]">$129</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}