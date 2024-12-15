import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { authenticatedUser } from "@/services/user.service";
import { useUserStore } from "@/store/user.store";
import { STATUS } from "@/types/enum";

export function useAuthenticatedUser() {
  const { user, setUser } = useUserStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => authenticatedUser(),
    enabled: user === null,
    // initialData: user,
  });

  useEffect(() => {
    if (data?.status == STATUS.SUCCESS && data?.response?.data) {
      setUser(data.response.data);
    }
  }, [data, user, setUser]);

  return {
    user: user,
    isLoading,
    isError,
    error,
  };
}
