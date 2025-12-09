'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/prisma/generated/prisma';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface AccountFormProps {
  user: User;
}

export function AccountForm({ user }: AccountFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      bio: formData.get('bio') as string,
    };

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update account');
      }

      toast.success('Account updated successfully');
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image || 'https://bundui-images.netlify.app/avatars/10.png'} />
              <AvatarFallback>
                {user.name
                  ? user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)
                  : 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-2xl">{user.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={user.name || ''} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={user.email || ''} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input id="bio" name="bio" defaultValue={user.bio || ''} placeholder="Tell us about yourself" />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
