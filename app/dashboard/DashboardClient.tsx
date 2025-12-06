// app/dashboard/DashboardClient.tsx
'use client';

import { FiShoppingCart, FiDollarSign, FiStar, FiPackage, FiMessageSquare, FiLogOut } from 'react-icons/fi';
import { signOut, useSession } from 'next-auth/react';

interface Stats {
  ordersCount: number;
  revenueThisMonth: number;
  reviewsCount: number;
  productsCount: number;
}

interface ActivityItem {
  buyer?: { name: string };
  product?: { name: string };
  quantity?: number;
  total?: number;
  rating?: number;
  review?: string | null;
  sender?: { name: string };
  content?: string;
  createdAt: string;
}

interface Activity {
  orders: ActivityItem[];
  reviews: ActivityItem[];
  messages: ActivityItem[];
}

interface DashboardClientProps {
  stats: Stats;
  activity: Activity;
}

export default function DashboardClient({ stats, activity }: DashboardClientProps) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#023047] text-white px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Bar with User & Log Out */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-white/70 text-sm">Welcome back,</p>
          <p className="text-2xl font-bold text-[#ffb703]">
            {session?.user?.name || 'Artisan'}
          </p>
        </div>

        {/* Log Out Button — Only shows when logged in */}
        {session && (
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-6 py-4 bg-[#fb8500] hover:bg-[#ffb703] text-white font-bold rounded-2xl shadow-xl hover:shadow-[#fb8500]/40 transition-all duration-300 group"
          >
            <FiLogOut className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span className="font-bold">Log Out</span>
          </button>
        )}
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#fb8500] to-[#ffb703] rounded-3xl p-10 mb-10 shadow-2xl">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          Good morning, Artisan
        </h1>
        <p className="mt-4 text-xl font-medium text-white/95">
          Your craft is on fire today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-5 mb-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        <StatCard
          icon={<FiShoppingCart className="w-9 h-9" />}
          label="Orders"
          value={stats.ordersCount}
          bg="bg-[#fb8500]"
        />
        <StatCard
          icon={<FiDollarSign className="w-9 h-9" />}
          label="Revenue"
          value={`$${stats.revenueThisMonth.toFixed(2)}`}
          bg="bg-[#ffb703]"
        />
        <StatCard
          icon={<FiStar className="w-9 h-9" />}
          label="Reviews"
          value={stats.reviewsCount}
          bg="bg-[#fb8500]"
        />
        <StatCard
          icon={<FiPackage className="w-9 h-9" />}
          label="Products"
          value={stats.productsCount}
          bg="bg-[#ffb703]"
        />
      </div>

      {/* Activity Cards */}
      <div className="grid gap-8 lg:grid-cols-3">
        <ActivityCard title="Recent Orders" icon={<FiShoppingCart className="w-6 h-6" />}>
          {activity.orders.length === 0 ? (
            <p className="text-white/50 italic">No recent orders</p>
          ) : (
            activity.orders.map((o, i) => (
              <div key={i} className="py-4 border-b border-white/10 last:border-0">
                <p className="font-bold text-[#fb8500]">{o.product?.name}</p>
                <p className="text-sm text-white/80 mt-1">
                  {o.quantity} × ${o.total} • <span className="text-white/50">{o.createdAt}</span>
                </p>
              </div>
            ))
          )}
        </ActivityCard>

        <ActivityCard title="Recent Reviews" icon={<FiStar className="w-6 h-6" />}>
          {activity.reviews.length === 0 ? (
            <p className="text-white/50 italic">No recent reviews</p>
          ) : (
            activity.reviews.map((r, i) => (
              <div key={i} className="py-4 border-b border-white/10 last:border-0">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < (r.rating || 0) ? 'text-[#ffb703]' : 'text-white/20'}
                    >
                      Star
                    </span>
                  ))}
                </div>
                <p className="text-white text-sm">{r.review || 'Masterpiece!'}</p>
                <p className="text-xs text-white/50 mt-1">{r.createdAt}</p>
              </div>
            ))
          )}
        </ActivityCard>

        <ActivityCard title="Recent Messages" icon={<FiMessageSquare className="w-6 h-6" />}>
          {activity.messages.length === 0 ? (
            <p className="text-white/50 italic">No recent messages</p>
          ) : (
            activity.messages.map((m, i) => (
              <div key={i} className="py-4 border-b border-white/10 last:border-0">
                <p className="font-bold text-[#fb8500]">{m.sender?.name || 'Customer'}</p>
                <p className="text-sm italic text-white/90 mt-1">“{m.content}”</p>
                <p className="text-xs text-white/50 mt-1">{m.createdAt}</p>
              </div>
            ))
          )}
        </ActivityCard>
      </div>
    </div>
  );
}

// Stat Card
function StatCard({
  icon,
  label,
  value,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bg: string;
}) {
  return (
    <div className={`${bg} rounded-3xl p-7 shadow-2xl border-4 border-white/20 hover:scale-105 hover:shadow-3xl transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/90 text-base font-semibold">{label}</p>
          <p className="text-4xl font-black text-white mt-3">{value}</p>
        </div>
        <div className="text-white/90">{icon}</div>
      </div>
    </div>
  );
}

// Activity Card
function ActivityCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#023047]/90 backdrop-blur-xl rounded-3xl p-8 border border-white/15 shadow-2xl">
      <div className="flex items-center gap-4 mb-7">
        <div className="p-3 bg-[#ffb703] rounded-2xl">{icon}</div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}