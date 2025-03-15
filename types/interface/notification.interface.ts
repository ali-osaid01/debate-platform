import { ENOTIFICATION_TYPES } from "../enum";
import { IUser } from "./user.interface";

export interface INotification {
    _id:string
    receiver: string;
    sender: IUser | string;
    type: ENOTIFICATION_TYPES;
    content: string;
    title: string;
    metadata?:{[key:string]:any};
    isRead: boolean;
    data?: any;
    createdAt:Date
}

export interface INotificationResponse {
    notification:{
        data:INotification[]
    }
    count:number
}