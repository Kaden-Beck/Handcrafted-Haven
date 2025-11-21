import ProductCard from "@/components/productCard";

// export  function Catalog() {
//   return <h1>Catalog</h1>;
// }


export default function Home() {
  // 👉 Test data here
  const products = [
    {
      id: 1,
      name: "Premium Shirt",
      price: 19.99,
      seller: "Handcrafted Haven",
      imageUrl: "/example1.jpg",
      rating: 4,
      discount: 20,
    },
    {
      id: 2,
      name: "Black Edition Cap",
      price: 14.99,
      seller: "StreetWear HN",
      imageUrl: "/example2.jpg",
      rating: 5,
      discount: 10,
    },
  ];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {/* 👉 Responsive grid here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}


