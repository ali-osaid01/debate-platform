'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Check, X, Video } from 'lucide-react';
import { IEvent, ApprovalStatus, EventStatus, IParticipant } from '@/types/interface/event.interface';
const events: IEvent[] = [
  {
    _id: '1',
    title: 'Tech Conference 2023',
    description: 'Annual tech conference',
    type: 'PUBLIC',
    date: new Date('2023-12-15'),
    location: 'New Delhi',
    category: 'Technology',
    topic: 'AI and ML',
    picture: 'https://example.com/tech-conference.jpg',
    postedBy: 'Admin',
    status: EventStatus.ACTIVE,
    approvalStatus: ApprovalStatus.PENDING,
    participants: [],
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    title: 'Product Launch',
    description: 'Launch of new product',
    type: 'PRIVATE',
    date: new Date('2023-12-20'),
    location: 'Mumbai',
    category: 'Business',
    topic: 'Product Management',
    picture: 'https://example.com/product-launch.jpg',
    postedBy: 'Admin',
    status: EventStatus.ACTIVE,
    approvalStatus: ApprovalStatus.PENDING,
    participants: [],
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const subadmins = [
  { _id: '1', name: 'Amit Sharma', profilePicture: 'https://example.com/amit.jpg' },
  { _id: '2', name: 'Rahul Verma', profilePicture: 'https://example.com/rahul.jpg' },
  { _id: '3', name: 'Priya Singh', profilePicture: 'https://example.com/priya.jpg' },
];

const EventsPage = () => {
  const [eventsData, setEventsData] = useState<IEvent[]>(events);

  const handleEventStatus = (id: string, status: ApprovalStatus) => {
    setEventsData((prev) =>
      prev.map((event) =>
        event._id === id ? { ...event, approvalStatus: status } : event
      )
    );
  };

  const assignSubadmin = (eventId: string, subadminId: string) => {
    setEventsData((prev) =>
      prev.map((event) =>
        event._id === eventId
          ? { ...event, postedBy: subadmins.find((s) => s._id === subadminId)?.name || event.postedBy }
          : event
      )
    );
  };

  const handleZoomLink = (eventId: string, link: string) => {
    setEventsData((prev) =>
      prev.map((event) =>
        event._id === eventId ? { ...event, location: link } : event
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Table className="mt-3">
          <TableHeader>
            <TableRow className="bg-[#5EA9F7] hover:bg-[#5ea8f7da]">
              <TableHead className="text-white text-center">EVENT NAME</TableHead>
              <TableHead className="text-white text-center">DATE</TableHead>
              <TableHead className="text-white text-center">STATUS</TableHead>
              <TableHead className="text-white text-center">SUBADMIN</TableHead>
              <TableHead className="text-white text-center">ZOOM CALL</TableHead>
              <TableHead className="text-white text-center">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {eventsData.map((event) => (
              <TableRow key={event._id} className="text-center">
                <TableCell>{event.title}</TableCell>

                <TableCell>{event.date.toLocaleDateString()}</TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      event.approvalStatus === ApprovalStatus.APPROVED
                        ? 'bg-green-100 text-green-700'
                        : event.approvalStatus === ApprovalStatus.REJECTED
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }
                  >
                    {event.approvalStatus}
                  </Badge>
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-32">
                        {typeof event.postedBy === 'string' ? event.postedBy : event.postedBy.name}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {subadmins.map((subadmin) => (
                        <DropdownMenuItem
                          key={subadmin._id}
                          onClick={() => assignSubadmin(event._id, subadmin._id)}
                        >
                          {subadmin.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Video className="h-4 w-4 mr-2" />
                        {event.location.startsWith('http') ? 'Edit Link' : 'Enable Zoom'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Input
                        type="text"
                        placeholder="Enter Zoom Link"
                        value={event.location.startsWith('http') ? event.location : ''}
                        onChange={(e) => handleZoomLink(event._id, e.target.value)}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                <TableCell>
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEventStatus(event._id, ApprovalStatus.APPROVED)}
                      disabled={event.approvalStatus === ApprovalStatus.APPROVED}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEventStatus(event._id, ApprovalStatus.REJECTED)}
                      disabled={event.approvalStatus === ApprovalStatus.REJECTED}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EventsPage;