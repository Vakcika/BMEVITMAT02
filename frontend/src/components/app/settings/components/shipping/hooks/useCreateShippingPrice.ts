import { toast } from "sonner";
import useHttpPost from "@/api/useHttpPost";

export default function useCreateShippingPrice() {
  const createMutation = useHttpPost("/api/shipping-prices");

  const createShippingPrice = async (values: ShippingPrice) => {
    try {
      const result = await createMutation.mutateAsync(values);
      toast.success("Shipping price created successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to create shipping price"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    createShippingPrice,
    isLoading: createMutation.isPending,
    error: createMutation.error,
  };
}
