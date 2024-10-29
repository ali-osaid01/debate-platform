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
import { useUserStore } from '@/store/user.store'
import { useRouter } from 'next/navigation'

export default function ProfileAvatar() {
  
  const router = useRouter()
  const { clearUser } = useUserStore()

  const handleLogut = () => {
    clearUser();
    router.push('/login')
  }

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
          <DropdownMenuItem className='cursor-pointer' onClick={handleLogut}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
