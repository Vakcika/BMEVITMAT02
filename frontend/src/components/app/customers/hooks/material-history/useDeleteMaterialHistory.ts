import { toast } from "sonner";
import useHttpDelete from "@/api/useHttpDelete";
import { UUID } from "crypto";

export default function useDeleteMaterialHistory(
  baseUrl: string = "/api/material-history",
  queryToInvalidate?: any
) {
  const query = useHttpDelete(baseUrl, queryToInvalidate);

  const deleteMaterialHistory = async (id: UUID) => {
    try {
      const result = await query.mutateAsync(id);
      toast.success("Material history deleted successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete material history"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    deleteMaterialHistory,
    isDeleting: query.isPending,
    error: query.error,
  };
}
