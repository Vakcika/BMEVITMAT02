import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetCustomersPaginated(
  rows: number,
  page: number,
  queryParams: string = "",
  queryString: string = "",
  baseUrl: string = "/api/customers"
) {
  const query = useHttpGet<PagableResourceWrapper<Customer[]>>(
    `${baseUrl}?per_page=${rows}&page=${page}${queryParams}&${queryString}`
  );

  if (query.error) {
    toast.error(query.error.message || "Failed to load customers.");
    console.error(query.error);
  }

  return {
    customers: query.data?.data ?? [],
    meta: query.data?.meta,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
