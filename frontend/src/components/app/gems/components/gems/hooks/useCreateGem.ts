import useHttpPost from "@/api/useHttpPost";

export default function useCreateGem() {
  const createMutation = useHttpPost("/api/gems");

  const createGem = async (values: GemRequest) => {
    return await createMutation.mutateAsync(values);
  };

  return {
    createGem,
    isLoading: createMutation.isPending,
    error: createMutation.error,
  };
}
