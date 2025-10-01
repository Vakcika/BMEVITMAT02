import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetMaterial(baseUrl: string = "/api/materials") {
  const query = useHttpGet<PagableResourceWrapper<Material[]>>(`${baseUrl}`);

  if (query.error) {
    toast.error(query.error.message || "Failed to load");
    console.error(query.error);
  }

  return {
    materials: query.data?.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
