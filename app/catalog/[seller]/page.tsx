import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
};

type SellerProfile = {
  id: string;
  name: string;
  slug: string;
  image: string;
  bio: string;
  description: string;
  rating: number;
  reviewCount: number;
  location: string;
  email: string;
  joinDate: string;
  followers: number;
  products: Product[];
};

// Mock seller data - will be replaced with database queries
const sellers: Record<string, SellerProfile> = {
  'artisan-crafts-co': {
    id: '1',
    name: 'Artisan Crafts Co.',
    slug: 'artisan-crafts-co',
    image: '/images/artisan-crafts.jpg',
    bio: 'Master craftspeople dedicated to creating heirloom-quality wooden furniture.',
    description:
      'Welcome to Artisan Crafts Co., where tradition meets contemporary design. Founded in 2015, we specialize in handcrafted wooden furniture and home décor items. Each piece is meticulously created using sustainable materials and time-honored techniques. Our passion is creating furniture that tells a story and becomes a cherished part of your home for generations to come.',
    rating: 5,
    reviewCount: 127,
    location: 'Portland, Oregon',
    email: 'hello@artisancrafts.com',
    joinDate: 'March 2015',
    followers: 892,
    products: [
      {
        id: 1,
        name: 'Walnut Dining Table',
        price: 1299.99,
        imageUrl: '/images/artisan-crafts.jpg',
        rating: 5,
      },
      {
        id: 2,
        name: 'Oak Coffee Table',
        price: 599.99,
        imageUrl: '/images/artisan-crafts.jpg',
        rating: 4.8,
      },
      {
        id: 3,
        name: 'Cherry Wood Bookshelf',
        price: 799.99,
        imageUrl: '/images/artisan-crafts.jpg',
        rating: 4.9,
      },
      {
        id: 4,
        name: 'Maple Side Table',
        price: 399.99,
        imageUrl: '/images/artisan-crafts.jpg',
        rating: 5,
      },
    ],
  },
  'streetwear-hn': {
    id: '2',
    name: 'StreetWear HN',
    slug: 'streetwear-hn',
    image: '/images/streetwear.jpg',
    bio: 'Contemporary streetwear designs with minimalist aesthetics.',
    description:
      'StreetWear HN brings urban fashion to life with carefully designed clothing and accessories. We focus on quality materials, comfortable fits, and timeless styles that work for modern minimalists. Every piece is thoughtfully crafted to complement any wardrobe while making a subtle statement.',
    rating: 4.5,
    reviewCount: 89,
    location: 'Brooklyn, New York',
    email: 'contact@streetwearhn.com',
    joinDate: 'July 2018',
    followers: 654,
    products: [
      {
        id: 1,
        name: 'Premium Black T-Shirt',
        price: 34.99,
        imageUrl: '/images/streetwear.jpg',
        rating: 4.6,
      },
      {
        id: 2,
        name: 'Cargo Pants',
        price: 84.99,
        imageUrl: '/images/streetwear.jpg',
        rating: 4.4,
      },
      {
        id: 3,
        name: 'Cotton Baseball Cap',
        price: 24.99,
        imageUrl: '/images/streetwear.jpg',
        rating: 4.5,
      },
    ],
  },
  'clay-stone-studio': {
    id: '3',
    name: 'Clay & Stone Studio',
    slug: 'clay-stone-studio',
    image: '/images/pottery.jpg',
    bio: 'Handmade ceramic pottery and stone sculptures.',
    description:
      'Our studio is dedicated to creating unique ceramic pottery and stone sculptures. Each piece is individually crafted using traditional techniques combined with innovative designs. We believe art should be functional, beautiful, and accessible to everyone.',
    rating: 4.8,
    reviewCount: 156,
    location: 'Santa Fe, New Mexico',
    email: 'studio@claystone.com',
    joinDate: 'January 2016',
    followers: 1203,
    products: [
      {
        id: 1,
        name: 'Hand-thrown Ceramic Vase',
        price: 129.99,
        imageUrl: '/images/pottery.jpg',
        rating: 4.9,
      },
      {
        id: 2,
        name: 'Stone Sculpture - Abstract',
        price: 459.99,
        imageUrl: '/images/pottery.jpg',
        rating: 4.8,
      },
      {
        id: 3,
        name: 'Ceramic Bowl Set',
        price: 89.99,
        imageUrl: '/images/pottery.jpg',
        rating: 4.7,
      },
      {
        id: 4,
        name: 'Decorative Tiles',
        price: 24.99,
        imageUrl: '/images/pottery.jpg',
        rating: 4.8,
      },
    ],
  },
  'textile-dreams': {
    id: '4',
    name: 'Textile Dreams',
    slug: 'textile-dreams',
    image: '/images/textiles.jpg',
    bio: 'Hand-woven textiles and vintage-inspired fabrics.',
    description:
      'Textile Dreams specializes in hand-woven textiles that celebrate traditional craftsmanship with contemporary aesthetics. We create tapestries, rugs, and fabrics that add warmth and character to any space. Our work honors traditional weaving techniques while embracing modern design principles.',
    rating: 4.7,
    reviewCount: 112,
    location: 'Oaxaca, Mexico',
    email: 'hello@textiledreams.com',
    joinDate: 'May 2017',
    followers: 745,
    products: [
      {
        id: 1,
        name: 'Hand-woven Wall Tapestry',
        price: 199.99,
        imageUrl: '/images/textiles.jpg',
        rating: 4.8,
      },
      {
        id: 2,
        name: 'Vintage-style Area Rug',
        price: 349.99,
        imageUrl: '/images/textiles.jpg',
        rating: 4.7,
      },
      {
        id: 3,
        name: 'Decorative Throw Pillow',
        price: 79.99,
        imageUrl: '/images/textiles.jpg',
        rating: 4.6,
      },
    ],
  },
  'leather-legends': {
    id: '5',
    name: 'Leather Legends',
    slug: 'leather-legends',
    image: '/images/leather.jpeg',
    bio: 'Premium handcrafted leather goods and accessories.',
    description:
      'Leather Legends creates premium handcrafted leather goods using only the finest quality materials. From classic wallets to bespoke bags, each piece is meticulously crafted by experienced artisans. We believe in creating items that age beautifully and become personal treasures.',
    rating: 4.9,
    reviewCount: 134,
    location: 'Florence, Italy',
    email: 'info@leatherlegends.com',
    joinDate: 'September 2014',
    followers: 987,
    products: [
      {
        id: 1,
        name: 'Leather Bifold Wallet',
        price: 89.99,
        imageUrl: '/images/leather.jpeg',
        rating: 4.9,
      },
      {
        id: 2,
        name: 'Handcrafted Shoulder Bag',
        price: 249.99,
        imageUrl: '/images/leather.jpeg',
        rating: 4.9,
      },
      {
        id: 3,
        name: 'Leather Belt',
        price: 59.99,
        imageUrl: '/images/leather.jpeg',
        rating: 4.8,
      },
      {
        id: 4,
        name: 'Leather Keychain',
        price: 19.99,
        imageUrl: '/images/leather.jpeg',
        rating: 4.9,
      },
    ],
  },
  'glass-art-gallery': {
    id: '6',
    name: 'Glass Art Gallery',
    slug: 'glass-art-gallery',
    image: '/images/glass-art.jpg',
    bio: 'Hand-blown glass art and functional glassware.',
    description:
      'Glass Art Gallery showcases stunning hand-blown glass creations that blur the line between fine art and functional design. Each piece is individually created in our studio using traditional glass-blowing techniques. Our work celebrates the beauty of light, color, and form.',
    rating: 4.6,
    reviewCount: 98,
    location: 'Seattle, Washington',
    email: 'studio@glassartgallery.com',
    joinDate: 'February 2016',
    followers: 623,
    products: [
      {
        id: 1,
        name: 'Hand-blown Glass Vase',
        price: 179.99,
        imageUrl: '/images/glass-art.jpg',
        rating: 4.7,
      },
      {
        id: 2,
        name: 'Decorative Glass Sculpture',
        price: 299.99,
        imageUrl: '/images/glass-art.jpg',
        rating: 4.6,
      },
      {
        id: 3,
        name: 'Drinking Glass Set',
        price: 49.99,
        imageUrl: '/images/glass-art.jpg',
        rating: 4.5,
      },
      {
        id: 4,
        name: 'Stained Glass Window Art',
        price: 399.99,
        imageUrl: '/images/glass-art.jpg',
        rating: 4.8,
      },
    ],
  },
};

