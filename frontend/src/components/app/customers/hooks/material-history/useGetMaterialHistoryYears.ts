import { useCallback } from "react";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetMaterialHistoryYears() {
  const query = useHttpGet<{ years: number[] }>("/api/material-history-years");

  const handleError = useCallback((error: any, defaultMessage: string) => {
    if (error) {
      toast.error(
        error?.response?.data?.message ?? error?.message ?? defaultMessage
      );
      console.error(error);
    }
  }, []);

  handleError(query.error, "Failed to load material history years.");

  return {
    years: query.data?.years || [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
