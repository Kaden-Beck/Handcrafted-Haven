import { checkAuth } from '@/lib/middleware';

export default async function ManageAccount() {
  await checkAuth();
  return <h1>Manage Account</h1>;
}
