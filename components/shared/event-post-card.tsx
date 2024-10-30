import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar, Heart, MapPin, Users } from "lucide-react"

interface EventCardProps {
    id: number
    title: string
    organizer: string
    avatar: string
    image: string
    date: string
    time: string
    location: string
    description: string
    likes: number
    attendees: number
  }

export default function EventCard({ event }:{event:EventCardProps}) {

  const [likes, setLikes] = useState(event.likes)
  const [isLiked, setIsLiked] = useState(false)
  const [attendees, setAttendees] = useState(event.attendees)
  const [isAttending, setIsAttending] = useState(false)

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1)
    setIsLiked(!isLiked)
  }

  const handleAttend = () => {
    setAttendees(isAttending ? attendees - 1 : attendees + 1)
    setIsAttending(!isAttending)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={event.avatar} alt={event.organizer} />
          <AvatarFallback>{event.organizer.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{event.title}</h2>
          <p className="text-sm text-muted-foreground">Posted by {event.organizer}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video w-full bg-muted rounded-md overflow-hidden">
          <img src={event.image} alt="Event cover" className="object-cover w-full h-full" />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{`${event.date} • ${event.time}`}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
        <p className="text-sm">{event.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${isLiked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
            <span>{likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${isAttending ? "text-green-500" : ""}`}
            onClick={handleAttend}
          >
            <Users className="w-4 h-4" />
            <span>{attendees} attending</span>
          </Button>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>Schedule</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

