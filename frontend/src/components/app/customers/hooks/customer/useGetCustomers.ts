import { useCallback } from "react";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetCustomers(perPage: number = 100) {
  const customersQuery = useHttpGet<{ data: Customer[] }>(
    `/api/customers?per_page=${perPage}`
  );

  const handleError = useCallback((error: any, defaultMessage: string) => {
    if (error) {
      toast.error(
        error?.response?.data?.message ?? error?.message ?? defaultMessage
      );
      console.error(error);
    }
  }, []);

  handleError(customersQuery.error, "Failed to load customers.");

  return {
    customers: customersQuery.data?.data || [],
    isLoading: customersQuery.isLoading,
    error: customersQuery.error,
  };
}
