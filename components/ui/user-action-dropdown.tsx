import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser, Trash2, EllipsisVertical } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleStatus, deleteUser } from "@/services/user.service";
import { toast } from "sonner";
import { UserActionType } from "@/types/enum";

interface UserActionsDropdownProps {
  id: string;
  isUserStatusEnabled: boolean;
  invalidateKey: string;
}

export function UserActionsDropdown({ id, isUserStatusEnabled, invalidateKey }: UserActionsDropdownProps) {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: ({ id, action }: { id: string; action: boolean }) => toggleStatus(id, action),
    onError: () => {
      toast.error("An error occurred while updating user status.");
    },
    onSuccess: () => {
      toast.success("User status updated successfully.");
      queryClient.invalidateQueries({ queryKey: [invalidateKey] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onError: () => {
      toast.error("An error occurred while deleting the user.");
    },
    onSuccess: () => {
      toast.success("User deleted successfully.");
      queryClient.invalidateQueries({ queryKey: [invalidateKey] });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={toggleMutation.status === "pending" || deleteMutation.status === "pending"}>
          <EllipsisVertical className="text-[#9FA09C] cursor-pointer" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          className="gap-2 text-muted-foreground cursor-pointer"
          onClick={() => toggleMutation.mutate({ id, action: isUserStatusEnabled ? false : true })}
        >
          <CircleUser className="h-4 w-4" />
          {isUserStatusEnabled ? "Disable User" : "Enable User"}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 text-destructive cursor-pointer"
          onClick={() => deleteMutation.mutate(id)}
        >
          <Trash2 className="h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}