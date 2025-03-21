import api from "./middleware";
import { STATUS } from "@/types/enum";
import { IUser } from "@/types/interface/user.interface";

export const fetchAdmins = async (
  page?: number,
  limit?: number,
  search?: string,
): Promise<any> => {
  try {
    const url = `/moderator?page=${page || 1}&limit=${limit || 10}&search=${search || ""}`;
    const { data } = await api.get(url);
    return {
      status: STATUS.SUCCESS,
      response: data,
    };
  } catch (error: any) {
    return {
      status: STATUS.FAILED,
      error: error.response?.data?.msg || "Failed to fetch admins",
    };
  }
};

export const createAdmin = async (payload: Partial<IUser>): Promise<any> => {
  try {
    const { data } = await api.post("/moderator", payload);
    console.log("data", data);
    return {
      status: STATUS.SUCCESS,
      response: data,
    };
  } catch (error: any) {
    console.log("error", error);
  throw new Error(error.response?.data?.data || "Failed to create admin");
  }
};