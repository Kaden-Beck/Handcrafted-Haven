import { SettingsPage } from '@/components/settings-page';
import { checkAuth } from '@/lib/middleware';

export default async function DashboardPage() {
  // await checkAuth({ url: '/dashboard' });

  return <SettingsPage />;
}
