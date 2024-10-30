import { STATUS } from "@/types/enum";
import { NETWORK_ERROR } from "@/utils/constant";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MutationResponse<TResponse> {
  status: STATUS;
  response: TResponse;
}

interface UseFormMutationOptions<TResponse, TError, TVariables> {
  mutationFn: (data: TVariables) => Promise<MutationResponse<TResponse>>;
  successMessage: string;
  errorMessage: string;
  route?: string
}

interface UseFormMutationReturn<TResponse, TError, TVariables> {
  handleFormSubmit: (data: TVariables) => Promise<void>;
  isLoading: boolean;
  mutation: UseMutationResult<MutationResponse<TResponse>, TError, TVariables, unknown>;
}

export function useFormMutation<TResponse, TError = Error, TVariables = unknown>({
  mutationFn,
  successMessage,
  errorMessage,
  route
}: UseFormMutationOptions<TResponse, TError, TVariables>): UseFormMutationReturn<TResponse, TError, TVariables> {
  const router = useRouter();
  const mutation = useMutation<MutationResponse<TResponse>, TError, TVariables, unknown>({
    mutationFn,
    onSuccess: async ({ status, response }) => {
      if (status === STATUS.SUCCESS) {
       toast(successMessage); 
       router.push(route!); 
      } else {
        toast.error(response as string);
      }
    },
    onError: () => {
      toast.error(NETWORK_ERROR);
    },
  });

  const handleFormSubmit = async (data: TVariables) => {
    const { response } = await mutation.mutateAsync(data);
    console.log("response ->", response)
  };

  return { handleFormSubmit, isLoading: mutation.isPending, mutation };
}
