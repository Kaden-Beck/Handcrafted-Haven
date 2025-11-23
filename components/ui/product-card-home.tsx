import Image from 'next/image';

interface ProductCardHomeProps {
  image: string;
  title: string;
  seller: string;
  price: string;
}

export default function ProductCardHome({ image, title, seller, price }: ProductCardHomeProps) {
  return (
    <article className="border rounded-lg shadow hover:shadow-xl transition overflow-hidden bg-white">
      {/* Image wrapper with hover pop-out */}
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover rounded-t-lg transform transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">by {seller}</p>
        <p className="text-lg font-bold text-amber-600">{price}</p>

        <div className="mt-3 flex gap-2"></div>
      </div>
    </article>
  );
}
