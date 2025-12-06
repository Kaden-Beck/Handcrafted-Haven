// app/dashboard/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiBox, FiShoppingCart, FiMail, FiSettings } from 'react-icons/fi';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: <FiHome className="w-5 h-5" /> },
    { href: '/dashboard/products', label: 'Products', icon: <FiBox className="w-5 h-5" /> },
    { href: '/dashboard/orders', label: 'Orders', icon: <FiShoppingCart className="w-5 h-5" /> },
    { href: '/dashboard/messages', label: 'Messages', icon: <FiMail className="w-5 h-5" /> },
    { href: '/dashboard/settings', label: 'Settings', icon: <FiSettings className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar — Now using your 3 colors only */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#023047] shadow-2xl border-r border-[#fb8500]/20
          transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:shadow-lg
        `}
      >
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-8">
            {/* Logo */}
            <h2 className="text-2xl font-black text-[#ffb703] mb-12 tracking-tight">
              Handcrafted Haven
            </h2>

            <nav className="space-y-2">
              {navItems.map(({ href, label, icon }) => {
                const isActive = pathname.startsWith(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className={`
                      flex items-center gap-4 rounded-2xl px-5 py-4 text-base font-semibold transition-all duration-200
                      ${isActive
                        ? 'bg-[#fb8500] text-white shadow-lg shadow-[#fb8500]/30 scale-105'
                        : 'text-white/80 hover:bg-white/10 hover:text-white hover:scale-102'
                      }
                    `}
                  >
                    <span className={isActive ? 'text-white' : 'text-[#ffb703]'}>
                      {icon}
                    </span>
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Optional subtle footer accent */}
          <div className="h-1 bg-gradient-to-r from-[#fb8500] to-[#ffb703]" />
        </div>
      </aside>
    </>
  );
}