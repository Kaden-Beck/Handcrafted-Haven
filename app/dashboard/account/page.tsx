import prisma from '@/lib/prisma';
import { AccountForm } from './account-form';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { User } from '@/prisma/generated/prisma';

export default async function AccountManagement() {
  let user: User;
  const session = await auth();
  if (!session) redirect('/login');

  try {
    user = await prisma.user.findUniqueOrThrow({ where: { id: session.user?.id } });

    // user = await prisma.user.findFirst();
    // if (user == null) redirect('/login');
  } catch (error) {
    console.log(error);
    redirect('/login');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-balance">Account Details</h1>
      <AccountForm user={user} />
    </div>
  );
}
