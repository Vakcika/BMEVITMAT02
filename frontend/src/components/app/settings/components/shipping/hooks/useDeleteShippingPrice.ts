import { toast } from "sonner";
import useHttpDelete from "@/api/useHttpDelete";

export default function useDeleteShippingPrice(
  baseUrl: string = "/api/shipping-prices",
  queryToInvalidate?: any
) {
  const deleteMutation = useHttpDelete(baseUrl, queryToInvalidate);

  const deleteShippingPrice = async (id: number) => {
    try {
      const result = await deleteMutation.mutateAsync(id);
      toast.success("Shipping price deleted successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete shipping price"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    deleteShippingPrice,
    isDeleting: deleteMutation.isPending,
    error: deleteMutation.error,
  };
}
