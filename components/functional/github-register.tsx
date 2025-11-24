'use client';

import { githubRegisterAction } from '@/app/(auth)/register/actions';
import { Button } from '../ui/button';
import Github from '../ui/github';

export default function GithubRegister() {
  return (
    <form action={githubRegisterAction}>
      <Button variant="outline" className="w-full">
        <Github />
        Sign Up with GitHub
      </Button>
    </form>
  );
}
