import { toast } from "sonner";
import useHttpPut from "@/api/useHttpPut";

export default function useUpdateShippingPrice() {
  const updateMutation = useHttpPut("/api/shipping-prices");

  const updateShippingPrice = async (values: ShippingPrice) => {
    try {
      const result = await updateMutation.mutateAsync(values);
      toast.success("Shipping price updated successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to update shipping price"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    updateShippingPrice,
    isLoading: updateMutation.isPending,
    error: updateMutation.error,
  };
}
