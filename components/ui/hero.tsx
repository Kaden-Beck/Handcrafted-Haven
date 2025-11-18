import Image from 'next/image';

export default function Hero(props: any) {
  const { src, alt } = props;

  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={src}
        alt={alt}
        width={200}
        height={300}
        className="w-full h-96 justify-center items-center"
      />
    </div>
  );
}
