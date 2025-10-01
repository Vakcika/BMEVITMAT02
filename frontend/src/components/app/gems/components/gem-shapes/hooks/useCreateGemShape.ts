import useHttpPost from "@/api/useHttpPost";

export default function useCreateGemShape() {
  const createMutation = useHttpPost("/api/gem-shapes");

  const createGemShape = async (values: GemShape) => {
    return await createMutation.mutateAsync(values);
  };

  return {
    createGemShape,
    isLoading: createMutation.isPending,
    error: createMutation.error,
  };
}
