import prisma from '@/lib/prisma';
import DashboardClient from './DashboardClient';

// Helper: format relative time
function formatRelativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return days === 1 ? 'Yesterday' : `${days}d ago`;
}

export default async function DashboardPage() {
  // Stats
  const ordersCount = await prisma.order.count();
  const reviewsCount = await prisma.review.count();
  const productsCount = await prisma.product.count();

  const revenueAgg = await prisma.order.aggregate({
    _sum: { total: true },
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
  });

  const revenueValue = Number(revenueAgg._sum.total || 0);

  // Orders
  const recentOrdersRaw = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { buyer: true, product: true },
  });

  const recentOrders = recentOrdersRaw.map((o) => ({
    ...o,
    total: Number(o.total),
    product: { ...o.product, price: Number(o.product.price) },
    createdAt: formatRelativeTime(o.createdAt),
  }));

  // Reviews
  const recentReviewsRaw = await prisma.review.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { product: true },
  });

  const recentReviews = recentReviewsRaw.map((r) => ({
    ...r,
    rating: r.rating ?? 0,
    review: r.review ?? null,
    product: { ...r.product, price: Number(r.product.price) },
    createdAt: formatRelativeTime(r.createdAt),
  }));

  // Messages
  const recentMessagesRaw = await prisma.message.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { sender: true },
  });

  const recentMessages = recentMessagesRaw.map((m) => ({
    ...m,
    content: m.content ?? null,
    sender: { ...m.sender, name: m.sender?.name ?? null },
    createdAt: formatRelativeTime(m.createdAt),
  }));

  return (
    <DashboardClient
      stats={{
        ordersCount,
        revenueThisMonth: revenueValue,
        reviewsCount,
        productsCount,
      }}
      activity={{
        orders: recentOrders,
        reviews: recentReviews,
        messages: recentMessages,
      }}
    />
  );
}
