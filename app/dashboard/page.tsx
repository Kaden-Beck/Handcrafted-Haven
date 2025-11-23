import { auth } from '@/lib/auth';
import { checkAuth } from '@/lib/middleware';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  checkAuth();

  return (
    <>
      <h1>Dashboard</h1>
      <span>Dashboard Placeholder</span>
    </>
  );
}
