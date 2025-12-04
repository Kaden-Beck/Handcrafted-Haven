import prisma from '@/lib/prisma';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { User } from '@/prisma/generated/prisma';

export default async function AccountManagement() {
  let user: User;
  const session = await auth();
  if (!session) redirect('/login');

  try {
    user = await prisma.user.findUniqueOrThrow({ where: { id: session.user?.id } });

    // user = await prisma.user.findFirst();
    // if (user == null) redirect('/login');
  } catch (error) {
    console.log(error);
    redirect('/login');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-balance">Account Details</h1>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://bundui-images.netlify.app/avatars/10.png" />
                <AvatarFallback>AVI</AvatarFallback>
              </Avatar>
              <div>
                <span className="text-2xl">{user?.name}</span>
              </div>
            </div>

            {/* Personal info form */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" defaultValue={user.name || 'First Name'} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">User name</Label>
                <Input id="email" type="email" defaultValue={user.email || 'email@example.com'} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" defaultValue={user.bio || 'Your bio'} />
            </div>

            <div className="flex justify-end">
              <Button>Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
