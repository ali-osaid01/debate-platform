"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { IEvent } from "@/types/interface/event.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchPublicEvents, toggleEventStatus } from "@/services/event.service";
import { IUser } from "@/types/interface/user.interface";

export default function EventManagementPage() {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryFn: () => fetchPublicEvents({ status: "pending", type: "PUBLIC" }),
    queryKey: ["public-events"],
  });

  const { mutate } = useMutation({
    mutationFn: toggleEventStatus,
    onSuccess: () => {
      toast.success("Event status updated successfully!");
    },
  });

  const handleApproveEvent = (eventId: string) => {
    mutate({ event: eventId, status: "approved" });
  };

  const handleRejectEvent = (eventId: string) => {
    mutate({ event: eventId, status: "rejected" });
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Event Management</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">Loading events...</div>
          ) : data?.response?.data?.data?.length === 0 ? (
            <div className="flex justify-center items-center h-64">No events found</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.response.data.data.map((event: IEvent) => (
                <Card key={event._id} className="shadow-lg">
                  <CardHeader>
                    <img
                      src={event.picture || "https://via.placeholder.com/300"}
                      alt={event.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <CardTitle onClick={() => { setSelectedEvent(event); setIsDialogOpen(true); }}>
                      {event.title}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{event.location}</p>
                    <p className="text-sm text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500">Status: {event.approvalStatus}</p>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{event.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {event.approvalStatus === "pending" ? (
                      <>
                        <Button variant="destructive" onClick={() => handleRejectEvent(event._id)}>Reject</Button>
                        <Button onClick={() => handleApproveEvent(event._id)}>Approve</Button>
                      </>
                    ) : (
                      <Button onClick={() => { setSelectedEvent(event); setIsDialogOpen(true); }}>View Details</Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedEvent && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <img
                src={selectedEvent.picture || "https://via.placeholder.com/300"}
                alt={selectedEvent.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <p><strong>Description:</strong> {selectedEvent.description}</p>
              <p><strong>Location:</strong> {selectedEvent.location}</p>
              <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {selectedEvent.approvalStatus}</p>
              <p><strong>Participants:</strong></p>
              <ul className="list-disc pl-5">
                {selectedEvent.participants?.map((participant) => {
                  const user = participant.user as IUser;
                  return (
                    <li key={user._id} className="flex items-center gap-2">
                      <img
                        src={user.profilePicture || "https://via.placeholder.com/40"}
                        className="w-8 h-8 rounded-full"
                        alt={user.name}
                      />
                      {user.name}
                    </li>
                  );
                })}
              </ul>
            </DialogDescription>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
