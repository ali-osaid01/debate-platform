"use client";

import { useState } from "react";
import { GridIcon, SettingsIcon, UserIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditProfile from "@/components/helper/edit-profile";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { authenticatedUser } from "@/services/user.service";
import { IUser } from "@/types/interface/user.interface";
import Link from "next/link";
import { useUserStore } from "@/store/user.store";
import { FollowButton } from "@/components/ui/follow-button";
import { checkIsFollowing } from "@/services/follow.service";
import { fetchEvents } from "@/services/event.service";
import { IEvents } from "@/types/interface/event.interface";
import EventGrid from "@/components/helper/event-grid";

export default function Profile() {
  const params = useParams<{ id: string }>();
  const { user: currentUser } = useUserStore();
  const [activeTab, setActiveTab] = useState("posts");

  const { data: user } = useQuery<ApiResponse<IUser>>({
    queryKey: ["user-profile"],
    queryFn: () => authenticatedUser(params.id),
  });
  const isCurrentUser = user?.response?.data?._id === currentUser?._id;

  console.log("IS CURRNET USER ->", isCurrentUser);
  const { data: isFollowing } = useQuery<{ response: boolean }>({
    queryKey: ["isFollowing"],
    queryFn: () => checkIsFollowing(params.id),
    enabled: isCurrentUser == false,
  });
  const { data: events, isLoading: isEventLoading } = useQuery<
    ApiResponse<IEvents>
  >({
    queryKey: ["user-events"],
    queryFn: () => fetchEvents(true),
  });

  console.log("USER ->", user?.response);
  console.log("isFollowing  ->", isFollowing);

  return (
    <div className="mx-auto p-4 max-w-4xl">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <div className="mb-4 md:mb-0 md:mr-8">
          <Avatar className="w-32 h-32 md:w-40 md:h-40">
            <AvatarImage
              src={
                user?.response?.data?.profilePicture || "./placeholderImage.png"
              }
              alt="Profile picture"
            />
            <AvatarFallback>
              <UserIcon className="w-16 h-16" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-4">
            <h1 className="text-2xl font-bold mr-4">
              {user?.response?.data?.username}
            </h1>
            <div className="flex space-x-2 mt-2 md:mt-0"></div>
          </div>
          <div className="flex justify-center md:justify-start space-x-8 mb-4">
            <div className="text-center md:text-left">
              <span className="font-bold">
                {user?.response.data.postCount || 0}
              </span>{" "}
              posts
            </div>
            <div className="text-center md:text-left">
              <span className="font-bold">
                {user?.response.data.followerCount || 0}
              </span>{" "}
              followers
            </div>
            <div className="text-center md:text-left">
              <span className="font-bold">
                {user?.response.data.followingCount || 0}
              </span>{" "}
              following
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="font-bold">{user?.response?.data?.name}</h2>
            <p className="text-sm text-muted-foreground">
              {user?.response?.data?.bio}
            </p>
            <p className="text-sm">
              <Link href={user?.response?.data?.website || ""}>
                {user?.response?.data?.website}
              </Link>
            </p>
          </div>
        </div>
        {!isCurrentUser && (
          <FollowButton
            initialIsFollowing={isFollowing?.response || false}
            user={params.id}
          />
        )}
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="w-full justify-center">
          <TabsTrigger value="posts" className="flex-1">
            <GridIcon className="w-4 h-4 mr-2" /> Posts
          </TabsTrigger>
          {isCurrentUser && (
            <TabsTrigger value="edit" className="flex-1">
              <SettingsIcon className="w-4 h-4 mr-2" /> Edit Profile
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="posts">
          <EventGrid
            events={events?.response.data.data}
            isLoading={isEventLoading}
          />
        </TabsContent>
        <TabsContent value="edit">
          <EditProfile user={user?.response?.data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
