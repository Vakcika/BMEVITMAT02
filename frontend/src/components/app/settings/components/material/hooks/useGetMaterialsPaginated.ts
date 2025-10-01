import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetMaterialsPaginated(
  rows: number,
  page: number,
  queryParams: string = "",
  queryString: string = "",
  baseUrl: string = "/api/materials"
) {
  const query = useHttpGet<PagableResourceWrapper<Material[]>>(
    `${baseUrl}?per_page=${rows}&page=${page}${queryParams}&${queryString}`
  );

  if (query.error) {
    toast.error(query.error.message || "Failed to load");
    console.error(query.error);
  }

  return {
    data: query.data?.data ?? [],
    meta: query.data?.meta,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
