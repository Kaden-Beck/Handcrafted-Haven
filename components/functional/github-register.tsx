'use client';

import { auth } from '@/lib/auth';
import { useState, useTransition } from 'react';
import { Button } from '../ui/button';
import Github from '../ui/github';

export default function GithubRegister() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setError(null);
    startTransition(async () => {
      try {
        await auth();
      } catch {
        setError('Failed to start sign in');
      }
    });
  };

  return (
    <div>
      <Button
        variant="outline"
        type="button"
        disabled={isPending}
        onClick={handleClick}
        aria-label="Sign Up with GitHub"
      >
        <Github />
        {isPending ? 'Starting…' : 'Sign Up with GitHub'}
      </Button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
