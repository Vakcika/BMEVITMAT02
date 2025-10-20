import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";
import { MaterialHistory } from "@/types/Material";

export default function useGetMaterialHistories(perPage: number = 100) {
  const query = useHttpGet<{ data: MaterialHistory[] }>(
    `/api/material-history?per_page=${perPage}`
  );

  if (query.error) {
    toast.error(query.error?.message || "Failed to load material history.");
    console.error(query.error);
  }

  return {
    materialHistory: query.data?.data || [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
