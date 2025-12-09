'use client';
import React from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { MenuToggleIcon } from '@/components/menu-toggle-icon';
import { Button, buttonVariants } from '@/components/ui/button';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

export function Header() {
  const { status } = useSession();
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);
  const navRef = React.useRef<HTMLElement | null>(null);
  const [navHeight, setNavHeight] = React.useState(64);

  const links = [
    { label: 'Catalog', href: '/catalog' },
    { label: 'Sellers', href: '/sellers' },
  ];

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  React.useLayoutEffect(() => {
    const node = navRef.current;
    if (!node) return;

    const updateHeight = () => setNavHeight(node.offsetHeight);
    updateHeight();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => updateHeight());
      observer.observe(node);
      return () => observer.disconnect();
    }

    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        scrolled
          ? 'border-[#fb8500]/30 bg-[#023047]/95 backdrop-blur-lg supports-backdrop-filter:bg-[#023047]/90'
          : 'border-transparent bg-white'
      )}
    >
      <nav
        ref={navRef}
        className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 md:py-4"
      >
        <Link
          href="/"
          className="rounded-md p-1 hover:bg-[#fb8500]/20 transition"
          aria-label="Home"
        >
          <span
            className={cn(
              'text-3xl font-serif font-black transition-colors',
              scrolled ? 'text-[#ffb703]' : 'text-[#023047]'
            )}
          >
            Handcrafted Haven
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className={buttonVariants({
                variant: 'ghost',
                className: cn(
                  'font-medium transition-all duration-200 rounded-lg',
                  scrolled
                    ? 'text-white hover:bg-white/10 hover:text-[#ffb703]'
                    : 'text-[#023047] hover:bg-[#023047]/10 hover:text-[#023047]'
                ),
              })}
            >
              {link.label}
            </a>
          ))}
          <Link href="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <Button
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label="Toggle menu"
          className={cn(
            'md:hidden transition-all duration-200',
            scrolled
              ? 'border-white/30 text-white hover:bg-white/10'
              : 'border-[#023047] text-[#023047] hover:bg-[#023047]/10'
          )}
          onClick={() => setOpen(!open)}
          size="icon"
          variant="outline"
        >
          <MenuToggleIcon className="size-5" duration={300} open={open} />
        </Button>
      </nav>
      <MobileMenu
        className="flex flex-col justify-between gap-2"
        offset={navHeight}
        open={open}
        status={status} // Pass the status prop here
      >
        <div className="grid gap-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={buttonVariants({
                variant: 'ghost',
                className:
                  'justify-start text-white hover:bg-white/10 hover:text-[#ffb703] font-medium transition-all',
              })}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Button className="w-full bg-transparent" variant="outline">
            Sign In
          </Button>
          <Button className="w-full">Get Started</Button>
        </div>
      </MobileMenu>
    </header>
  );
}

type MobileMenuProps = React.ComponentProps<'div'> & {
  open: boolean;
  offset?: number;
  status: 'authenticated' | 'loading' | 'unauthenticated';
};

function MobileMenu({ open, children, className, offset = 64, ...props }: MobileMenuProps) {
  if (!open || typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        'bg-[#023047]/95 backdrop-blur-lg supports-backdrop-filter:bg-[#023047]/90',
        'fixed right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t border-[#fb8500]/30 md:hidden'
      )}
      id="mobile-menu"
      style={{ top: offset }}
    >
      <div className={cn('size-full p-4', className)} {...props}>
        {children}
      </div>
    </div>,
    document.body
  );
}
