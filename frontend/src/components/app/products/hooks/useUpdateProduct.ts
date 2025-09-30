import useHttpPut from "@/api/useHttpPut";

export default function useUpdateProduct() {
  const updateMutation = useHttpPut("/api/products");

  const updateProduct = async (values: ProductFormValues) => {
    return await updateMutation.mutateAsync(values);
  };

  return {
    updateProduct,
    isLoading: updateMutation.isPending,
    error: updateMutation.error,
  };
}
