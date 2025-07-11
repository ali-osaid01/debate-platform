'use client'
import React, { useState } from "react";
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
import { UserAchievements } from "@/components/helper/user-achievement";
import { Skeleton } from "@/components/ui/skeleton";

// Extracted components with memoization
const ProfileStats = React.memo(({ user }: { user: IUser | null }) => (
  <div className="flex justify-center md:justify-start space-x-8 mb-4">
    <div className="text-center md:text-left">
      <span className="font-bold">{user?.postCount || 0}</span> posts
    </div>
    <div className="text-center md:text-left">
      <span className="font-bold">{user?.followerCount || 0}</span> followers
    </div>
    <div className="text-center md:text-left">
      <span className="font-bold">{user?.followingCount || 0}</span> following
    </div>
  </div>
));

const ProfileInfo = React.memo(({ user }: { user: IUser | null }) => (
  <div className="text-center md:text-left">
    <h2 className="font-bold">{user?.name}</h2>
    <p className="text-sm text-muted-foreground">{user?.bio}</p>
    {user?.website && (
      <p className="text-sm">
        <Link href={user.website}>{user.website}</Link>
      </p>
    )}
  </div>
));

const ProfileAvatar = React.memo(({ profilePicture }: { profilePicture?: string }) => (
  <Avatar className="w-32 h-32 md:w-40 md:h-40">
    <AvatarImage
      src={profilePicture || "./placeholderImage.png"}
      alt="Profile picture"
    />
    <AvatarFallback>
      <UserIcon className="w-16 h-16" />
    </AvatarFallback>
  </Avatar>
));

const ProfileSkeleton = () => (
  <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
    <div className="mb-4 md:mb-0 md:mr-8">
      <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full" />
    </div>
    <div className="flex-grow">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-4">
        <Skeleton className="h-8 w-40 mb-2 md:mb-0 md:mr-4" />
      </div>
      <div className="flex justify-center md:justify-start space-x-8 mb-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-6 w-32 mb-2" />
      <Skeleton className="h-4 w-48 mb-2" />
      <Skeleton className="h-4 w-32" />
    </div>
  </div>
);

export default function Profile() {
  const params = useParams<{ id: string }>();
  const { user: currentUser } = useUserStore();
  const [activeTab, setActiveTab] = useState("posts");

  const { data: userData, isLoading: isUserLoading } = useQuery<ApiResponse<IUser>>({
    queryKey: ["user-profile", params.id],
    queryFn: () => authenticatedUser(params.id),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  const user = userData?.response?.data;
  const isCurrentUser = Boolean(user && currentUser && user._id === currentUser._id);

  const { data: isFollowing, isLoading: isFollowLoading } = useQuery<{ response: boolean }>({
    queryKey: ["isFollowing", params.id],
    queryFn: () => checkIsFollowing(params.id),
    enabled: !isUserLoading && isCurrentUser === false,
    staleTime: 1000 * 60 * 5,
  });

  const { data: events, isLoading: isEventLoading } = useQuery<ApiResponse<IEvents>>({
    queryKey: ["user-events", params.id],
    queryFn: () => fetchEvents(params.id),
    staleTime: 1000 * 60 * 5,
  });

  if (isUserLoading) {
    return (
      <div className="mx-auto p-4 max-w-4xl">
        <ProfileSkeleton />
        <Tabs value="posts" className="mb-8">
          <TabsList className="w-full justify-center">
            <TabsTrigger value="posts" className="flex-1">
              <GridIcon className="w-4 h-4 mr-2" /> Events
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-64 w-full rounded-md" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 max-w-4xl">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <div className="mb-4 md:mb-0 md:mr-8">
          <ProfileAvatar profilePicture={user?.profilePicture} />
        </div>
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-4">
            <h1 className="text-2xl font-bold mr-4">{user?.username}</h1>
            {!isCurrentUser && !isFollowLoading && (
              <FollowButton
                initialIsFollowing={isFollowing?.response || false}
                user={params.id}
              />
            )}
          </div>
          <ProfileStats user={user ?? null} />
          <ProfileInfo user={user ?? null} />
          <div className="mt-4">
            <UserAchievements badges={user?.badge || []} score={user?.score || 0} />
          </div>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="w-full justify-center">
          <TabsTrigger value="posts" className="flex-1">
            <GridIcon className="w-4 h-4 mr-2" /> Events
          </TabsTrigger>
          {isCurrentUser && (
            <TabsTrigger value="edit" className="flex-1">
              <SettingsIcon className="w-4 h-4 mr-2" /> Edit Profile
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="posts">
          <EventGrid
            isCurrentUserProfile={isCurrentUser || false}
            events={events?.response?.data?.data}
            isLoading={isEventLoading}
          />
        </TabsContent>
        {isCurrentUser && (
          <TabsContent value="edit">
            <EditProfile user={user} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}