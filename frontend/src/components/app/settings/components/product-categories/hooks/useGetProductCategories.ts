import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetProductCategories(
  baseUrl: string = "/api/product-categories"
) {
  const query = useHttpGet<PagableResourceWrapper<ProductCategory[]>>(
    `${baseUrl}`
  );

  if (query.error) {
    toast.error(query.error.message || "Failed to load");
    console.error(query.error);
  }

  return {
    categories: query.data?.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
