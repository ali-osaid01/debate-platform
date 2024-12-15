'use client';
import React, { useState } from 'react';
import { Activity, CalendarDays, PlusCircle } from 'lucide-react';
import { events } from '@/utils/data';
import EventCard from '@/components/shared/event-post-card';
import UpcomingEvents from '@/components/shared/Upcoming-Events-Section';
import useMediaQuery from '@/hooks/useMediaQuery';
import EventFormDialog from '@/components/helper/create-event-dialog';
import { FilterSidebar } from '@/components/shared/filter-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("events");
  const desktop = useMediaQuery('(min-width: 1020px)');
  return (
    <div>
      <div className="w-full max-w-[300px] md:max-w-[500px]  mx-auto mt-5">
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

      <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-4 w-full">
        {/* Left Div */}
        {desktop  && (
          <div className="hidden lg:block w-full lg:w-1/4">
             <SidebarProvider>
            <FilterSidebar />
             </SidebarProvider>
          </div>
        )}

        {/* Center Div */}
        <div className="flex flex-col items-center space-y-4 w-full lg:w-1/2">
          <EventFormDialog />
          <div className="space-y-6 w-full">
            {events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </div>

        {/* Right Div */}
        {desktop && (
          <div className="p-4 hidden lg:block w-full lg:w-1/4">
            <UpcomingEvents />
          </div>
        )}
      </div>
    </div>
  );
}
