import Image from "next/image";
import { Star } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  seller: string;
  imageUrl: string;
  rating: number;
  discount?: number; // optional
};

type Props = {
  product: Product;
};


export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      
      {/* Image */}
      <div className="relative w-full h-52">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount label */}
        {product.discount && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-lg shadow">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        
        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        {/* Seller */}
        <p className="text-sm text-gray-500">
          Seller: <span className="font-medium text-gray-700">{product.seller}</span>
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < product.rating ? "fill-yellow-400" : "fill-gray-300 text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold text-gray-900">
            ${product.price}
          </p>

          {product.discount && (
            <p className="text-sm line-through text-gray-400">
              ${(product.price / (1 - product.discount / 100)).toFixed(2)}
            </p>
          )}
        </div>

        {/* Button */}
        <button className="w-full mt-2 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition cursor-pointer">
          Add to cart
        </button>
      </div>
    </div>
  );
}

