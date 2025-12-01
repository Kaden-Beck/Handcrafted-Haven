import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default async function ProductManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-balance">Seller</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://bundui-images.netlify.app/avatars/10.png" />
                <AvatarFallback>AG</AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button size="sm">Upload image</Button>
                <Button variant="outline" size="sm">
                  Remove
                </Button>
              </div>
            </div>

            {/* Personal info form */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" defaultValue="Angelina" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userName">User name</Label>
                <Input id="userName" defaultValue="Gotelli" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="carolyn_h@hotmail.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <div className="flex gap-2">
                <Select defaultValue="us">
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">🇺🇸 +1</SelectItem>
                    <SelectItem value="uk">🇬🇧 +44</SelectItem>
                  </SelectContent>
                </Select>
                <Input className="flex-1" defaultValue="121231234" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select defaultValue="us">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">🇺🇸 United States</SelectItem>
                <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" defaultValue="123 Main St" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue="New York" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input id="postalCode" defaultValue="10001" />
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
