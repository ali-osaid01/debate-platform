import React from 'react'
import { Calendar } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { fetchCalenderEvents } from '@/services/calender.service'
import UpcomingEventsCard from '../helper/upcoming-event-card'
import { ICalender } from '@/types/interface/calender.interface'

export default function UpcomingEvents() {
    const { data, isLoading, error } = useQuery({
      queryKey: ['upcoming-events'],
      queryFn: fetchCalenderEvents,
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error fetching events</div>

    console.log("CALENDER EVENTS ->",data?.events)
    if(data?.events.length === 0) return (
      <div className="p-4 hidden lg:block w-full lg:w-1/4">
      <div className="text-center space-y-4 mt-10">
        <div className="flex justify-center">
          <Calendar className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No Upcoming Events</h3>
        <p className="text-muted-foreground">
          Looks like your calendar is clear. Why not explore some new
          events?
        </p>
      </div>
    </div>
    )
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className='flex items-center gap-3 mb-6'>
            <Calendar className="h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-semibold text-gray-800">Upcoming Events</h1>
          </div>
          <div className="space-y-6">
            {data && data?.events.map((event:ICalender) => (
              <UpcomingEventsCard key={event.id} calender={event} />
            ))}
          </div>
        </div>
    )
}

