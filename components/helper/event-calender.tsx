// "use client"

// import { useState, useEffect } from "react"
// import { format } from "date-fns"
// import { Calendar } from "@/components/ui/calendar"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { ScrollArea } from "@/components/ui/scroll-area"

// const fetchEvents = async () => {
//   await new Promise(resolve => setTimeout(resolve, 1000))
//   return [
//     { id: 1, date: "2024-11-05", title: "Team Meeting" },
//     { id: 2, date: "2024-11-05", title: "Project Deadline" },
//     { id: 3, date: "2024-11-10", title: "Conference Call" },
//     { id: 4, date: "2024-11-15", title: "Product Launch" },
//     { id: 5, date: "2024-11-15", title: "Client Presentation" },
//     { id: 6, date: "2024-11-20", title: "Training Workshop" },
//   ]
// }

// // Custom hook to fetch and manage events
// const useEvents = () => {
//   const [events, setEvents] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const getEvents = async () => {
//       const fetchedEvents = await fetchEvents()
//       setEvents(fetchedEvents)
//       setLoading(false)
//     }
//     getEvents()
//   }, [])

//   return { events, loading }
// }

// export default function Component() {
//   const { events, loading } = useEvents()
//   const [selectedDate, setSelectedDate] = useState(null)
//   const [selectedEvents, setSelectedEvents] = useState([])

//   const handleDateClick = (date) => {
//     const formattedDate = format(date, "yyyy-MM-dd")
//     const eventsOnDate = events.filter(event => event.date === formattedDate)
//     setSelectedDate(date)
//     setSelectedEvents(eventsOnDate)
//   }

//   const eventDates = events.map(event => new Date(event.date))

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <Calendar
//         mode="single"
//         selected={selectedDate}
//         onSelect={handleDateClick}
//         className="rounded-md border"
//         modifiers={{ event: eventDates }}
//         modifiersStyles={{
//           event: { fontWeight: 'bold', textDecoration: 'underline' }
//         }}
//       />
//       <Dialog>
//         <DialogTrigger asChild>
//           <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md" disabled={!selectedDate}>
//             {selectedDate ? `View Events (${selectedEvents.length})` : "Select a Date"}
//           </button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Events"}</DialogTitle>
//           </DialogHeader>
//           <ScrollArea className="h-[300px] w-full rounded-md border p-4">
//             {loading ? (
//               <p>Loading events...</p>
//             ) : selectedEvents.length > 0 ? (
//               <ul className="space-y-2">
//                 {selectedEvents.map(event => (
//                   <li key={event.id} className="bg-secondary p-2 rounded-md">
//                     {event.title}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No events on this date.</p>
//             )}
//           </ScrollArea>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }