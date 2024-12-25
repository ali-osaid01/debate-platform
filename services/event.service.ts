import { IEventValues } from "@/types/interface/event.interface";
import api from "./middleware";

export const createEvent = async (payload:any) => {
  try {
    const participants = payload.participants.map((participant:any) => {
      // Check if participant.user is an object (IUser) or a string (user ID)
      const userId =
        typeof participant.user === "string"
          ? participant.user
          : participant?.user?._id!;
      return { user: userId };
    });

    const response = await api.post("/event", { ...payload, participants });
    return {
      status: "success",
      response,
    };
  } catch (error: any) {
    console.log("ERROR ->", error);

    return {
      status: "failed",
      response: error.response?.data?.msg || "Something went wrong",
    };
  }
};
export const fetchEvents = async (user?: string, type?: string) => {
  try {
    const params = new URLSearchParams();
    
    if (user) {
      params.append('postedBy', String(user));
    }

    if (type) {
      params.append('type', type);
    }

    const { data } = await api.get(`/event?${params.toString()}`);

    return {
      status: "success",
      response: data,
    };
  } catch (error: any) {
    console.log("ERROR ->", error);

    return {
      status: "failed",
      response: error.response?.data?.msg || "Something went wrong",
    };
  }
};

export const toggleEventStatus = async (payload:{event:string,notification:string,user:string,status:string}) => {
  try {
    const response = await api.put(`/event/toggle-user-status`, {
      notification: payload.notification,
      user: payload.user,
      status: payload.status,
      event: payload.event,
    });

    return {
      status: "success",
      response,
    };
  } catch (error: any) {
    console.log("ERROR ->", error);

    return {
      status: "failed",
      response: error.response?.data?.msg || "Something went wrong",
    };
  }
}