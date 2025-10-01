import useHttpPut from "@/api/useHttpPut";

export default function useUpdateGemColor() {
  const updateMutation = useHttpPut("/api/gem-colors");

  const updateGemColor = async (values: GemColor) => {
    return await updateMutation.mutateAsync(values);
  };

  return {
    updateGemColor,
    isLoading: updateMutation.isPending,
    error: updateMutation.error,
  };
}
