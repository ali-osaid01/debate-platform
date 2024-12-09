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
  successMessage?: string;
  errorMessage?: string;
  route?: string
  onSuccess?:()=>void
  onError?:()=>void
}

interface UseFormMutationReturn<TResponse, TError, TVariables> {
  handleFormSubmit: (data: TVariables) => Promise<TResponse>;
  isLoading: boolean;
  mutation: UseMutationResult<MutationResponse<TResponse>, TError, TVariables, unknown>;
}

export function useFormMutation<TResponse, TError = Error, TVariables = unknown>({
  mutationFn,
  successMessage,
  errorMessage,
  route,
  onError,
  onSuccess
}: UseFormMutationOptions<TResponse, TError, TVariables>): UseFormMutationReturn<TResponse, TError, TVariables> {
  const router = useRouter();
  const mutation = useMutation<MutationResponse<TResponse>, TError, TVariables, unknown>({
    mutationFn,
    onSuccess: async ({ status, response }) => {
      console.log("STATUS coming onSuccess",status)
      if (status === STATUS.SUCCESS) {
        if(onSuccess) onSuccess()
        if(route) router.push(route)
        if(successMessage) toast(successMessage);
      } else {
        if(onError) onError()
        toast.error(errorMessage);
      }
    },
    onError: () => {
      toast.error(NETWORK_ERROR);
    },
  });

  const handleFormSubmit = async (data: TVariables) => {
    const { response } = await mutation.mutateAsync(data);
    console.log("Hook Response ->", response)
    return response;
  };

  return { handleFormSubmit, isLoading: mutation.isPending, mutation };
}
