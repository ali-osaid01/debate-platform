import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { authenticatedUser } from '@/services/user.service';
import { useUserStore } from '@/store/user.store';

export function useAuthenticatedUser() {
  const { user, setUser} = useUserStore();
  // const router = useRouter();

  const { data, isLoading,error } = useQuery({
    queryKey: ['user'],
    queryFn: ()=>authenticatedUser(),
    staleTime: 5 * 60 * 1000,
    enabled:!user
  });


  console.log("USER ERROR",error);
  console.log("USER ->",user);
  console.log("User DATA ->",data);
  useEffect(() => {
    if (!isLoading && data?.success && data.response && !user) {
      setUser(data?.response.data);
    }
  }, [data, isLoading, user, setUser]);

  return { user, isLoading };
}
