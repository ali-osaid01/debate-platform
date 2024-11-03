import React from 'react'
import UpcomingEventsCard from '../helper/upcoming-event-card'
import { Calendar } from 'lucide-react'

export default function UpcomingEvents() {

    return (
        <div className="hidden md:flex md:w-1/4 p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className='flex gap-3'>
          <h1 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h1>
          <Calendar/>
          </div>
          <div className="space-y-4">
            <UpcomingEventsCard />
            <UpcomingEventsCard />
            <UpcomingEventsCard />
          </div>
        </div>
      </div>
    )
}
