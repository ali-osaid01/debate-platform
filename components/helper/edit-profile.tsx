import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, CameraIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { IUser } from "@/types/interface/user.interface";
import { FC } from "react";
import { PhoneInputShadcnUiPhoneInput } from "../ui/phone-input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FloatingInput } from "../shared/Auth-Input";
import userValidationSchema from "@/validation/user.validation";

interface EditProfileProps {
  user?: IUser;
}

const EditProfile: FC<EditProfileProps> = ({ user }) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userValidationSchema),
  });

  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-4">
          <div className="space-y-2">
            <FloatingInput id="name" placeholder="Enter username" defaultValue={user?.name || ""} name="name" register={register}/>
          </div>
          <div className="space-y-2">
            <FloatingInput id="website" placeholder="Website" defaultValue={user?.website || ""} name="website" register={register}/>
          </div>
          {/* Bio Field */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself e.g., Photographer | Traveler | Coffee Lover"
              defaultValue={user?.bio || ""}
              {...register}
            />
          </div>

          {/* <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <div className="flex">
                <Input
                  id="dob"
                  type="date"
                  className="rounded-r-none"
                  defaultValue={user?.dob ? new Date(user.dob).toISOString().split('T')[0] : ''}
                />
                <Button variant="outline" className="rounded-l-none">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select defaultValue={user?.gender || ""}>
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
          </div> */}

          {/* Phone Field */}

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            {/* <Input id="phone" type="tel" placeholder="Your phone number" defaultValue={user?.phone || ""} /> */}
            <PhoneInputShadcnUiPhoneInput register={register} name="phone" defaultValue={user?.phone}/>
          </div>

          {/* Location Field */}
          <div className="space-y-2">
            <FloatingInput id="location" placeholder="Location" name="location" defaultValue={user?.location || ""}  register={register} />
          </div>

          {/* Profile Picture */}
          <div className="space-y-2">
            <Label htmlFor="profile-picture">Profile Picture</Label>
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user?.profilePicture || "/placeholder.svg"} alt="Current profile picture" />
                <AvatarFallback>
                  <UserIcon className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <Button variant="outline">
                <CameraIcon className="mr-2 h-4 w-4" />
                Change Picture
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit">Update Profile</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditProfile;
