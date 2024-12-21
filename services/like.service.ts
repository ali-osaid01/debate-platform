import api from "./middleware";

export const likeEvent = async (payload: { event: string, user: string }) => {
    try {
        const response = await api.put(`/like`, payload);
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
