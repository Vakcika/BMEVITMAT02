import { toast } from "sonner";
import useHttpPut from "@/api/useHttpPut";
import { MaterialHistoryFormValues } from "@/types/Material";

export default function useUpdateMaterialHistory() {
  const query = useHttpPut("/api/material-history");

  const updateMaterialHistory = async (values: MaterialHistoryFormValues) => {
    try {
      const result = await query.mutateAsync(values);
      toast.success("Material updated successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to update material."
      );
      console.error(error);
      throw error;
    }
  };

  return {
    updateMaterialHistory,
    isLoading: query.isPending,
    error: query.error,
  };
}
