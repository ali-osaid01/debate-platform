import { create } from "zustand";
import { IUser } from "@/types/interface/user.interface";
import { UseFormSetValue } from "react-hook-form";
import { IEventValues } from "@/types/interface/event.interface";

export interface Participant {
  user: IUser;
}

export interface ParticipantState {
  participants: Participant[];
  maxParticipants: number;
  addParticipant: (
    user: IUser,
    setValue: UseFormSetValue<IEventValues>,
  ) => void;
  removeParticipant: (
    userId: string,
    setValue: UseFormSetValue<IEventValues>,
  ) => void;
  canAddParticipant: () => boolean;
}

export const useParticipantStore = create<ParticipantState>((set, get) => ({
  participants: [],
  maxParticipants: 4,

  addParticipant: (user: IUser, setValue: UseFormSetValue<IEventValues>) => {
    const { participants, maxParticipants } = get();

    if (participants.length >= maxParticipants) {
      alert(`You can only select up to ${maxParticipants} participants.`);
      return;
    }

    // Check if user already exists in the participants
    const exists = participants.some(
      (participant) => participant.user._id === user._id,
    );

    if (!exists) {
      const updatedParticipants = [...participants, { user }];
      set({ participants: updatedParticipants });
      setValue("participants", updatedParticipants.map(p => ({ user: p.user._id }))); 
    }
  },

  // Remove participant
  removeParticipant: (
    userId: string,
    setValue: UseFormSetValue<IEventValues>,
  ) => {
    const { participants } = get();
    const updatedParticipants = participants.filter(
      (participant) => participant.user._id !== userId,
    );
    set({ participants: updatedParticipants });
    setValue("participants", updatedParticipants.map(p => ({ user: p.user._id }))); // Sync with form state
  },

  // Check if another participant can be added
  canAddParticipant: () => {
    const { participants, maxParticipants } = get();
    return participants.length < maxParticipants;
  },
}));
