import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar, Heart, MapPin, Users } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { IEvent } from "@/types/interface/event.interface"
import { IUser } from "@/types/interface/user.interface"
import { formatDate } from "@/utils/data"


export default function EventCard({ event }: { event: IEvent }) {

  // const [likes, setLikes] = useState(event.likes)
  const [isLiked, setIsLiked] = useState(false)
  // const [attendees, setAttendees] = useState(event.attendees)
  const [isAttending, setIsAttending] = useState(false)

  // const handleLike = () => {
  //   setLikes(isLiked ? likes - 1 : likes + 1)
  //   setIsLiked(!isLiked)
  // }

  // const handleAttend = () => {
  //   setAttendees(isAttending ? attendees - 1 : attendees + 1)
  //   setIsAttending(!isAttending)
  // }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={event.picture} alt={"EVENT PICTURE"} />
          <AvatarFallback>{(event?.postedBy as IUser).username?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{event.title}</h2>
          <p className="text-sm text-muted-foreground">Posted by {(event.postedBy as IUser).username}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video w-full bg-muted rounded-md overflow-hidden">
          <Image src={event.picture} alt="Event cover" className="object-cover w-full h-full" width={400} height={400} />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{`${formatDate(event.date)}`}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
        <p className="text-sm">{event.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center px-2">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${isLiked ? "text-red-500" : ""}`}
          >
            <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
            <span>0</span>
          </Button>
          <div className="flex -space-x-4">
            {event.participants.slice(0, 4).map((participant:any, index) => (
              <Avatar key={index} className="border-2 border-background">
                <AvatarImage src={participant.userInfo.profilePicture} alt={participant.userInfo.name} />
                <AvatarFallback>{participant.userInfo.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {event.participants.length > 5 && (
              <Avatar className="border-2 border-background">
                <AvatarFallback>+{event.participants.length - 5}</AvatarFallback>
              </Avatar>
            )}
          </div>
          {/* <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 ${isAttending ? "text-green-500" : ""}`}
              onClick={handleAttend}
            >
              <Users className="w-4 h-4" />
              <span>{attendees} attending</span>
            </Button> */}
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => toast('Event Added to Calender', {
          description: 'Monday, January 3rd at 6:00pm',
        })}>
          <Calendar className="w-4 h-4" />
          <span className="text-xs">Add to Calender</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

