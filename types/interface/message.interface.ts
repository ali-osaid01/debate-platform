import { IChat } from "./chat.interface";
import { IUser } from "./user.interface";

export interface IMessage {
    id:string,
    chat: string | IChat ; 
    sender: string | IUser ;
    messageType: "text" | "image" | "video" | "audio" | "document";
    content: string; 
    isAnnocement: boolean;
    isDeleted: boolean; 
    createdAt: Date; 
    updatedAt: Date; 
  }
