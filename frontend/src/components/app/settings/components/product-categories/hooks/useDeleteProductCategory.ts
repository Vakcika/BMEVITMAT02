import { toast } from "sonner";
import useHttpDelete from "@/api/useHttpDelete";

export default function useDeleteProductCategory(
  baseUrl: string = "/api/product-categories",
  queryToInvalidate?: any
) {
  const deleteMutation = useHttpDelete(baseUrl, queryToInvalidate);

  const deleteProductCategory = async (id: number) => {
    try {
      const result = await deleteMutation.mutateAsync(id);
      toast.success("Product category deleted successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete product category"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    deleteProductCategory,
    isDeleting: deleteMutation.isPending,
    error: deleteMutation.error,
  };
}
