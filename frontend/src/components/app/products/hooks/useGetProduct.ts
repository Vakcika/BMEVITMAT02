import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetProduct(isNew: boolean) {
  const { id } = useParams();

  const initialValues: ProductFormValues = {
    id: 0,
    name: "",
    category_id: "",
    gems: [],
    weight: undefined,
    size: "",
    image_url: "",
    notes: "",
  };

  const query = isNew
    ? { data: { data: initialValues }, isLoading: false, error: null }
    : useHttpGet<{ data: Product }>(`/api/products/${id}`);

  if (query.error) {
    toast.error(query.error.message || "Failed to load product.");
    console.error(query.error);
  }

  const productData: ProductFormValues =
    !isNew && query.data?.data
      ? {
          id: query.data.data.id,
          name: query.data.data.name,
          category_id: query.data.data.category.id,
          gems: query.data.data.gems.map((g) => ({ id: g.id, count: g.count })),
          weight: query.data.data.weight ?? undefined,
          size: query.data.data.size ?? "",
          image_url: query.data.data.image_url ?? "",
          notes: query.data.data.notes ?? "",
        }
      : initialValues;

  return {
    id,
    productData,
    isLoading: query.isLoading,
  };
}
