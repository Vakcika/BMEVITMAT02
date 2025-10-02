import { toast } from "sonner";
import useHttpPost from "@/api/useHttpPost";

export default function useCreateProductCategory() {
  const createMutation = useHttpPost("/api/product-categories");

  const createProductCategory = async (values: ProductCategory) => {
    try {
      const result = await createMutation.mutateAsync(values);
      toast.success("Product category created successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to create product category"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    createProductCategory,
    isLoading: createMutation.isPending,
    error: createMutation.error,
  };
}
