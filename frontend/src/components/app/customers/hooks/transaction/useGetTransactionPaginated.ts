import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";
import { Transaction } from "@/types/Transaction";

export default function useGetTransactionsPaginated(
  rows: number,
  page: number,
  queryParams: string = "",
  queryString: string = "",
  baseUrl: string = "/api/transactions"
) {
  const query = useHttpGet<PagableResourceWrapper<Transaction[]>>(
    `${baseUrl}?per_page=${rows}&page=${page}${queryParams}&${queryString}`
  );

  if (query.error) {
    toast.error(query.error?.message || "Failed to load transactions");
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
