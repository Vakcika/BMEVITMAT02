import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";
import { Material } from "@/types/Material";

export default function useGetMaterials(perPage: number = 100) {
  const query = useHttpGet<{ data: Material[] }>(
    `/api/materials?per_page=${perPage}`
  );

  if (query.error) {
    toast.error(query.error?.message || "Failed to load materials.");
    console.error(query.error);
  }

  return {
    materials: query.data?.data || [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
