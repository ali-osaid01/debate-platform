"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, CalendarPlus, Loader2, MapPinIcon, UserIcon, Clock } from 'lucide-react';
import Image from "next/image";
import { IEvent, IParticipant } from "@/types/interface/event.interface";
import { IUser } from "@/types/interface/user.interface";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Credenza, CredenzaContent, CredenzaDescription, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "../ui/drawer-dialog";

interface EventGridProps {
  events: IEvent[] | undefined;
  isCurrentUserProfile: boolean;
  isLoading?: boolean;
  error?: string;
}

export default function EventGrid({
  events,
  isLoading,
  error,
  isCurrentUserProfile
}: EventGridProps) {
  if (isLoading) {
    return <div className="text-center p-4 flex justify-center mt-10"><Loader2 className="animate-spin" /></div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[600px]">
        <div className="mb-6 rounded-full bg-blue-100 p-6">
          <CalendarPlus className="h-12 w-12 text-blue-500" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          No events found
        </h2>
        <p className="mb-6 text-gray-600">
          It looks like there aren&apos;t any events scheduled yet. Why not
          create one?
        </p>
        <Link href="/feed">
          <Button>Create New Event</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card key={event._id} className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              <Credenza>
                <CredenzaTrigger asChild>
                  <Image
                    src={event?.picture || "/placeholder.svg"}
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                    className="object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  />
                </CredenzaTrigger>
                <CredenzaContent className="max-w-[425px] md:max-w-[700px]">
                  <CredenzaHeader>
                    <CredenzaTitle className="text-2xl font-bold">{event.title}</CredenzaTitle>
                    <CredenzaDescription className="text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()} | {event.location}
                    </CredenzaDescription>
                  </CredenzaHeader>
                  <ScrollArea className="h-[60vh] md:h-[70vh] p-6 md:p-0">
                    <div className="space-y-6 mt-4">
                      <div className="relative w-full h-64 rounded-lg overflow-hidden">
                        <Image
                          src={event?.picture || "/placeholder.svg"}
                          alt={event.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">About this event</h3>
                        <p className="text-muted-foreground">{event.description}</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-muted-foreground" />
                            <span>{new Date(event.date).toLocaleTimeString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPinIcon className="w-5 h-5 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <UserIcon className="w-5 h-5 text-muted-foreground" />
                            <span>{event.participants.length} participants</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Participants</h3>
                        <div className="flex flex-wrap gap-2">
                          {event.participants?.map((participant: IParticipant) => (
                            <div key={(participant.user as IUser)._id} className="flex items-center bg-muted rounded-full px-3 py-1">
                              <Avatar className="w-6 h-6 mr-2">
                                <AvatarImage
                                  src={(participant.user as IUser).profilePicture || "/placeholder.svg"}
                                  alt={`${(participant.user as IUser).name}'s avatar`}
                                />
                                <AvatarFallback>
                                  {(participant.user as IUser).name?.charAt(0) || "U"}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{(participant.user as IUser).name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CredenzaContent>
              </Credenza>
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
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {event.location}
              </div>
              <div className="flex items-center">
                <UserIcon className="w-4 h-4 mr-2" />
                {event.participants.length} participants
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            <div className="flex -space-x-2">
              {event.participants?.slice(0, 3).map((participant: IParticipant) => (
                <Avatar key={(participant.user as IUser)._id} className="w-8 h-8 border-2 border-background">
                  <AvatarImage
                    src={(participant.user as IUser).profilePicture || "/placeholder.svg"}
                    alt={`${(participant.user as IUser).name}'s avatar`}
                  />
                  <AvatarFallback>
                    {(participant.user as IUser).name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              ))}
              {event.participants.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                  +{event.participants.length - 3}
                </div>
              )}
            </div>
            <Badge variant={event.status === "active" ? "default" : "secondary"}>
              {event.status}
            </Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

