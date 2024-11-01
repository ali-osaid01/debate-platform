'use client'
import React, { useState } from 'react'
import { Activity, CalendarDays } from 'lucide-react'
import { events } from '@/utils/data'
import EventCard from '@/components/shared/event-post-card'

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("events")
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
      <div className="space-y-6">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  )
}