interface Props {
  params: Promise<{ seller: string }>;
}

export default async function SellerPage({ params }: Props) {
  const { seller } = await params;
  const sellerData = sellers[seller];

  if (!sellerData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Seller Not Found</h1>
          <p className="text-gray-600 mb-6">The seller you are looking for does not exist.</p>
          <Link href="/sellers" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Back to Sellers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Seller Image */}
      <div className="relative h-64 sm:h-80 lg:h-96 bg-card overflow-hidden">
        <Image src={sellerData.image} alt={sellerData.name} fill className="object-cover" />
      </div>

      {/* Seller Info Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 mb-12">
        <div className="bg-white rounded-lg border shadow hover:shadow-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
            {/* Left: Seller Info */}
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                {sellerData.name}
              </h1>
              <p className="text-gray-500 text-lg mb-4">{sellerData.bio}</p>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(sellerData.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-300 text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{sellerData.rating}</span>
                  <span className="text-gray-500">({sellerData.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3 text-gray-500">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <span>{sellerData.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <Mail className="w-5 h-5 text-amber-600" />
                  <a href={`mailto:${sellerData.email}`} className="hover:text-amber-600">
                    {sellerData.email}
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-amber-600">{sellerData.followers}</p>
                  <p className="text-sm text-gray-500">Followers</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-amber-600">{sellerData.products.length}</p>
                  <p className="text-sm text-gray-500">Products</p>
                </div>
              </div>
            </div>

            {/* Right: CTA and Join Date */}
            <div className="flex flex-col gap-4">
              <button className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors w-full sm:w-auto">
                <Heart className="w-5 h-5" />
                Follow Shop
              </button>
              <Button className="w-full sm:w-auto bg-amber-600 text-white hover:bg-amber-700">
                Message Seller
              </Button>
              <p className="text-sm text-gray-500 text-center sm:text-left">
                Joined {sellerData.joinDate}
              </p>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-500 leading-relaxed">{sellerData.description}</p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sellerData.products.map((product) => (
            <article
              key={product.id}
              className="border rounded-lg shadow hover:shadow-xl transition overflow-hidden bg-white"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover rounded-t-lg transform transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <div className="flex items-center gap-1 mb-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-300 text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{product.rating}</span>
                </div>
                <p className="text-lg font-bold text-amber-600">${product.price}</p>
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded transition-colors">
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Back to Sellers Link */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Link
          href="/sellers"
          className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors"
        >
          ← Back to All Sellers
        </Link>
      </div>
    </main>
  );
}
