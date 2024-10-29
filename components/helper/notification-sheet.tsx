import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Bell, Calendar, ThumbsUp } from "lucide-react"
import { Badge } from "../ui/badge"

type Notification = {
  id: string
  type: 'like' | 'event'
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  eventDetails?: {
    title: string
    date: string
  }
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: { name: 'Alice Johnson', avatar: '/placeholder.svg?height=40&width=40' },
    content: 'liked your post',
    timestamp: '2m ago'
  },
  {
    id: '2',
    type: 'event',
    user: { name: 'Bob Smith', avatar: '/placeholder.svg?height=40&width=40' },
    content: 'invited you to an event',
    timestamp: '1h ago',
  },
  {
    id: '3',
    type: 'like',
    user: { name: 'Charlie Brown', avatar: '/placeholder.svg?height=40&width=40' },
    content: 'liked your comment',
    timestamp: '3h ago'
  },
  {
    id: '4',
    type: 'event',
    user: { name: 'Diana Prince', avatar: '/placeholder.svg?height=40&width=40' },
    content: 'invited you to an event',
    timestamp: '1d ago',
  }
]

export default function NotificationSheet() {
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
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
            <div className="space-y-4 py-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex space-x-4 items-start rounded-lg border p-4">
                  <Avatar>
                    <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                    <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <p className="text-sm font-medium">{notification.user.name}</p>
                    <p className="text-xs text-muted-foreground">{notification.content}</p>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground gap-1 whitespace-nowrap">
                    <Calendar className="h-4 w-4" />
                    <span>{notification.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }
  
  