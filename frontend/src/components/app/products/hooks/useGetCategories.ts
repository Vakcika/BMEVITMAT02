import useHttpGet from "@/api/useHttpGet";

export default function useGetProductCategories() {
  const query = useHttpGet<{ data: ProductCategory[] }>(
    "/api/product-categories"
  );

  return {
    categories: query.data?.data || [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
