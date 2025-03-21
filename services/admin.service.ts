// src/services/admin.service.ts
import { IAdmin } from "@/types/interface/admin.interface";
import api from "./middleware";
import { STATUS } from "@/types/enum";

export const fetchAdmins = async (
  page?: number,
  limit?: number,
  search?: string,
): Promise<any> => {
  try {
    const url = `/admin?page=${page || 1}&limit=${limit || 10}&search=${search || ""}`;
    const { data } = await api.get(url);
    return {
      status: STATUS.SUCCESS,
      response: data,
    };
  } catch (error: any) {
    return {
      status: STATUS.FAILED,
      error: error.response?.data?.message || "Failed to fetch admins",
    };
  }
};

export const createAdmin = async (payload: Partial<IAdmin>): Promise<any> => {
  try {
    const { data } = await api.post("/admin", payload);
    return {
      status: STATUS.SUCCESS,
      response: data,
    };
  } catch (error: any) {
    return {
      status: STATUS.FAILED,
      error: error.response?.data?.message || "Failed to create admin",
    };
  }
};