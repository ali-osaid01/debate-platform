import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export default function ProfileAvatar() {
  return (
    <div className=''>
      <DropdownMenu>
        <DropdownMenuTrigger className=''>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>Setting</DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>Billing</DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
