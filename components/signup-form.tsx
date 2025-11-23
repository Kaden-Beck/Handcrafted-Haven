import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import GithubRegister from './functional/github-register';

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className="flex flex-col items-center">
      <Link className="mb-3" href="/">
        <Logo />
      </Link>
      <Card className={cn('text-center', className)} {...props}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Seller Account</CardTitle>
          <p className="text-muted-foreground text-sm ">
            Fill out the form below to start selling today!
          </p>
        </CardHeader>
        <CardContent>
          <GithubRegister />
        </CardContent>
        <CardFooter className="flex flex-row justify-center-safe">
          <p className="pl-1 pr-1">Already have an account?</p>
          <Link href="/login" className="underline pl-1 pr-1">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
