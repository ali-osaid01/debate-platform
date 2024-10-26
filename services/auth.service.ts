import { STATUS } from "@/types/enum";
import api from "./middleware";
import { ILogin } from "@/types/interface/auth.interface";

export const login = async (payload:ILogin) => {
    try {
        const response = await api.post('/auth/login',payload);
        
        return {
            status: STATUS.SUCCESS,
            response
        }

    } catch (error: any) {
        console.log("ERROR ->", error)
        // throw new Error (error.response?.data?.message || "Something went wrong")
        return {
            status: STATUS.FAILED,
            response: error.response?.data?.message || "Something went wrong",
        }
        
    }
}