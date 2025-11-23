import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export { auth as middleware } from '@/lib/auth';

export async function checkAuth() {
  const session = await auth();
  if (!session) redirect('/login');
}
