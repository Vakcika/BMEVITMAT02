import useHttpDelete from "@/api/useHttpDelete";

export default function useDeleteGemColor(
  baseUrl: string = "/api/gem-colors",
  queryToInvalidate?: any
) {
  const deleteMutation = useHttpDelete(baseUrl, queryToInvalidate);

  const deleteGemColor = async (id: number) => {
    return await deleteMutation.mutateAsync(id);
  };

  return {
    deleteGemColor,
    isDeleting: deleteMutation.isPending,
    error: deleteMutation.error,
  };
}
