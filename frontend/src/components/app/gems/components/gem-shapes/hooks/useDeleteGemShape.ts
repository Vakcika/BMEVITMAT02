import useHttpDelete from "@/api/useHttpDelete";

export default function useDeleteGemShape(
  baseUrl: string = "/api/gem-shapes",
  queryToInvalidate?: any
) {
  const deleteMutation = useHttpDelete(baseUrl, queryToInvalidate);

  const deleteGemShape = async (id: number) => {
    return await deleteMutation.mutateAsync(id);
  };

  return {
    deleteGemShape,
    isDeleting: deleteMutation.isPending,
    error: deleteMutation.error,
  };
}
