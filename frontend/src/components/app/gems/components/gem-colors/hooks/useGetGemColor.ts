import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetGemColor(isNew: boolean) {
  const { id } = useParams();

  const initialValues: GemColor = {
    id: 0,
    name: "",
    created_at: "",
    updated_at: "",
  };

  const query = isNew
    ? {
        data: { data: initialValues },
        isLoading: false,
        error: null,
      }
    : useHttpGet<{ data: GemColor }>(`/api/gem-colors/${id}`);

  if (query.error) {
    toast.error(query.error.message || "Failed to load gem color.");
    console.error(query.error);
  }

  return {
    id,
    gemColorData: (!isNew && query.data?.data) || initialValues,
    isLoading: query.isLoading,
  };
}
