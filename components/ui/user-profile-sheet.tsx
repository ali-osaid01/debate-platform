import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ArrowLeft } from "lucide-react"

import React, { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import { IUser } from "@/types/interface/user.interface"

interface UserProfileSheetProps {
    user:IUser
}

const UserProfileSheet:FC<UserProfileSheetProps> = ({user}) => {
    return (
            <Sheet>
                <SheetTrigger asChild>
                        <div className="flex gap-2 items-center">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.profilePicture} />
                                <AvatarFallback>
                                {user?.name?.[0]}{user?.name?.[1]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <p className="font-bold text-start">User Name</p>
                                <p>{user?.email}</p>
                            </div>
                        </div>
                </SheetTrigger>
                <SheetContent className="w-full max-w-sm p-0 sm:max-w-sm">
                    <div className="space-y-6">
                        <SheetHeader className="px-6 pt-6">
                            <div className="flex items-center space-x-4">
                                <ArrowLeft className="h-5 w-5" />
                                <SheetTitle>Profile Information</SheetTitle>
                            </div>
                        </SheetHeader>
                        <div className="flex justify-center">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={user?.profilePicture} />
                                <AvatarFallback>
                                    {user?.name?.[0]}{user?.name?.[1]}
                                    </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="space-y-4 px-6">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Full name</p>
                                <p className="text-sm font-medium">{user?.name || '-'}</p>
                            </div>
                     
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Date of birth</p>
                                <p className="text-sm font-medium">{String(user?.dob) || '-'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Username</p>
                                <p className="text-sm font-medium">{user?.username}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="text-sm font-medium">{user?.email}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Score</p>
                                <Link href="#" className="text-sm font-medium text-blue-600">
                                    {user?.score}
                                </Link>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
    )
}

export default UserProfileSheet;