import useHttpGet from "@/api/useHttpGet";

export default function useGetGems() {
  const query = useHttpGet<{ data: Gem[] }>("/api/gems");

  return {
    gems: query.data?.data || [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
