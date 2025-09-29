import { useCallback } from "react";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetTransactionYears() {
  const transactionYearsQuery = useHttpGet<{ years: number[] }>(
    "/api/transactions-years"
  );

  const handleError = useCallback((error: any, defaultMessage: string) => {
    if (error) {
      toast.error(
        error?.response?.data?.message ?? error?.message ?? defaultMessage
      );
      console.error(error);
    }
  }, []);

  handleError(transactionYearsQuery.error, "Failed to load transaction years.");

  return {
    years: transactionYearsQuery.data?.years || [],
    isLoading: transactionYearsQuery.isLoading,
    error: transactionYearsQuery.error,
  };
}