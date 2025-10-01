import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetGem(isNew: boolean) {
  const { id } = useParams();

  const initialValues: Gem = {
    id: 0,
    size: "",
    color: { id: 0, name: "", updated_at: "" },
    shape: { id: 0, name: "", updated_at: "" },
    price: 0,
    booking_price: 0,
    created_at: "",
    updated_at: "",
  };

  const query = isNew
    ? {
        data: { data: initialValues },
        isLoading: false,
        error: null,
      }
    : useHttpGet<{ data: Gem }>(`/api/gems/${id}`);

  if (query.error) {
    toast.error(query.error.message || "Failed to load gem shape.");
    console.error(query.error);
  }

  return {
    id,
    gemData: (!isNew && query.data?.data) || initialValues,
    isLoading: query.isLoading,
  };
}
