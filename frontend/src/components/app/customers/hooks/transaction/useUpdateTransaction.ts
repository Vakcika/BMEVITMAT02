import { toast } from "sonner";
import useHttpPut from "@/api/useHttpPut";
import { TransactionFormValues } from "@/types/Transaction";

export default function useUpdateTransaction() {
  const updateMutation = useHttpPut("/api/transactions");

  const updateTransaction = async (values: TransactionFormValues) => {
    try {
      const result = await updateMutation.mutateAsync(values);
      toast.success("Transaction updated successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to update transaction"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    updateTransaction,
    isLoading: updateMutation.isPending,
    error: updateMutation.error,
  };
}
