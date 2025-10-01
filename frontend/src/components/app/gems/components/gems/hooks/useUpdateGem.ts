import useHttpPut from "@/api/useHttpPut";

export default function useUpdateGem() {
  const updateMutation = useHttpPut("/api/gems");

  const updateGem = async (values: GemRequest) => {
    return await updateMutation.mutateAsync(values);
  };

  return {
    updateGem,
    isLoading: updateMutation.isPending,
    error: updateMutation.error,
  };
}
