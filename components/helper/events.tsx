// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import Image from "next/image"
// import { Check, X, Filter, Calendar, MapPin, Tag } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { toast } from "sonner";
// import { IEvent } from "@/types/interface/event.interface"

// // Types based on the provided schema
// type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED"
// type EventStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED"




// // Mock moderators for demonstration
// const mockModerators = [
//   { id: "mod1", name: "Alex Johnson" },
//   { id: "mod2", name: "Sarah Williams" },
//   { id: "mod3", name: "Michael Brown" },
//   { id: "mod4", name: "Emily Davis" },
//   { id: "mod5", name: "Robert Wilson" },
// ]

// export default function EventManagementPage() {
//   const [events, setEvents] = useState<IEvent[]>([])
//   const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([])
//   const [statusFilter, setStatusFilter] = useState<string>("all")
//   const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
    
//     const fetchEvents = async () => {
//       try {
//         // Simulate API call
//         await new Promise((resolve) => setTimeout(resolve, 1000))
//         setEvents(mockEvents)
//         setFilteredEvents(mockEvents)
//         setLoading(false)
//       } catch (error) {
//         console.error("Error fetching events:", error)
//         toast("Failed to load events. Please try again.")
//         setLoading(false)
//       }
//     }

//     fetchEvents()
//   }, [])

//   useEffect(() => {
//     if (statusFilter === "all") {
//       setFilteredEvents(events)
//     } else {
//       setFilteredEvents(events.filter((event) => event.approvalStatus === statusFilter))
//     }
//   }, [statusFilter, events])

//   const handleApproveEvent = async (eventId: string) => {
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 500))

//       // Update local state
//       setEvents((prevEvents) =>
//         prevEvents.map((event) =>
//           event._id === eventId ? { ...event, approvalStatus: "APPROVED" as ApprovalStatus } : event,
//         ),
//       )

//       toast( "The event has been successfully approved")
//     } catch (error) {
//       console.error("Error approving event:", error)
//       toast("Failed to approve event. Please try again.",
//       )
//     }
//   }

//   const handleRejectEvent = async (eventId: string) => {
//     try {
//       // Simulate API call
//       toast("The event has been rejected")
//     } catch (error) {
//       console.error("Error rejecting event:", error)
//      toast("Failed to reject event. Please try again.")
//     }
//   }

//   const handleAssignModerator = async (eventId: string, moderatorId: string) => {
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500))


//       const moderator = mockModerators.find((mod) => mod.id === moderatorId)

//       toast("Moderator assigned successfully")
//     } catch (error) {
//       console.error("Error assigning moderator:", error)
//       toast("Failed to assign moderator. Please try again.")
//     }
//   }

//   const openEventDetails = (event: IEvent) => {
//     setSelectedEvent(event)
//     setIsDialogOpen(true)
//   }


