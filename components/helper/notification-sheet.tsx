import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { formatShortDuration } from "@/lib/utils"
import { notification } from "@/services/notification.service"
import { ENOTIFICATION_TYPES } from "@/types/enum"
import { INotification, INotificationResponse } from "@/types/interface/notification.interface"
import { IUser } from "@/types/interface/user.interface"
import { useQuery } from "@tanstack/react-query"
import { Bell, BellOff, Calendar, ThumbsUp } from "lucide-react"
import { useState } from "react"




export default function NotificationSheet() {
  const [filter, setFilter] = useState<'all' | 'like' | 'event'>('all')


  const { data, isLoading } = useQuery<ApiResponse<INotificationResponse>>({
    queryKey: ["notification"],
    queryFn: () => notification()
  })


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full lg:w-[450px]">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          {data?.response?.data?.data?.length != 0 && (
            <div className="flex space-x-2 mt-2">
              <Button size="sm" variant={filter === 'all' ? "default" : "outline"} onClick={() => setFilter('all')}>
                All
              </Button>
              <Button size="sm" variant={filter === 'event' ? "default" : "outline"} onClick={() => setFilter('event')}>
                Events
              </Button>
            </div>
          )}
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
          <div className="space-y-4 py-4">
            {data?.response?.data?.data && data?.response?.data?.data?.length > 0 ? (
              data?.response?.data?.data.map((notification: INotification) => (
                <div
                  key={notification._id}
                  className="flex space-x-4 items-start rounded-lg border p-4 hover:bg-gray-100 transition ease-in-out duration-150"
                >
                  <Avatar>
                    <AvatarImage
                      src={(notification?.sender as IUser).profilePicture || " "}
                      alt={(notification?.sender as IUser).name}
                    />
                    <AvatarFallback>
                      {(notification.sender as IUser).name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <p className="text-sm font-medium">{(notification.sender as IUser).name}</p>
                    <p className="text-muted-foreground flex items-center gap-1">
                      {/* {notification.type === ENOTIFICATION_TYPES.LIKE ? (
            <ThumbsUp className="h-4 w-4 text-blue-500" />
          ) : (
            <Calendar className="h-4 w-4 text-green-500" />
          )} */}
                      <span className="text-xs">{notification.content}</span>
                    </p>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground gap-1 whitespace-nowrap">
                    <span title={new Date().toLocaleString()}>
                      {formatShortDuration(notification.createdAt)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-screen text-center">
                <BellOff className="h-12 w-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mt-2">No notifications</p>
              </div>
            )}

          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
