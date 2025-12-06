'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#023047]">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Area */}
      <div className="flex flex-1 flex-col">
        {/* Header — Amber Flame accent */}
        <header className="h-16 bg-[#023047] border-b-4 border-[#fb8500] px-6 flex items-center shadow-lg">
          <h1 className="text-2xl font-black text-[#ffb703]">
            Dashboard
          </h1>
          <p className="ml-10 text-lg font-medium text-white/90 hidden sm:block">
            Welcome back, Artisan
          </p>
        </header>

        {/* Mobile menu button — Princeton Orange */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-50 md:hidden flex h-14 w-14 items-center justify-center rounded-full bg-[#fb8500] text-white shadow-2xl hover:bg-[#ffb703] hover:scale-110 transition-all duration-200"
          aria-label="Open menu"
        >
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#023047]">
          <div className="mx-auto w-full max-w-7xl px-6 py-10">
            <div className="space-y-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}