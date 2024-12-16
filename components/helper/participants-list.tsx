"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { Participant, useParticipantStore } from "@/store/participants.store";
import { IEventValues } from "@/types/interface/event.interface";
import { UseFormSetValue } from "react-hook-form";

interface ParticipantListProps {
  initialParticipants: Participant[];
  setValueAction: UseFormSetValue<IEventValues>;
}

export function ParticipantList({
  initialParticipants,
  setValueAction,
}: ParticipantListProps) {
  const [participants, setParticipants] = useState<Participant[]>(
    initialParticipants || [],
  );
  const { removeParticipant } = useParticipantStore();

  const handleRemove = (id: string) => {
    removeParticipant(id, setValueAction);
    setParticipants((prev) => prev.filter((p) => p.user._id !== id));
  };

  useEffect(() => {
    setParticipants(initialParticipants);
  }, [participants, initialParticipants]);
  return (
    <div className="flex flex-wrap gap-2">
      {participants.map((participant) => (
        <div
          key={participant.user._id}
          className="group flex items-center space-x-2 rounded-full bg-gradient-to-r from-blue-300 to-red-500 px-3 py-1 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
        >
          <Avatar className="h-6 w-6 border-2 border-white">
            <AvatarImage
              src={
                participant.user.profilePicture ||
                "https://github.com/shadcn.png"
              }
              alt={participant.user.name}
            />
            <AvatarFallback>
              {participant.user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-white">
            {participant.user.username}
          </span>
          <button
            onClick={() => handleRemove(participant.user._id)}
            className="text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 focus:outline-none"
            aria-label={`Remove ${participant.user.username}`}
          >
            <X
              size={16}
              className="hover:text-red-200 transition-colors duration-300 ease-in-out"
            />
          </button>
        </div>
      ))}
      {participants.length === 0 && (
        <p className="text-sm text-gray-500">No participants added yet.</p>
      )}
    </div>
  );
}
