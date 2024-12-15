import { IUser } from "@/types/interface/user.interface";
import api from "./middleware";
import { STATUS } from "@/types/enum";

export const authenticatedUser = async (id?: string): Promise<any> => {
  try {
    const url = id
      ? `/user/authenticated/?userId=${id}`
      : `/user/authenticated/`;

    const { data } = await api.get(url);
    return {
      status: STATUS.SUCCESS,
      response: data,
    };
  } catch (error: any) {
    return {
      status: STATUS.FAILED,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const updateUser = async (payload: Partial<IUser>): Promise<any> => {
  try {
    const data = await api.put("/user", payload);
    return {
      status: STATUS.SUCCESS,
      response: data,
    };
  } catch (error: any) {
    return {
      status: STATUS.FAILED,
      response: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const fetchUsers = async (
  page?: number,
  limit?: number,
  search?: string,
): Promise<any> => {
  try {
    const url = `/user?page=${page || 1}&limit=${limit || 10}&search=${search}`;
    const { data } = await api.get(url);
    return {
      status: STATUS.SUCCESS,
      response: data,
    };
  } catch (error: any) {
    return {
      status: STATUS.FAILED,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};
