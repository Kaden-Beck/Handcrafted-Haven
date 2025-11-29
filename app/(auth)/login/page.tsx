import { LoginForm } from '@/components/login-form';
import { Logo } from '@/components/ui/logo';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect('/dashboard');

  return (
    <div className="flex w-full items-start justify-center px-6 py-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
