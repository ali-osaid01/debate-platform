import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { authenticatedUser } from '@/services/user.service';
import { deleteCookie } from 'cookies-next';
import { toast } from 'sonner';
import { useUserStore } from '@/store/user.store';

export function useAuthenticatedUser() {
  const { user, setUser} = useUserStore();
  const router = useRouter();
  // const [sessionExpired, setSessionExpired] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: authenticatedUser,
    enabled: !user,
    staleTime: 5 * 60 * 1000,
  });

  // useEffect(() => {
  //   if (!isLoading && data && !data.success && !sessionExpired) {
  //     setSessionExpired(true);
  //     localStorage.removeItem("accessToken");
  //     deleteCookie("accessToken");
  //     toast.error("Session expired");
  //   }
  // }, [data, isLoading, sessionExpired, router]);

  console.log("USER ->",user)
  useEffect(() => {
    if (!isLoading && data?.success && data.response && !user) {
      setUser(data?.response?.data?.data);
    }
  }, [data, isLoading, user, setUser]);

  return { user, isLoading };
}
