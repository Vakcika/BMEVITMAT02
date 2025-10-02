import { toast } from "sonner";
import useHttpPut from "@/api/useHttpPut";

export default function useUpdateProductCategory() {
  const updateMutation = useHttpPut("/api/product-categories");

  const updateProductCategory = async (values: ProductCategory) => {
    try {
      const result = await updateMutation.mutateAsync(values);
      toast.success("Product category updated successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to update product category"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    updateProductCategory,
    isLoading: updateMutation.isPending,
    error: updateMutation.error,
  };
}
