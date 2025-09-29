import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetProductsPaginated(
  rows: number,
  page: number,
  queryParams: string = "",
  queryString: string = "",
  baseUrl: string = "/api/products"
) {
  const query = useHttpGet<PagableResourceWrapper<Product[]>>(
    `${baseUrl}?per_page=${rows}&page=${page}${queryParams}&${queryString}`
  );

  if (query.error) {
    toast.error(query.error.message || "Failed to load products.");
    console.error(query.error);
  }

  return {
    products: query.data?.data ?? [],
    meta: query.data?.meta,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
