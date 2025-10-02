import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetUsers(baseUrl: string = "/api/users") {
  const query = useHttpGet<PagableResourceWrapper<User[]>>(`${baseUrl}`);

  if (query.error) {
    toast.error(query.error.message || "Failed to load");
    console.error(query.error);
  }

  return {
    prices: query.data?.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
