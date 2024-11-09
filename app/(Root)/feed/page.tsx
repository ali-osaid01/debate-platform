'use client';
import React, { useState } from 'react';
import { Activity, CalendarDays, PlusCircle } from 'lucide-react';
import { events } from '@/utils/data';
import EventCard from '@/components/shared/event-post-card';
import UpcomingEvents from '@/components/shared/Upcoming-Events-Section';
import useMediaQuery from '@/hooks/useMediaQuery';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("events");
  const desktop = useMediaQuery('(min-width: 1025px)');

  return (
    <div>
      <div className="w-full max-w-3xl mx-auto mt-5">
        <div className="flex mb-8 bg-muted rounded-tr-full rounded-bl-full relative">
          <button
            onClick={() => setActiveTab("events")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-bl-full rounded-tr-full transition-all duration-300 ${activeTab === "events"
              ? "bg-background text-primary shadow-lg"
              : "text-muted-foreground hover:text-primary"
              }`}
          >
            <CalendarDays className="w-4 h-4" />
            Events
          </button>
          <button
            onClick={() => setActiveTab("feed")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-bl-full rounded-tr-full transition-all duration-300 ${activeTab === "feed"
              ? "bg-background text-primary shadow-lg"
              : "text-muted-foreground hover:text-primary"
              }`}
          >
            <Activity className="w-4 h-4" />
            Feed
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-center md:items-start">
        {/* Left Div */}
        {desktop && 
        <div className="hidden md:flex md:w-1/4 bg-gray-200 p-4">
          <p>Left Sidebar Content</p>
        </div>
    }
        {/* Center Div for Event Cards */}
        <div className="md:w-1/2 flex flex-col items-center space-y-4 w-full">
          <Link href="/create-event" passHref>
            <Button className="bg-black text-white font-semibold rounded-lg w-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
              Create Event
              <PlusCircle className="mr-2 h-5 w-5" />
            </Button>
          </Link>
          <div className="space-y-6 w-full">
            {events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </div>

        {/* Right Div */}
        {desktop && (
          <div className="hidden md:flex md:w-1/4 p-4">
            <UpcomingEvents />
          </div>
        )}
      </div>

    </div>
  );
}
