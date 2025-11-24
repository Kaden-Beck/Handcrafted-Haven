// 'use server';
import { signIn } from '@/lib/auth';
import { Button } from '../ui/button';
import Github from '../ui/github';

export default async function GithubLogin() {
  return (
    // <form
    //   action={async () => {
    //     await signIn('github');
    //   }}
    // >
    <Button className="w-full" variant="outline">
      <Github />
      Continue with GitHub
    </Button>
    // </form>
  );
}
