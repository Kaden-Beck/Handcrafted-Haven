import { checkAuth } from '@/lib/middleware';

export default function ManageAccount() {
  checkAuth();
  return <h1>Manage Account</h1>;
}
