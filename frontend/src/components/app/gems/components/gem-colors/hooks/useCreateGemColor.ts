import useHttpPost from "@/api/useHttpPost";

export default function useCreateGemColor() {
  const createMutation = useHttpPost("/api/gem-colors");

  const createGemColor = async (values: GemColor) => {
    return await createMutation.mutateAsync(values);
  };

  return {
    createGemColor,
    isLoading: createMutation.isPending,
    error: createMutation.error,
  };
}
