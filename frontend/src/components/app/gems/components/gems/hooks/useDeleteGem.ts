import useHttpDelete from "@/api/useHttpDelete";

export default function useDeleteGem(
  baseUrl: string = "/api/gems",
  queryToInvalidate?: any
) {
  const deleteMutation = useHttpDelete(baseUrl, queryToInvalidate);

  const deleteGem = async (id: number) => {
    return await deleteMutation.mutateAsync(id);
  };

  return {
    deleteGem,
    isDeleting: deleteMutation.isPending,
    error: deleteMutation.error,
  };
}
