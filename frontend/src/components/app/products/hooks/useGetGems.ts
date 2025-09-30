import useHttpGet from "@/api/useHttpGet";

export interface Gem {
  id: number;
  color_name: string;
  shape_name: string;
  size: string;
}

export default function useGetGems() {
  const query = useHttpGet<{ data: Gem[] }>("/api/gems");

  return {
    gems: query.data?.data || [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
