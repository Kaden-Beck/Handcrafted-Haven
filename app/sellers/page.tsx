import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

type Seller = {
  id: string;
  name: string;
  bio: string;
  image: string;
  rating: number;
  productCount: number;
  slug: string;
};

export default function SellersPage() {
  // 👉 Test data - will be replaced with database queries
  const sellers: Seller[] = [
    {
      id: '1',
      name: 'Artisan Crafts Co.',
      bio: 'Handcrafted wooden furniture and home décor items. Each piece is unique and made with love.',
      image: '/images/artisan-crafts.jpeg',
      rating: 5,
      productCount: 24,
      slug: 'artisan-crafts-co',
    },
    {
      id: '2',
      name: 'StreetWear HN',
      bio: 'Custom designed clothing and accessories for the modern minimalist.',
      image: '/images/streetwear.jpeg',
      rating: 4.5,
      productCount: 18,
      slug: 'streetwear-hn',
    },
    {
      id: '3',
      name: 'Clay & Stone Studio',
      bio: 'Ceramic pottery and stone sculptures handmade by our talented artisans.',
      image: '/images/pottery.jpg',
      rating: 4.8,
      productCount: 32,
      slug: 'clay-stone-studio',
    },
    {
      id: '4',
      name: 'Textile Dreams',
      bio: 'Hand-woven textiles, tapestries, and vintage-inspired fabrics.',
      image: '/images/textiles.jpg',
      rating: 4.7,
      productCount: 21,
      slug: 'textile-dreams',
    },
    {
      id: '5',
      name: 'Leather Legends',
      bio: 'Premium handcrafted leather goods - wallets, bags, and accessories.',
      image: '/images/leather.jpeg',
      rating: 4.9,
      productCount: 15,
      slug: 'leather-legends',
    },
    {
      id: '6',
      name: 'Glass Art Gallery',
      bio: 'Hand-blown glass art and functional glassware for home and garden.',
      image: '/images/glass-art.jpg',
      rating: 4.6,
      productCount: 28,
      slug: 'glass-art-gallery',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Meet Our Artisans</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover talented creators and explore their unique handcrafted collections. Each seller
            brings their own passion and expertise to Handcrafted Haven.
          </p>
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sellers.map((seller) => (
            <Link key={seller.id} href={`/catalog/${seller.slug}`} className="group">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col hover:-translate-y-1">
                {/* Seller Image */}
                <div className="relative w-full h-48 overflow-hidden bg-gray-200">
                  <Image
                    src={seller.image}
                    alt={seller.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Seller Info */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Name */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {seller.name}
                  </h2>

                  {/* Bio */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{seller.bio}</p>

                  {/* Rating and Product Count */}
                  <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(seller.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-300 text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">{seller.rating}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                      {seller.productCount} items
                    </span>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                    View Shop
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State (if needed) */}
        {sellers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No sellers found. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}
