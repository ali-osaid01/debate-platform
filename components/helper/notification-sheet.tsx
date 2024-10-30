import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Bell, Calendar, ThumbsUp } from "lucide-react"
import { Badge } from "../ui/badge"
import { useState } from "react"

type Notification = {
  id: string
  type: 'like' | 'event'
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
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
    const [filter, setFilter] = useState<'all' | 'like' | 'event'>('all')
    const filteredNotifications = filter === 'all' ? notifications : notifications.filter(n => n.type === filter)

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
            <div className="flex space-x-2 mt-2">
              <Button size="sm" variant={filter === 'all' ? "default" : "outline"} onClick={() => setFilter('all')}>
                All
              </Button>
              <Button size="sm" variant={filter === 'event' ? "default" : "outline"} onClick={() => setFilter('event')}>
                Events
              </Button>
            </div>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
            <div className="space-y-4 py-4">
              {filteredNotifications.map((notification) => (
                <div key={notification.id} className="flex space-x-4 items-start rounded-lg border p-4 hover:bg-gray-100 transition ease-in-out duration-150">
                  <Avatar>
                    <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                    <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <p className="text-sm font-medium">{notification.user.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {notification.type === 'like' ? (
                        <ThumbsUp className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Calendar className="h-4 w-4 text-green-500" />
                      )}
                      <span>{notification.content}</span>
                    </p>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground gap-1 whitespace-nowrap">
                    <span title={new Date().toLocaleString()}>{notification.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }
