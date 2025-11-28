import SellerCard from "@/components/ui/seller-card";


export default function SellerPage() {
  //Test data here
  const sellers = [{
    id: 1,
    name: "Kaden Beck",
    imageUrl: "/example.jpg",
    rating: 4,
  },
  {
    id: 2,
    name: "Josue Gotay",
    imageUrl: "/josue.jpg",
    rating: 4,
  }
];

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Sellers</h1>

      {/* 👉 Responsive grid here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
        {sellers.map((p) => (
          <SellerCard key={p.id} seller={p} />
        ))}
      </div>
    </main>
  );
}