import { IEvent } from "./event.interface";
import { IUser } from "./user.interface";

export interface ICalender  {
    id:string
    events: IEvent;
    creator: string | IUser;
    createdAt: Date;
    updatedAt: Date;
}