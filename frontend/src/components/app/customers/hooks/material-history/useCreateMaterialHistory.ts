import { toast } from "sonner";
import useHttpPost from "@/api/useHttpPost";
import { MaterialHistoryFormValues } from "@/types/Material";

export default function useCreateMaterialHistory() {
  const query = useHttpPost("/api/material-history");

  const createMaterialHistory = async (values: MaterialHistoryFormValues) => {
    try {
      const result = await query.mutateAsync(values);
      toast.success("Material added successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to add material"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    createMaterialHistory,
    isLoading: query.isPending,
    error: query.error,
  };
}
