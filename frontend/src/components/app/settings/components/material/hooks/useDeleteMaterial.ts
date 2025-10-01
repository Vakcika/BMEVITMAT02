import { toast } from "sonner";
import useHttpDelete from "@/api/useHttpDelete";

export default function useDeleteMaterial(
  baseUrl: string = "/api/materials",
  queryToInvalidate?: any
) {
  const deleteMutation = useHttpDelete(baseUrl, queryToInvalidate);

  const deleteMaterial = async (id: number) => {
    try {
      const result = await deleteMutation.mutateAsync(id);
      toast.success("Material deleted successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete material"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    deleteMaterial,
    isDeleting: deleteMutation.isPending,
    error: deleteMutation.error,
  };
}
