import { checkAuth } from '@/lib/middleware';

export default async function DashboardPage() {
  await checkAuth();

  return (
    <>
      <h1>Dashboard</h1>
      <span>Dashboard Placeholder</span>
    </>
  );
}
