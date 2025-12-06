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
    {
      label: 'Catalog',
      href: '/catalog',
    },
    {
      label: 'Sellers',
      href: '/sellers',
    },
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
    if (!node) {
      return;
    }

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
      className={cn('sticky top-0 z-50 w-full border-transparent border-b', {
        'border-border bg-background/95 backdrop-blur-lg supports-backdrop-filter:bg-background/50':
          scrolled,
      })}
    >
      <nav
        ref={navRef}
        className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 md:py-4"
      >
        <Link href="/" className="rounded-md p-1 h- hover:bg-accent" aria-label="Home">
          <span className="text-3xl font-serif">Handcrafted Haven</span>
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link, i) => (
            <a className={buttonVariants({ variant: 'ghost' })} href={link.href} key={i}>
              {link.label}
            </a>
          ))}
          {status === 'authenticated' ? (
            <Link href="/dashboard">
              <Button variant="outline">My Account</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
        <Button
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label="Toggle menu"
          className="md:hidden"
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
        status={status}
      >
        <div className="grid gap-y-2">
          {links.map((link) => (
            <a
              className={buttonVariants({
                variant: 'ghost',
                className: 'justify-start',
              })}
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {status === 'authenticated' ? (
            <Link href="/dashboard">
              <Button className="w-full bg-transparent" variant="outline">
                My Account
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button className="w-full bg-transparent" variant="outline">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="w-full">Get Started</Button>
              </Link>
            </>
          )}
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

function MobileMenu({
  open,
  children,
  className,
  offset = 64,
  status,
  ...props
}: MobileMenuProps) {
  if (!open || typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        'bg-background/95 backdrop-blur-lg supports-backdrop-filter:bg-background/50',
        'fixed right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden'
      )}
      id="mobile-menu"
      style={{ top: offset }}
    >
      <div
        className={cn(
          'data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in',
          'size-full p-4',
          className
        )}
        data-slot={open ? 'open' : 'closed'}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
