import { cn } from '@/lib/utils';
import { HeroProps } from '@/lib/definitions';
import Image from 'next/image';

export default function Hero({ src, alt, children, className, overlayClassName }: HeroProps) {
  return (
    <section
      className={cn(
        'relative isolate flex w-full overflow-hidden rounded-2xl bg-muted/40',
        'min-h-[360px] sm:min-h-[420px] lg:min-h-[520px]',
        className
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
          className="h-full w-full object-cover"
        />
        <div
          className={cn(
            'absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent',
            overlayClassName
          )}
          aria-hidden
        />
      </div>

      <div
        className={cn(
          'relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-16 text-white',
          'sm:px-10 sm:py-20 lg:px-16 lg:py-24'
        )}
      >
        {children}
      </div>
    </section>
  );
}
