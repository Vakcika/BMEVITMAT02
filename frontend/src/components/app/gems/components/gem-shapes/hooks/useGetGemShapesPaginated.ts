import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetGemShapesPaginated(
  rows: number,
  page: number,
  queryParams: string = "",
  queryString: string = "",
  baseUrl: string = "/api/gem-shapes"
) {
  const query = useHttpGet<PagableResourceWrapper<GemShape[]>>(
    `${baseUrl}?per_page=${rows}&page=${page}${queryParams}&${queryString}`
  );

  if (query.error) {
    toast.error(query.error.message || "Failed to load gem shapes.");
    console.error(query.error);
  }

  return {
    gemShapes: query.data?.data ?? [],
    meta: query.data?.meta,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
