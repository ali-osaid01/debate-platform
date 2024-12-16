"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, CalendarPlus, MapPinIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { IEvent } from "@/types/interface/event.interface";
import { IUser } from "@/types/interface/user.interface";
import Link from "next/link";
import { Button } from "../ui/button";

interface EventGridProps {
  events: IEvent[] | undefined;
  isLoading?: boolean;
  error?: string;
}

export default function EventGrid({
  events,
  isLoading,
  error,
}: EventGridProps) {
  if (isLoading) {
    return <div className="text-center p-4">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[600px]">
        <div className="mb-6 rounded-full bg-blue-100 p-6">
          <CalendarPlus className="h-12 w-12 " />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          No events found :(
        </h2>
        <p className="mb-6 text-gray-600">
          It looks like there aren&apos;t any events scheduled yet. Why not
          create one?
        </p>
        <Link href={"/feed"}>
          <Button className="bg-blue-300 hover:bg-blue-200">
            Create New Event
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              <Image
                src={event.picture || "/placeholder.svg"}
                alt={"EVENT"}
                layout="fill"
                objectFit="cover"
                className="object-cover"
                aria-hidden
              />
              <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                {event.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {event.description}
            </p>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPinIcon className="w-4 h-4 mr-2" />
              {event.location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <UserIcon className="w-4 h-4 mr-2" />
              {event.participants.length} participants
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            <div className="flex -space-x-4">
              {event.participants?.map((participant: any, index: number) => (
                <div
                  key={(participant.user as IUser)._id || index}
                  className="flex items-center"
                >
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage
                      src={
                        (participant.userInfo as IUser).profilePicture ||
                        "/placeholder.svg"
                      }
                      alt={`${(participant.userInfo as IUser).name}'s avatar`}
                    />
                    <AvatarFallback>
                      {(participant.userInfo as IUser).name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  {/* <span className="text-sm text-muted-foreground">
                    {(participant.userInfo as IUser).name}
                  </span> */}
                </div>
              ))}
            </div>
            <Badge variant={event.status == "active" ? "default" : "secondary"}>
              {event.status}
            </Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
