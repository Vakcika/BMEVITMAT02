import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetGemColors(baseUrl: string = "/api/gem-colors") {
  const query = useHttpGet<PagableResourceWrapper<GemColor[]>>(`${baseUrl}`);

  if (query.error) {
    toast.error(query.error.message || "Failed to load gem colors.");
    console.error(query.error);
  }

  return {
    colors: query.data?.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
