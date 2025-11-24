'use client';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex justify-center">
      <Button variant="destructive" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export { SignOut };
