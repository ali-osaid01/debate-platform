import api from "./middleware";

export const fetchBadge = async (page: number, limit: number) => {
  try {
    const { data } = await api.get(`/badge`, {
      params: { page, limit },
    });
    return {
      status: "success",
      response: data?.data,
    };
  } catch (error: any) {
    return {
      status: "error",
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const createBadge = async (badge: { name: string; image: string }) => {
  try {
    const { data: response } = await api.post("/badge", badge);
    return {
      status: "success",
      data: response,
    };
  } catch (error: any) {
    return {
      status: "error",
      error: error.response?.data?.data || "Something went wrong",
    };
  }
};
