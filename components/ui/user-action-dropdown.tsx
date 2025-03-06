import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { CircleUser, Trash2, EllipsisVertical } from "lucide-react";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
//   import { actionUserStatus } from "@/service/user.api";
  import { toast } from "sonner";
import { UserActionType } from "@/types/enum";
  
  
  interface UserActionsDropdownProps {
    id: string;
    isUserStatusEnabled: boolean;
    invalidateKey:string
  }
  
  export function UserActionsDropdown({ id,isUserStatusEnabled,invalidateKey }: UserActionsDropdownProps) {
    const queryClient = useQueryClient()
  
    // const { mutate, status } = useMutation({
    //   mutationFn: actionUserStatus,
    //   onError: (error) => {
    //     toast.error("An error occurred while performing action");
    //     console.log(error);
    //   },
    //   onSuccess: (data) => {
    //     queryClient.invalidateQueries({queryKey:[invalidateKey]});
    //   },
    // });
  
    const handleAction = (actionType: UserActionType) => {
    //   mutate({id,action:actionType} );
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={status === "pending"}>
          <EllipsisVertical className='text-[#9FA09C] cursor-pointer' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
       
          <DropdownMenuItem
            className="gap-2 text-muted-foreground cursor-pointer"
            onClick={() => handleAction(isUserStatusEnabled ? "disable" : "enable")}
          >
            <CircleUser className="h-4 w-4" /> 
            {isUserStatusEnabled ? 'Disable User' : 'Enable User'}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2 text-destructive cursor-pointer"
            onClick={() => handleAction("delete")}
          >
            <Trash2 className="h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  