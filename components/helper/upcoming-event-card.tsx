"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Video, MessageCircle, Users } from "lucide-react"

const eventData = {
  title: "Team Brainstorming Session",
  date: "2024-11-15T14:00:00",
  postedBy: "Jane Smith",
  groupChatName: "Product Development Team",
  participants: [
    { name: "Alice", image: "/placeholder.svg?height=32&width=32" },
    { name: "Bob", image: "/placeholder.svg?height=32&width=32" },
    { name: "Charlie", image: "/placeholder.svg?height=32&width=32" },
    { name: "Diana", image: "/placeholder.svg?height=32&width=32" },
    { name: "Ethan", image: "/placeholder.svg?height=32&width=32" },
  ],
}

export default function UpcomingEventsCard() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <Card
      className="w-full max-w-md mx-auto overflow-hidden"
    >
      <CardHeader>
        <CardTitle>{eventData.title}</CardTitle>
        <div className="text-sm text-muted-foreground mt-1">
          Posted by {eventData.postedBy}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">{formatDate(eventData.date)}</div>
          <div className="flex -space-x-2">
            {eventData.participants.map((participant, index) => (
              <Avatar key={index} className="border-2 border-background">
                <AvatarImage src={participant.image} alt={participant.name} />
                <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {eventData.participants.length > 5 && (
              <Avatar className="border-2 border-background">
                <AvatarFallback>+{eventData.participants.length - 5}</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-2 h-4 w-4" />
          {eventData.groupChatName}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="w-[48%]">
          <MessageCircle className="mr-2 h-4 w-4" /> Join Chat
        </Button>
        <Button className="w-[48%] bg-red-600 hover:bg-red-400">
          <Video className="mr-2 h-4 w-4" /> Join Meet
        </Button>
      </CardFooter>
    </Card>
  )
}