import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="relative">
      <div
        className={cn(
          'mx-auto max-w-5xl lg:border-x',
          'dark:bg-[radial-gradient(35%_80%_at_30%_0%,--theme(--color-foreground/.1),transparent)]'
        )}
      >
        <div className="absolute inset-x-0 h-px w-full bg-border" />
        <div className="grid max-w-5xl grid-cols-6 gap-6 p-4">
          <div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-4">
            <a className="w-max" href="./">
              <span className="font-semibold text-2xl">Handcraft Haven</span>
            </a>
            <p className="max-w-sm text-balance font-mono text-muted-foreground text-sm">
              A platform to connect creators to lovers of handcrafted goods.
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 h-px w-full bg-border" />
        <div className="flex max-w-4xl flex-col justify-between gap-2 py-4">
          <p className="text-center font-light text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} WDD 430 | Team 15
          </p>
          <div>{/* Add Button to go to github repo  */}</div>
        </div>
      </div>
    </footer>
  );
}
