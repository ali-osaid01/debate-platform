import { ENOTIFICATION_TYPES } from "../enum";
import { IUser } from "./user.interface";

export interface INotification {
    _id:string
    receiver: string;
    sender: IUser | string;
    type: ENOTIFICATION_TYPES;
    content: string;
    title: string;
    isRead: boolean;
    data?: any;
    createdAt:Date
}

export interface INotificationResponse {
    data:INotification[]
}