import { checkAuth } from '@/lib/middleware';

export default function ManageInventory() {
  checkAuth();

  return <span>Manage Inventory Space Holder</span>;
}
