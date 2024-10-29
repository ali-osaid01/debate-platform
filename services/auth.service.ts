import api from "./middleware";
import { STATUS } from "@/types/enum";
import { ILogin, IResetPassword, IVerifyOTP } from "@/types/interface/auth.interface";
export const login = async (payload:ILogin) => {
    try {
        const response = await api.post('/auth/login',payload);
       
        const token = response?.data?.data?.accessToken;
        if(token) localStorage.setItem("accessToken",token);

        return {
            status: STATUS.SUCCESS,
            response
        }

    } catch (error: any) {
        console.log("ERROR ->", error)
        return {
            status: STATUS.FAILED,
            response: error.response?.data?.message || "Something went wrong",
        }
        
    }
}

export const register =  async (payload:ILogin) => {
    try {
        const response = await api.post('/auth/register',payload);
        
        return {
            status: STATUS.SUCCESS,
            response
        }

    } catch (error: any) {
        console.log("ERROR ->", error)
       
        return {
            status: STATUS.FAILED,
            response: error.response?.data?.message || "Something went wrong",
        }
    }
}

export const forgetPassword = async ({email}:{email:string}) => {
    try {
        const response = await api.put('/auth/send-otp',{email});
        
        return {
            status: STATUS.SUCCESS,
            response
        }

    } catch (error: any) {
        console.log("ERROR ->", error)
       
        return {
            status: STATUS.FAILED,
            response: error.response?.data?.message || "Something went wrong",
        }
        
    }
}

export const verifyOtp = async (payload:IVerifyOTP) => {
    try {
        const response = await api.put('/auth/verify-otp',payload);
        
        return {
            status: STATUS.SUCCESS,
            response
        }

    } catch (error: any) {
        console.log("ERROR ->", error)
       
        return {
            status: STATUS.FAILED,
            response: error.response?.data?.message || "Something went wrong",
        }
    }
}

export const resetPassword = async (payload:IResetPassword) => {
    try {
        const response = await api.put('/auth/reset-password',payload);
        
        return {
            status: STATUS.SUCCESS,
            response
        }

    } catch (error: any) {
        console.log("ERROR ->", error)
       
        return {
            status: STATUS.FAILED,
            response: error.response?.data?.message || "Something went wrong",
        }
    }
}