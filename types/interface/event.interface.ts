import { FieldValues } from "react-hook-form";
import { IUser } from "./user.interface";

export interface IParticipant {
  user: IUser | string;
}
export enum EVENT_TYPE {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export interface IEventValues extends FieldValues {
  title: string;
  description: string;
  date: Date;
  category: string;
  location: string;
  picture: string;
  type: string;
  topic: string;
  participants?: { user: string }[]
}

export enum ApprovalStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum EventStatus {
  ACTIVE = "active",
  CANCELED = "canceled",
  STARTED = "started",
  COMPLETED = "completed",
}

export interface IEvent {
  _id:string
  title: string;
  description: string;
  type: string;
  date: Date;
  location: string;
  category: string;
  topic: string;
  picture: string;
  postedBy: string | IUser;
  status: EventStatus;
  approvalStatus: ApprovalStatus;
  participants: IParticipant[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvents {
  data: IEvent[];
}

export interface IPopulatedParticipants {
  user:string,
  status:string,
  userInfo:{
    _id:string,
    name:string,
    profilePicture:string
  }
}