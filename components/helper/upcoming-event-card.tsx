"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  Users, Calendar, Pin, MapPin, ThumbsUp } from 'lucide-react';
import { useState } from "react";
import { ICalender } from "@/types/interface/calender.interface";
import { useChatStore } from "@/store/chat.store";
import { useRouter } from "next/navigation";

interface UpcomingEventsCardProps {
  calender: ICalender;
}

export default function UpcomingEventsCard({ calender }: UpcomingEventsCardProps) {
  const [isPinned, setIsPinned] = useState(false);
  const router = useRouter();
  // const {setCurrentChat} = useChatStore();
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handlePin = () => {
    setIsPinned(!isPinned);
    console.log(`Event ${calender.events._id} ${isPinned ? 'unpinned' : 'pinned'}`);
  };

  const truncate = (str: string, n: number) => {
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
  };

  const handleJoinEvent = () => {
    console.log(`Joining event ${calender.events._id}`);
    router.push(`/chat`);
  }

  return (
    <Card className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex-1">
          <CardTitle className="text-xl mb-1">{calender.events.title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            Posted by {typeof calender.events.postedBy === 'string' ? calender.events.postedBy : calender.events.postedBy.name}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePin}
          className={isPinned ? "text-blue-500" : "text-gray-500"}
        >
          <Pin className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{truncate(calender.events.description, 100)}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">{formatDate(calender.events.date)}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-red-500" />
            <span className="text-sm">{truncate(calender.events.location, 20)}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-green-500" />
            <span className="text-sm">{calender.events.participants.length} participants</span>
          </div>
          <div className="flex items-center">
            <ThumbsUp className="mr-2 h-5 w-5 text-yellow-500" />
            <span className="text-sm">{calender.events.likeCount || 0} likes</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-1">
        <Button variant="default" className="flex-1 bg-blue-500 hover:bg-blue-600" onClick={handleJoinEvent}>
          Join Event
        </Button>
      </CardFooter>
    </Card>
  );
}

