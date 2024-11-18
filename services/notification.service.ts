import { ENOTIFICATION_TYPES } from "@/types/enum";
import api from "./middleware";

export const notification = async (type?: ENOTIFICATION_TYPES) => {
    try {
        const { data } = await api.get(`/notification?type=${type}`);
        return {
            response: data,
            status: "success"
        }
    } catch (error: any) {
        console.log("ERROR NOTIFICATION ->", error);
        return {
            response: error?.response?.data?.msg,
            status: "failed"
        }
    }
}