import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetGemShape(isNew: boolean) {
  const { id } = useParams();

  const initialValues: GemShape = {
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
    : useHttpGet<{ data: GemShape }>(`/api/gem-shapes/${id}`);

  if (query.error) {
    toast.error(query.error.message || "Failed to load gem shape.");
    console.error(query.error);
  }

  return {
    id,
    gemShapeData: (!isNew && query.data?.data) || initialValues,
    isLoading: query.isLoading,
  };
}
