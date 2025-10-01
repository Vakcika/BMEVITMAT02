import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetMaterial(isNew: boolean) {
  const { id } = useParams();

  const initialValues: Material = {
    id: 0,
    customer_id: 0,
    type: "",
    name: "",
    raw_casting_price: 0,
    wrought_casting_price: 0,
    raw_casting_loss: 0,
    wrought_casting_loss: 0,
    mark_price: 0,
    trade_in_price: 0,
    stub_placement_price: 0,
    stub_removal_price: 0,
    extra_charge: 0,
    updated_at: "",
  };

  const query = isNew
    ? {
        data: { data: initialValues },
        isLoading: false,
        error: null,
      }
    : useHttpGet<{ data: Material }>(`/api/materials/${id}`);

  if (query.error) {
    toast.error(query.error.message || "Failed to load");
    console.error(query.error);
  }

  return {
    id,
    materialData: (!isNew && query.data?.data) || initialValues,
    isLoading: query.isLoading,
  };
}
