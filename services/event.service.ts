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

export const fetchEvents = async (postedBy?: boolean) => {
  try {
    const { data } = await api.get(`/event?postedBy=${postedBy}`);

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
