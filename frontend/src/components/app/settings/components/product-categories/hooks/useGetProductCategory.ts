import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetProductCategory(isNew: boolean) {
  const { id } = useParams();

  const initialValues: ProductCategory = {
    id: 0,
    name: "",
    updated_at: "",
  };

  const query = isNew
    ? {
        data: { data: initialValues },
        isLoading: false,
        error: null,
      }
    : useHttpGet<{ data: ProductCategory }>(`/api/product-categories/${id}`);

  if (query.error) {
    toast.error(query.error.message || "Failed to load");
    console.error(query.error);
  }

  return {
    id,
    productCategoryData: (!isNew && query.data?.data) || initialValues,
    isLoading: query.isLoading,
  };
}
