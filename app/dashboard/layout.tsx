import { checkAuth } from '@/lib/middleware';
import { ReactNode } from 'react';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  await checkAuth();
  return <>{children}</>;
}
