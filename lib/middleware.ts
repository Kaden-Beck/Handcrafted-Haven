import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export { auth as middleware } from '@/lib/auth';

export async function checkAuth(request: { url: string }) {
  const session = await auth();
  if (!session) {
    const redirectUrl = `/login?redirect=${encodeURIComponent(new URL(request.url).pathname)}`;
    redirect(redirectUrl);
  }
}
