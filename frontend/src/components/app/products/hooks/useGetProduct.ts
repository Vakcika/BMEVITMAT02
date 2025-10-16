import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetProduct(isNew: boolean) {
  const { id } = useParams();

  const initialValues: ProductFormValues = {
    id: 0,
    name: "",
    category_id: 0,
    gems: [],
    weight: 0,
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

  let productData: ProductFormValues = initialValues;

  if (!isNew && query.data?.data) {
    const product = query.data.data as Product;

    productData = {
      id: product.id,
      name: product.name,
      category_id: product.category?.id ?? 0,
      gems: product.gems.map((g) => ({
        id: g.gem.id,
        count: g.count,
      })),
      weight: product.weight ?? undefined,
      size: product.size ?? "",
      image_url: product.image_url ?? "",
      notes: product.notes ?? "",
    };
  }

  return {
    id,
    productData,
    isLoading: query.isLoading,
  };
}
