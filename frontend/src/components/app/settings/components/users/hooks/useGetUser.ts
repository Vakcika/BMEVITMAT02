import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetUser(isNew: boolean) {
  const { id } = useParams();

  const initialValues: User = {
    id: 0,
    name: "",
    email: "",
    updated_at: "",
  };

  const query = isNew
    ? {
        data: { data: initialValues },
        isLoading: false,
        error: null,
      }
    : useHttpGet<{ data: User }>(`/api/users/${id}`);

  if (query.error) {
    toast.error(query.error.message || "Failed to load");
    console.error(query.error);
  }

  return {
    id,
    userData: (!isNew && query.data?.data) || initialValues,
    isLoading: query.isLoading,
  };
}
