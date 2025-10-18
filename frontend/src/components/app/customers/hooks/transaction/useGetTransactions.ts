import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";
import { Transaction } from "@/types/Transaction";

export default function useGetTransactions(perPage: number = 100) {
  const transactionsQuery = useHttpGet<{ data: Transaction[] }>(
    `/api/transactions?per_page=${perPage}`
  );

  if (transactionsQuery.error) {
    toast.error(
      transactionsQuery.error?.message || "Failed to load transactions."
    );
    console.error(transactionsQuery.error);
  }

  return {
    transactions: transactionsQuery.data?.data || [],
    isLoading: transactionsQuery.isLoading,
    error: transactionsQuery.error,
  };
}
