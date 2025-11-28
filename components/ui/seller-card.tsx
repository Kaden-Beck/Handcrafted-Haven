import Image from 'next/image';
import { Star } from 'lucide-react';

type Seller = {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
};

type Props = {
  seller: Seller;
};

export default function SellerCard({ seller }: Props) {
  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative w-full h-52">
        <Image
          src={seller.imageUrl}
          alt={seller.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{seller.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < seller.rating ? 'fill-yellow-400' : 'fill-gray-300 text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
