"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, UserMinus, Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { followUser } from "@/services/follow.service";
import { FOLLOW_USER_SUCCESS, NETWORK_ERROR } from "@/utils/constant";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQueryClient } from "@tanstack/react-query";

interface FollowButtonProps {
  initialIsFollowing: boolean;
  user: string;
}
type FollowFormValues = {
  userId: string;
};
export function FollowButton({ initialIsFollowing, user }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FollowFormValues>({
    defaultValues: {
      userId: user,
    },
  });

  const { handleFormSubmit } = useFormMutation<FollowFormValues, Error>({
    mutationFn: followUser,
    successMessage: FOLLOW_USER_SUCCESS,
    errorMessage: NETWORK_ERROR,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isFollowing"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  const onSubmit: SubmitHandler<FollowFormValues> = async () => {
    handleFormSubmit(user);

    console.log("THIS PART CALLED");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button
        disabled={isSubmitting}
        variant={isFollowing ? "secondary" : "default"}
        className={`
        font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200 ease-in-out
        ${
          isFollowing
            ? "bg-gray-200 text-gray-800 hover:bg-red-100 hover:text-red-600 focus:ring-red-200"
            : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-200"
        }
        focus:outline-none focus:ring-2 focus:ring-offset-2
      `}
      >
        <span className="flex items-center">
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isFollowing ? (
            <>
              <span className="mr-1">Following</span>
              <UserMinus className="w-4 h-4" />
            </>
          ) : (
            <>
              <span className="mr-1">Follow</span>
              <UserPlus className="w-4 h-4" />
            </>
          )}
        </span>
      </Button>
    </form>
  );
}