//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <Card>
//         <CardHeader>
//           <CardTitle>Event Management</CardTitle>
//           <CardDescription>Review, approve, reject events and assign moderators</CardDescription>
//           <div className="flex items-center gap-4 mt-4">
//             <div className="flex items-center gap-2">
//               <Filter className="h-4 w-4 text-muted-foreground" />
//               <span className="text-sm font-medium">Filter by status:</span>
//             </div>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Events</SelectItem>
//                 <SelectItem value="PENDING">Pending</SelectItem>
//                 <SelectItem value="APPROVED">Approved</SelectItem>
//                 <SelectItem value="REJECTED">Rejected</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardHeader>
//         <CardContent>
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <p className="text-muted-foreground">Loading events...</p>
//             </div>
//           ) : filteredEvents.length === 0 ? (
//             <div className="flex justify-center items-center h-64">
//               <p className="text-muted-foreground">No events found</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredEvents.map((event) => (
//                 <Card key={event._id} className="overflow-hidden">
//                   <div className="relative h-48 w-full">
//                     <Image src={event.picture || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
//                     <div className="absolute top-2 right-2">{event.approvalStatus}</div>
//                   </div>
//                   <CardHeader className="pb-2">
//                     <CardTitle
//                       className="text-xl cursor-pointer hover:underline"
//                       onClick={() => openEventDetails(event)}
//                     >
//                       {event.title}
//                     </CardTitle>
//                     <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
//                       <div className="flex items-center">
//                         <Calendar className="h-4 w-4 mr-2" />
//                         {formatDate(event.date)}
//                       </div>
//                       <div className="flex items-center">
//                         <MapPin className="h-4 w-4 mr-2" />
//                         {event.location}
//                       </div>
//                       <div className="flex items-center">
//                         <Tag className="h-4 w-4 mr-2" />
//                         {event.category}
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="pb-2">
//                     <p className="text-sm line-clamp-2">{event.description}</p>
//                   </CardContent>
//                   <CardFooter className="flex flex-col space-y-3 pt-0">
//                     {event.approvalStatus === "pending" && (
//                       <Select onValueChange={(value) => handleAssignModerator(event._id, value)}>
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Assign moderator" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {mockModerators.map((moderator) => (
//                             <SelectItem key={moderator.id} value={moderator.id}>
//                               {moderator.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     )}
//                     <div className="flex justify-between w-full">
//                       {event.approvalStatus === "pending" ? (
//                         <>
//                           <Button
//                             variant="outline"
//                             className="text-red-500 border-red-500 hover:bg-red-50"
//                             onClick={() => handleRejectEvent(event._id)}
//                           >
//                             <X className="mr-2 h-4 w-4" />
//                             Reject
//                           </Button>
//                           <Button
//                             className="bg-green-500 hover:bg-green-600"
//                             onClick={() => handleApproveEvent(event._id)}
//                           >
//                             <Check className="mr-2 h-4 w-4" />
//                             Approve
//                           </Button>
//                         </>
//                       ) : (
//                         <Button variant="outline" className="w-full" onClick={() => openEventDetails(event)}>
//                           View Details
//                         </Button>
//                       )}
//                     </div>
//                   </CardFooter>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Event Details Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="sm:max-w-[600px]">
//           {selectedEvent && (
//             <>
//               <DialogHeader>
//                 <DialogTitle>{selectedEvent.title}</DialogTitle>
//                 <DialogDescription>Event details and management options</DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="relative h-56 w-full rounded-md overflow-hidden">
//                   <Image
//                     src={selectedEvent.picture || "/placeholder.svg"}
//                     alt={selectedEvent.title}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <span className="font-medium">Status:</span>
//                   <div className="col-span-3">{selectedEvent?.approvalStatus}</div>
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <span className="font-medium">Date:</span>
//                   <div className="col-span-3">{formatDate(selectedEvent.date)}</div>
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <span className="font-medium">Location:</span>
//                   <div className="col-span-3">{selectedEvent.location}</div>
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <span className="font-medium">Category:</span>
//                   <div className="col-span-3">{selectedEvent.category}</div>
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <span className="font-medium">Posted By:</span>
//                   <div className="col-span-3">
//                     {typeof selectedEvent.postedBy === "string" ? selectedEvent.postedBy : selectedEvent.postedBy.name}
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-4 items-start gap-4">
//                   <span className="font-medium">Description:</span>
//                   <div className="col-span-3">{selectedEvent.description}</div>
//                 </div>
//                 {selectedEvent.approvalStatus === "pending" && (
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <span className="font-medium">Assign Moderator:</span>
//                     <div className="col-span-3">
//                       <Select onValueChange={(value) => handleAssignModerator(selectedEvent._id, value)}>
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Select a moderator" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {mockModerators.map((moderator) => (
//                             <SelectItem key={moderator.id} value={moderator.id}>
//                               {moderator.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <DialogFooter>
//                 {selectedEvent.approvalStatus === "pending" && (
//                   <div className="flex gap-2">
//                     <Button
//                       variant="outline"
//                       className="text-red-500"
//                       onClick={() => {
//                         handleRejectEvent(selectedEvent._id)
//                         setIsDialogOpen(false)
//                       }}
//                     >
//                       <X className="mr-2 h-4 w-4" />
//                       Reject
//                     </Button>
//                     <Button
//                       className="bg-green-500 hover:bg-green-600"
//                       onClick={() => {
//                         handleApproveEvent(selectedEvent._id)
//                         setIsDialogOpen(false)
//                       }}
//                     >
//                       <Check className="mr-2 h-4 w-4" />
//                       Approve
//                     </Button>
//                   </div>
//                 )}
//               </DialogFooter>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

