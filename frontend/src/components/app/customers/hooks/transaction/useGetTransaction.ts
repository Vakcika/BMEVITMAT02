import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";
import { Transaction } from "@/types/Transaction";
import { UUID } from "crypto";

export default function useGetTransaction(isNew: boolean) {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const customerId = Number(searchParams.get("customer")) || null;

  const initialValues: Transaction = {
    id: "" as UUID,
    customer: { id: customerId } as Customer,
    balance: 0,
    amount: 0,
    note: "",
    created_at: "",
    updated_at: "",
  };

  const query = isNew
    ? {
        data: { data: initialValues },
        isLoading: false,
        error: null,
      }
    : useHttpGet<{ data: Transaction }>(`/api/transactions/${id}`);

  if (query.error) {
    toast.error(query.error?.message || "Failed to load transaction");
    console.error(query.error);
  }

  return {
    id,
    transactionData: (!isNew && query.data?.data) || initialValues,
    isLoading: query.isLoading,
  };
}
