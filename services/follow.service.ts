import { STATUS } from "@/types/enum";
import api from "./middleware";

export const checkIsFollowing = async (followed: string): Promise<any> => {
  const { data } = await api.get(`/follow/?followed=${followed}`);
  return {
    response: data.isFollowing,
    status: STATUS.SUCCESS,
  };
};

export const followUser = async (followed: string) => {
  const { data } = await api.put("/follow", { followed });
  return {
    response: data.follow,
    status: STATUS.SUCCESS,
  };
};
