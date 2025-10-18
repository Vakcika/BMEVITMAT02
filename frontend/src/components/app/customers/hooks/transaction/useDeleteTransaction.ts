import { toast } from "sonner";
import useHttpDelete from "@/api/useHttpDelete";
import { UUID } from "crypto";

export default function useDeleteTransaction(
  baseUrl: string = "/api/transactions",
  queryToInvalidate?: any
) {
  const deleteMutation = useHttpDelete(baseUrl, queryToInvalidate);

  const deleteTransaction = async (id: UUID) => {
    try {
      const result = await deleteMutation.mutateAsync(id);
      toast.success("Transaction deleted successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete transaction"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    deleteTransaction,
    isDeleting: deleteMutation.isPending,
    error: deleteMutation.error,
  };
}
