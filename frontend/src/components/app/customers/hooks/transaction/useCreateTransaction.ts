import { toast } from "sonner";
import useHttpPost from "@/api/useHttpPost";
import { TransactionFormValues } from "@/types/Transaction";

export default function useCreateTransaction() {
  const createMutation = useHttpPost("/api/transactions");

  const createTransaction = async (values: TransactionFormValues) => {
    try {
      const result = await createMutation.mutateAsync(values);
      toast.success("Transaction created successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to create transaction"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    createTransaction,
    isLoading: createMutation.isPending,
    error: createMutation.error,
  };
}
