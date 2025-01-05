"use client";
import React, { useState } from "react";
import { Activity, Calendar, CalendarDays, Loader2, Users } from "lucide-react";
import EventCard from "@/components/shared/event-post-card";
// import UpcomingEvents from '@/components/shared/Upcoming-Events-Section';
import useMediaQuery from "@/hooks/useMediaQuery";
import EventFormDialog from "@/components/helper/create-event-dialog";
import { FilterSidebar } from "@/components/shared/filter-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/services/event.service";
import { EVENT_TYPE, IEvent } from "@/types/interface/event.interface";
import { STATUS } from "@/types/enum";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { EventCardSkeleton } from "@/components/skeleton/event-card-skeleton";
import { useEventFilterStore } from "@/store/filter-state.store";
import UpcomingEvents from "@/components/shared/Upcoming-Events-Section";

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("feed");
  const desktop = useMediaQuery("(min-width: 1020px)");
  const {selectedTopic} = useEventFilterStore()
  const { data, isLoading } = useQuery({
    queryKey: ["events",selectedTopic],
    queryFn: () => fetchEvents("", EVENT_TYPE.PRIVATE,selectedTopic),
    enabled: activeTab === "feed",
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div>
      {/* Tabs Section */}
      <div className="w-full max-w-[300px] md:max-w-[500px] mx-auto mt-5">
        <div className="flex mb-8 bg-muted rounded-tr-full rounded-bl-full relative">
          <button
            onClick={() => setActiveTab("events")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-bl-full rounded-tr-full transition-all duration-300 ${
              activeTab === "events"
                ? "bg-background text-primary shadow-lg"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            Events
          </button>
          <button
            onClick={() => setActiveTab("feed")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-bl-full rounded-tr-full transition-all duration-300 ${
              activeTab === "feed"
                ? "bg-background text-primary shadow-lg"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Activity className="w-4 h-4" />
            Feed
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-4 w-full">
        {/* Left Div */}
        <div
          className={`w-full lg:w-1/4 ${desktop ? "block" : "hidden lg:block"}`}
        >
          <SidebarProvider>
            <FilterSidebar />
          </SidebarProvider>
        </div>
        {/* Center Div */}
        <div className="flex flex-col items-center space-y-6 w-full lg:w-1/2">
          {activeTab === "feed" ? (
            <>
              {isLoading ? (
                <div className="w-full">
                  <EventCardSkeleton/>
                </div>
              ) : (
                <>
                  <EventFormDialog />
                  {data?.status === STATUS.SUCCESS &&
                  data?.response?.data?.data?.length > 0 ? (
                    <div className="space-y-6 w-full">
                      {data.response.data.data.map((event: IEvent) => (
                        <EventCard key={event._id} event={event} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center space-y-4 mt-10 p-6 bg-muted rounded-lg w-full">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto" />
                      <h3 className="text-lg font-semibold">
                        No Events in Your Feed
                      </h3>
                      <p className="text-muted-foreground">
                        It looks like there are no events in your feed right
                        now. Why not create one or explore public events?
                      </p>
                      <div className="flex justify-center space-x-4">
                        <Button
                          onClick={() => {
                            /* Logic to open event form */
                          }}
                        >
                          Create Event
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            /* Logic to switch to public tab */
                          }}
                        >
                          Explore Public Events
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="text-center space-y-4 mt-10 p-6 bg-muted rounded-lg w-full">
              <Users className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-semibold">
                No Public Events Available
              </h3>
              <p className="text-muted-foreground">
                There are no public events at the moment. Be the first to create
                one!
              </p>
              <Button
                onClick={() => {
                  toast("PUBLIC EVENT ARE NOT AVAILABLE YET");
                }}
              >
                Create Public Event
              </Button>
            </div>
          )}
        </div>
        {/* Right Div */}
        {desktop && 
        <UpcomingEvents/>
        }
      </div>
    </div>
  );
}
