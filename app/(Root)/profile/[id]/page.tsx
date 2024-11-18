'use client'

import {  useState } from 'react'
import { Button } from "@/components/ui/button"
import { GridIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EditProfile from '@/components/helper/edit-profile'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { authenticatedUser } from '@/services/user.service'
import { IUser } from '@/types/interface/user.interface'

export default  function Profile() {

  const params = useParams<{ id: string; }>()

  const {data:user,isLoading} = useQuery<ApiResponse<IUser>>({
    queryKey:["user-profile"],
    queryFn:()=>authenticatedUser(params.id)
  })

  const [activeTab, setActiveTab] = useState('posts')

  const posts = 42
  const followers = 1234
  const following = 567

  console.log("PROFILE DATA ->",user?.response?.data)
  console.log("PROFILE LOADING ->",isLoading);
  
  return (
    <div className="mx-auto p-4 max-w-4xl">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <div className="mb-4 md:mb-0 md:mr-8">
          <Avatar className="w-32 h-32 md:w-40 md:h-40">
            <AvatarImage src="/placeholder.svg" alt="Profile picture" />
            <AvatarFallback>
              <UserIcon className="w-16 h-16" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-4">
            <h1 className="text-2xl font-bold mr-4">{user?.response?.data?.name}</h1>
            <div className="flex space-x-2 mt-2 md:mt-0">
              <Button>Edit Profile</Button>
              <Button variant="outline">
                <SettingsIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-center md:justify-start space-x-8 mb-4">
            <div className="text-center md:text-left">
              <span className="font-bold">{posts}</span> posts
            </div>
            <div className="text-center md:text-left">
              <span className="font-bold">{followers}</span> followers
            </div>
            <div className="text-center md:text-left">
              <span className="font-bold">{following}</span> following
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="font-bold">{user?.response?.data?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.response?.data?.bio}</p>
            <p className="text-sm">www.johndoe.com</p>
          </div>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="w-full justify-center">
          <TabsTrigger value="posts" className="flex-1"><GridIcon className="w-4 h-4 mr-2" /> Posts</TabsTrigger>
          <TabsTrigger value="edit" className="flex-1"><SettingsIcon className="w-4 h-4 mr-2" /> Edit Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="aspect-square bg-muted"></div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="edit">
          <EditProfile user={user?.response?.data}/>
        </TabsContent>
      </Tabs>
    </div>
  )
}