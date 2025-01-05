import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, UserMinus, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "@/services/follow.service";
import { STATUS } from "@/types/enum";

interface FollowButtonProps {
  initialIsFollowing: boolean;
  user: string;
}

export function FollowButton({ initialIsFollowing, user }: FollowButtonProps) {
  const queryClient = useQueryClient();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  const {mutate,status} = useMutation<{ response: any; status: STATUS }, Error>({
    mutationFn: () => followUser(user),
    onMutate: async () => {
      setIsButtonDisabled(true); // Disable button
      setIsFollowing((prev) => !prev); // Optimistically update UI
    },
    onError: (error) => {
      setIsFollowing(initialIsFollowing); // Revert UI on error
    },
    onSettled: () => {
      setIsButtonDisabled(false); // Re-enable button after mutation
      queryClient.invalidateQueries({ queryKey: ["isFollowing", user] });
      queryClient.invalidateQueries({ queryKey: ["user-profile", user] });
      
    },
  });

  return (
    <Button
      disabled={status === "pending" || isButtonDisabled} // Disable button during mutation
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
      onClick={() => mutate()}
    >
      <span className="flex items-center">
        {status === "pending" ? (
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
  );
}
