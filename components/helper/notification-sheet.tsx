'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatShortDuration } from "@/lib/utils"
import { notification } from "@/services/notification.service"
import { ENOTIFICATION_TYPES } from "@/types/enum"
import { INotification, INotificationResponse } from "@/types/interface/notification.interface"
import { IUser } from "@/types/interface/user.interface"
import { useQuery } from "@tanstack/react-query"
import { Bell, BellOff, Calendar, ThumbsUp, UserMinus, UserPlus } from 'lucide-react'

export default function NotificationSheet() {
  const { data, isLoading } = useQuery<ApiResponse<INotificationResponse>>({
    queryKey: ["notification"],
    queryFn: () => notification(),
  })

  const notificationIcons = {
    [ENOTIFICATION_TYPES.LIKE]: <ThumbsUp className="h-4 w-4 text-blue-500" />,
    [ENOTIFICATION_TYPES.EVENT_INVITATION]: <Calendar className="h-4 w-4 text-green-500" />,
    [ENOTIFICATION_TYPES.FOLLOW]: <UserPlus className="h-4 w-4 text-purple-500" />,
    [ENOTIFICATION_TYPES.UN_FOLLOW]: <UserMinus className="h-4 w-4 text-red-500" />,
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {data?.response?.data && data?.response?.data?.data?.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] font-bold text-white">
              {data.response.data.data.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Notifications</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="all" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <NotificationList notifications={data?.response?.data?.data} />
          </TabsContent>
          <TabsContent value="events" className="mt-4">
            <NotificationList
              notifications={data?.response?.data?.data?.filter(
                (n) => n.type === ENOTIFICATION_TYPES.EVENT_INVITATION
              )}
            />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}

function NotificationList({ notifications }: { notifications?: INotification[] }) {
  if (!notifications || notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <BellOff className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-lg font-semibold text-muted-foreground">No notifications</p>
        <p className="text-sm text-muted-foreground mt-1">You're all caught up!</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[70vh] pr-4">
      <div className="space-y-4">
        {notifications.map((notification) => (
          <NotificationItem key={notification._id} notification={notification} />
        ))}
      </div>
    </ScrollArea>
  )
}

function NotificationItem({ notification }: { notification: INotification }) {

  const notificationIcons = {
    [ENOTIFICATION_TYPES.LIKE]: <ThumbsUp className="h-4 w-4 text-blue-500" />,
    [ENOTIFICATION_TYPES.EVENT_INVITATION]: <Calendar className="h-4 w-4 text-green-500" />,
    [ENOTIFICATION_TYPES.FOLLOW]: <UserPlus className="h-4 w-4 text-purple-500" />,
    [ENOTIFICATION_TYPES.UN_FOLLOW]: <UserMinus className="h-4 w-4 text-red-500" />,
    [ENOTIFICATION_TYPES.EVENT_ACCEPTED]: <Calendar className="h-4 w-4 text-green-500" />,
    [ENOTIFICATION_TYPES.EVENT_DELETED]: <Calendar className="h-4 w-4 text-green-500" />,
    [ENOTIFICATION_TYPES.EVENT_CANCELLED]: <Calendar className="h-4 w-4 text-green-500" />,
    [ENOTIFICATION_TYPES.EVENT_REJECTED]: <Calendar className="h-4 w-4 text-green-500" />,
  }

  return (
    <div className="flex items-start space-x-4 rounded-lg bg-card p-4 shadow-sm transition-all hover:shadow-md">
      <Avatar className="h-10 w-10">
        <AvatarImage src={(notification?.sender as IUser).profilePicture || ""} alt={(notification.sender as IUser).name} />
        <AvatarFallback>{(notification.sender as IUser).name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{(notification.sender as IUser).name}</p>
          <span className="text-xs text-muted-foreground" title={new Date(notification.createdAt).toLocaleString()}>
            {formatShortDuration(notification.createdAt)}
          </span>
        </div>
        <div className="flex items-start space-x-2">
          <span className="mt-0.5">{notificationIcons[notification.type] }</span>
          <p className="text-sm text-muted-foreground">{notification.content}</p>
        </div>
        {notification.type === ENOTIFICATION_TYPES.EVENT_INVITATION && (
          <div className="flex space-x-2 mt-2">
            <Button size="sm" variant="default" className="w-full" onClick={() => console.log("Accepted", notification._id)}>
              Accept
            </Button>
            <Button size="sm" variant="outline" className="w-full" onClick={() => console.log("Rejected", notification._id)}>
              Decline
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

