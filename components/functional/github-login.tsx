'use client';

import { githubSignInAction } from '@/app/(auth)/login/actions';
import { Button } from '../ui/button';
import Github from '../ui/github';

export default function GithubLogin() {
  return (
    <form action={githubSignInAction}>
      <Button className="w-full" variant="outline">
        <Github />
        Continue with GitHub
      </Button>
    </form>
  );
}
