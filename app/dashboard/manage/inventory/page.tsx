import { checkAuth } from '@/lib/middleware';

export default async function ManageInventory() {
  await checkAuth();

  return <span>Manage Inventory Space Holder</span>;
}
