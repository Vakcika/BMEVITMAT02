import { toast } from "sonner";
import useHttpPut from "@/api/useHttpPut";

export default function useUpdateMaterial() {
  const updateMutation = useHttpPut("/api/materials");

  const updateMaterial = async (values: Material) => {
    try {
      const result = await updateMutation.mutateAsync(values);
      toast.success("Material updated successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to update material"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    updateMaterial,
    isLoading: updateMutation.isPending,
    error: updateMutation.error,
  };
}
