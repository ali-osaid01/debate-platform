// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { UserIcon } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { IUser } from "@/types/interface/user.interface";
import { FC } from "react";
import { PhoneInputShadcnUiPhoneInput } from "../ui/phone-input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FloatingInput } from "../shared/Auth-Input";
import userValidationSchema from "@/validation/user.validation";
import FileUpload from "./file-upload";
import { useFormMutation } from "@/hooks/useFormMutation";
import { ERROR_UPDATE_PROFILE, SUCCESS_UPDATE_PROFILE } from "@/utils/constant";
import { updateUser } from "@/services/user.service";
import { useQueryClient } from "@tanstack/react-query";
// import { E164Number, parsePhoneNumber } from "libphonenumber-js";

interface EditProfileProps {
  user?: IUser;
}

const EditProfile: FC<EditProfileProps> = ({ user }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userValidationSchema),
  });
  const queryClient = useQueryClient();

  const { handleFormSubmit } = useFormMutation<unknown, Error, Partial<IUser>>({
    mutationFn: updateUser,
    successMessage: SUCCESS_UPDATE_PROFILE,
    errorMessage: ERROR_UPDATE_PROFILE,
    route: "/feed",
  });

  const onSubmit = async (data: Partial<IUser>) => {
    handleFormSubmit(data);
    queryClient.invalidateQueries({ queryKey: ["user"] });
    console.log("FORM DATA PROFILE ->", data);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FloatingInput
              id="name"
              placeholder="Enter Name"
              defaultValue={user?.name || ""}
              name="name"
              register={register}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}{" "}
            <FloatingInput
              id="username"
              placeholder="Enter Username"
              defaultValue={user?.username || ""}
              name="username"
              register={register}
            />
            {/* Display error */}
          </div>
          <div className="space-y-2">
            <FloatingInput
              id="website"
              placeholder="Website"
              defaultValue={user?.website || ""}
              name="website"
              register={register}
            />
            {errors.website && (
              <span className="text-red-500 text-sm">
                {errors.website.message}
              </span>
            )}{" "}
            {/* Display error */}
          </div>

          <div className="space-y-2">
            <div className="group relative">
              <label
                htmlFor="bio"
                className="origin-start absolute top-0 block translate-y-2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:-translate-y-1/2 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+textarea:not(:placeholder-shown)]:pointer-events-none has-[+textarea:not(:placeholder-shown)]:-translate-y-1/2 has-[+textarea:not(:placeholder-shown)]:cursor-default has-[+textarea:not(:placeholder-shown)]:text-xs has-[+textarea:not(:placeholder-shown)]:font-medium has-[+textarea:not(:placeholder-shown)]:text-foreground"
              >
                <span className="inline-flex bg-background px-2">Bio</span>
              </label>
              <Textarea
                id="bio"
                placeholder=""
                {...register("bio")}
                defaultValue={user?.bio}
              />
            </div>
            {errors.bio && (
              <span className="text-red-500 text-sm">{errors.bio.message}</span>
            )}{" "}
            {/* Display error */}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <PhoneInputShadcnUiPhoneInput
              register={register}
              name="phone"
              defaultValue={user?.phone?.trim() ?? "+33"}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}{" "}
            {/* Display error */}
          </div>

          {/* Location Field */}
          <div className="space-y-2">
            <FloatingInput
              id="location"
              placeholder="Location"
              name="location"
              defaultValue={user?.location || ""}
              register={register}
            />
            {errors.location && (
              <span className="text-red-500 text-sm">
                {errors.location.message}
              </span>
            )}{" "}
            {/* Display error */}
          </div>

          {/* Profile Picture */}
          <div className="space-y-2">
            <FileUpload
              setValue={setValue}
              maxFileSize={2 * 1024 * 1024}
              onUploadSuccess={(url) => console.log("Uploaded:", url)}
              onUploadError={(error) => console.error(error)}
              className="rounded-full w-16 h-16 bg-gray-200 flex justify-center items-center cursor-pointer hover:bg-gray-300 transition-all"
              name="profilePicture"
            >
              <UserIcon />
            </FileUpload>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditProfile;
