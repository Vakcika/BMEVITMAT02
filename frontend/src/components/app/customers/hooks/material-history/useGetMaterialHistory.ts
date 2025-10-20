import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";
import { UUID } from "crypto";
import { Material, MaterialHistory } from "@/types/Material";

export default function useGetMaterialHistory(isNew: boolean) {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const customerId = Number(searchParams.get("customer")) || null;

  const initialValues: MaterialHistory = {
    id: "" as UUID,
    customer: { id: customerId } as Customer,
    order: { id: "" } as Order,
    material: { id: 0 } as Material,
    amount: 0,
    notes: "",
    created_at: "",
    updated_at: "",
    balances: {},
  };

  const query = isNew
    ? {
        data: { data: initialValues },
        isLoading: false,
        error: null,
      }
    : useHttpGet<{ data: MaterialHistory }>(`/api/material-history/${id}`);

  if (query.error) {
    toast.error(query.error?.message || "Failed to load material history.");
    console.error(query.error);
  }

  return {
    id,
    materialHistoryData: (!isNew && query.data?.data) || initialValues,
    isLoading: query.isLoading,
  };
}
