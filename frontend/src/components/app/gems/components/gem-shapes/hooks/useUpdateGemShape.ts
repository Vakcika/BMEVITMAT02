import useHttpPut from "@/api/useHttpPut";

export default function useUpdateGemShape() {
  const updateMutation = useHttpPut("/api/gem-shapes");

  const updateGemShape = async (values: GemShape) => {
    return await updateMutation.mutateAsync(values);
  };

  return {
    updateGemShape,
    isLoading: updateMutation.isPending,
    error: updateMutation.error,
  };
}
