import { IUser } from "@/types/interface/user.interface";
import api from "./middleware";

export const authenticatedUser = async (id?: string): Promise<any>  => {
   try {
      const url = id ? `/user/authenticated/?userId=${id}` : `/user/authenticated/`;

      const { data } = await api.get(url);
      return {
         success: true,
         response: data
      };
   } catch (error: any) {
      return {
         success: false,
         error: error.response?.data?.message || "Something went wrong",
      };
   }
};
