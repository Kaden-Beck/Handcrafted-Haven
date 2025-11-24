import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export { auth as middleware } from '@/lib/auth';

type RequestLike = { url: string };

export async function checkAuth(request?: RequestLike) {
  const session = await auth();
  if (!session) {
    const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
    const baseUrl = process.env.NEXTAUTH_URL || vercelUrl || 'http://localhost:3000';
    const pathname = request ? new URL(request.url, baseUrl).pathname : undefined;
    const destination = pathname ? `/login?redirect=${encodeURIComponent(pathname)}` : '/login';
    redirect(destination);
  }
}
