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
import { CreditCard, LogOut, Package, Settings, User } from 'lucide-react'
import Link from 'next/link'

export default function ProfileAvatar() {

  const router = useRouter()
  const { clearUser, user } = useUserStore()

  const handleLogout = () => {
    clearUser();
    router.push('/login')
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className=''>
          <Avatar>
            <AvatarImage src={user?.profilePicture || "https://github.com/shadcn.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/profile/${user?._id}`}>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href={'/profile/notification'}>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Setting
            </DropdownMenuItem>
          </Link>
          <Link href={'/billing'}>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Billing
            </DropdownMenuItem>
          </Link>
          <Link href={'/subscription'}>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
              <Package className="h-4 w-4" />
              Subscription
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer flex items-center gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
