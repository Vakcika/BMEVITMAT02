import useHttpDelete from "@/api/useHttpDelete";

export default function useDeleteProduct(
  baseUrl: string = "/api/products",
  queryToInvalidate?: any
) {
  const deleteMutation = useHttpDelete(baseUrl, queryToInvalidate);

  const deleteProduct = async (id: number) => {
    return await deleteMutation.mutateAsync(id);
  };

  return {
    deleteProduct,
    isDeleting: deleteMutation.isPending,
    error: deleteMutation.error,
  };
}
