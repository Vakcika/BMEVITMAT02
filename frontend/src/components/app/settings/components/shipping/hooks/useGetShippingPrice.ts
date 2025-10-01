import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetShippingPrice(isNew: boolean) {
  const { id } = useParams();

  const initialValues: ShippingPrice = {
    id: 0,
    price: 0,
    created_at: "",
    updated_at: "",
  };

  const query = isNew
    ? {
        data: { data: initialValues },
        isLoading: false,
        error: null,
      }
    : useHttpGet<{ data: ShippingPrice }>(`/api/shipping-prices/${id}`);

  if (query.error) {
    toast.error(query.error.message || "Failed to load");
    console.error(query.error);
  }

  return {
    id,
    shippingPriceData: (!isNew && query.data?.data) || initialValues,
    isLoading: query.isLoading,
  };
}
