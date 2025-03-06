import { IEvent } from "./event.interface";
import { IUser } from "./user.interface";

export interface ICalender  {
    id:string
    _id:string
    event: IEvent;
    creator: string | IUser;
    createdAt: Date;
    updatedAt: Date;
}