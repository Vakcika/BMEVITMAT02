import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetGemColorsPaginated(
  rows: number,
  page: number,
  queryParams: string = "",
  queryString: string = "",
  baseUrl: string = "/api/gem-colors"
) {
  const query = useHttpGet<PagableResourceWrapper<GemColor[]>>(
    `${baseUrl}?per_page=${rows}&page=${page}${queryParams}&${queryString}`
  );

  if (query.error) {
    toast.error(query.error.message || "Failed to load gem colors.");
    console.error(query.error);
  }

  return {
    gemColors: query.data?.data ?? [],
    meta: query.data?.meta,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
