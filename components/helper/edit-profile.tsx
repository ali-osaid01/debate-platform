import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, CameraIcon, UserIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"

export default function EditProfile() {
    return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell us about yourself ex Photographer | Traveler | Coffee Lover" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <div className="flex">
                <Input id="dob" type="date" className="rounded-r-none" />
                <Button variant="outline" className="rounded-l-none">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" placeholder="Your phone number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Your location" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-picture">Profile Picture</Label>
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg" alt="Current profile picture" />
                <AvatarFallback><UserIcon className="w-8 h-8" /></AvatarFallback>
              </Avatar>
              <Button variant="outline">
                <CameraIcon className="mr-2 h-4 w-4" />
                Change Picture
              </Button>
            </div>
          </div>
          <Button type="submit">Update Profile</Button>
        </form>
      </CardContent>
    </Card>);
  }
  