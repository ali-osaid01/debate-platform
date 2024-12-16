import { STATUS } from "@/types/enum";
import api from "./middleware";

export const fetchCategories = async () => {
  try {
    const { data } = await api.get("/category");
    return {
      status: STATUS.SUCCESS,
      response: data?.data,
    };
  } catch (error: any) {
    console.log("Error ->", error);
    return {
      status: STATUS.FAILED,
      response: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const fetchSingleCategory = async (id?: string): Promise<any> => {
  try {
    const { data } = await api.get(`/category/show?id=${id}`);
    return {
      status: STATUS.SUCCESS,
      response: data?.data,
    };
  } catch (error: any) {
    console.log("Error ->", error);
    return {
      status: STATUS.FAILED,
      response: error.response?.data?.message || "Something went wrong",
    };
  }
};
