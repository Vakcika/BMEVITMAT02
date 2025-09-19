import { useCallback } from "react";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useFormOptions() {
  const usersQuery = useHttpGet<User[]>("/api/users");

  const customersQuery = useHttpGet<{ data: Customer[] }>(
    "/api/customers?per_page=100"
  );

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

  handleError(usersQuery.error, "Failed to load users.");
  handleError(customersQuery.error, "Failed to load customers.");
  handleError(transactionYearsQuery.error, "Failed to load transaction years.");

  return {
    users: usersQuery.data || [],
    customers: customersQuery.data?.data || [],
    years: transactionYearsQuery.data?.years || [],

    isLoading: {
      users: usersQuery.isLoading,
      customers: customersQuery.isLoading,
      years: transactionYearsQuery.isLoading,
    },
  };
}
