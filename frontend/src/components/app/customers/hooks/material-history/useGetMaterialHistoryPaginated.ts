import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";
import { MaterialHistory } from "@/types/Material";

export default function useGetMaterialHistorysPaginated(
  rows: number,
  page: number,
  queryParams: string = "",
  queryString: string = "",
  baseUrl: string = "/api/material-history"
) {
  const query = useHttpGet<PagableResourceWrapper<MaterialHistory[]>>(
    `${baseUrl}?per_page=${rows}&page=${page}${queryParams}&${queryString}`
  );

  if (query.error) {
    toast.error(query.error?.message || "Failed to load material history.");
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
