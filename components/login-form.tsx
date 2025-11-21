'use client';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import GithubLogin from './functional/GithubLogin';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Use GitHub to log in to your seller account</CardDescription>
        </CardHeader>
        <CardContent>
          <GithubLogin />
        </CardContent>
        <CardContent>
          Don&apos;t have an account?{' '}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
