import Hero from '@/components/ui/hero';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProductCardHome from '@/components/ProductCardHome';

export default function Home() {
  return (
// <<<<<<< Updated upstream
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
// =======
    // <section>
    //   <Hero src="/hero.webp" alt="**Alt Text**">
    //     <p className="text-sm uppercase tracking-wide from-neutral-200">Autumn Extravaganza</p>
    //     <h1 className="text-3xl sm:text-5xl font-semibold">Handcrafted pieces for every room.</h1>
    //     <Link href="/catalog" className="">
    //       <Button className="w-fit" variant="default">
    //         Shop Now
    //       </Button>
    //     </Link>
    //   </Hero>
    // </section>
// >>>>>>> Stashed changes
  );
}


//   export default function Home() {
//   return (
//     <main className="p-6">
//       <Hero src="/hero.webp" alt="**Alt Text**">
//         <section className="text-center mb-8">
//           <h1 className="text-4xl font-bold">Welcome to Handcrafted Creations</h1>
//           <p className="mt-2 text-lg text-gray-600">
//             Discover unique, artisan-made products from talented sellers.
//           </p>
//         </section>
//       </Hero>

//       <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Example featured products */}
//         <div className="border p-4 rounded shadow">
//           <img src="/images/product1.jpg" alt="Handcrafted Vase" />
//           <h2 className="mt-2 font-semibold">Handcrafted Vase</h2>
//           <p className="text-gray-500">$45.00</p>
//         </div>
//         <div className="border p-4 rounded shadow">
//           <img src="/images/product2.jpg" alt="Woven Basket" />
//           <h2 className="mt-2 font-semibold">Woven Basket</h2>
//           <p className="text-gray-500">$30.00</p>
//         </div>
//         <div className="border p-4 rounded shadow">
//           <img src="/images/product3.jpg" alt="Wooden Sculpture" />
//           <h2 className="mt-2 font-semibold">Wooden Sculpture</h2>
//           <p className="text-gray-500">$60.00</p>
//         </div>
//       </section>
//     </main>
//   );
// }

