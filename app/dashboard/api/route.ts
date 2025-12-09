// app/dashboard/api/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth'; // This gives you session on server
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const [orders, revenueThisMonth, reviewsCount, productsCount, recentReviews, recentMessages] =
    await Promise.all([
      prisma.order.findMany({
        where: { buyerId: user.id },
        include: { product: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),

      prisma.order.aggregate({
        where: {
          buyerId: user.id,
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
        _sum: { total: true },
      }),

      prisma.review.count({ where: { product: { sellerId: user.id } } }),
      prisma.product.count({ where: { sellerId: user.id } }),

      prisma.review.findMany({
        where: { product: { sellerId: user.id } },
        include: { product: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),

      prisma.message.findMany({
        where: { senderId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / 3_600_000);
    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return days === 1 ? 'yesterday' : `${days}d ago`;
  };

  return NextResponse.json({
    stats: {
      ordersCount: orders.length,
      revenueThisMonth: Number(revenueThisMonth._sum.total || 0),
      reviewsCount,
      productsCount,
    },
    activity: {
      orders: orders.map((o) => ({
        buyer: { name: user.name || 'You' },
        product: { name: o.product.name },
        quantity: o.quantity,
        total: Number(o.total),
        createdAt: formatTime(o.createdAt),
      })),
      reviews: recentReviews.map((r) => ({
        rating: r.rating,
        review: r.review,
        product: { name: r.product.name },
        createdAt: formatTime(r.createdAt),
      })),
      messages: recentMessages.map((m) => ({
        sender: { name: user.name || 'You' },
        content: m.content,
        createdAt: formatTime(m.createdAt),
      })),
    },
  });
}
