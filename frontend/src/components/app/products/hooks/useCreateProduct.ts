import useHttpPost from "@/api/useHttpPost";

export default function useCreateProduct() {
  const createMutation = useHttpPost("/api/products");

  const createProduct = async (values: ProductFormValues) => {
    return await createMutation.mutateAsync(values);
  };

  return {
    createProduct,
    isLoading: createMutation.isPending,
    error: createMutation.error,
  };
}
