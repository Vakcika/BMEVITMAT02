import useHttpDelete from "@/api/useHttpDelete";

export default function useDeleteCustomer(
  baseUrl: string = "/api/customers",
  queryToInvalidate?: any
) {
  const deleteMutation = useHttpDelete(baseUrl, queryToInvalidate);

  const deleteCustomer = async (id: number) => {
    return await deleteMutation.mutateAsync(id);
  };

  return {
    deleteCustomer,
    isDeleting: deleteMutation.isPending,
    error: deleteMutation.error,
  };
}
