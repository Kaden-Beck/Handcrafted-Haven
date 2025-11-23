'use client';

import { signIn } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { Button } from '../ui/button';
import Github from '../ui/github';

export default function GithubLogin({
  provider = 'github',
  callbackUrl = '/api/auth/callback/github',
}: {
  provider?: string;
  callbackUrl?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setError(null);
    startTransition(async () => {
      try {
        await signIn(provider, { callbackUrl });
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
        aria-label="Login with GitHub"
      >
        <Github />
        {isPending ? 'Starting…' : 'Login with GitHub'}
      </Button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
