import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetGemsPaginated(
  rows: number,
  page: number,
  queryParams: string = "",
  queryString: string = "",
  baseUrl: string = "/api/gems"
) {
  const query = useHttpGet<PagableResourceWrapper<Gem[]>>(
    `${baseUrl}?per_page=${rows}&page=${page}${queryParams}&${queryString}`
  );

  if (query.error) {
    toast.error(query.error.message || "Failed to load gems.");
    console.error(query.error);
  }

  return {
    gems: query.data?.data ?? [],
    meta: query.data?.meta,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
