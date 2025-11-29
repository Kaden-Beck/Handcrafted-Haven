import Image from 'next/image';

interface ProductCardHomeProps {
  image: string;
  title: string;
  seller: string;
  price: string;
}

export default function ProductCardHome({ image, title, seller, price }: ProductCardHomeProps) {
  return (
    <article className="border border-border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden bg-card text-foreground">
      {/* Image wrapper with hover pop-out */}
      <div className="relative w-full h-64 overflow-hidden bg-muted">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover rounded-t-lg transform transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-1.5">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">by {seller}</p>
        <p className="text-lg font-semibold text-primary">{price}</p>
      </div>
    </article>
  );
}
