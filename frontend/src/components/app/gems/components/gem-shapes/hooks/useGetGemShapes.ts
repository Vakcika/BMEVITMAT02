import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetGemShapes(baseUrl: string = "/api/gem-shapes") {
  const query = useHttpGet<PagableResourceWrapper<GemShape[]>>(`${baseUrl}`);

  if (query.error) {
    toast.error(query.error.message || "Failed to load gem shapes.");
    console.error(query.error);
  }

  return {
    shapes: query.data?.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
