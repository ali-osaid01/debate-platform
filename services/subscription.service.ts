import api from "./middleware";

export const fetchSubscription = async () => {
    try {
        const { data } = await api.get("/subscription");
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
}

export const createSubscription = async (payload: {price:string,plan:string}) => {
    try {
        const response = await api.post("/subscription", payload);
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

export const cancelSubscription = async (subscriptionId:string) => {
    try {
        const response = await api.put("/subscription/cancel",{subscriptionId}); 
        return {
            status: "success",
            response,
        };
    } catch (error:any) {
        console.log("ERROR ->", error);
        return {
            status: "failed",
            response: error.response?.data?.msg || "Something went wrong",
        };
    }
}