import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useGetShippingPrices(
  baseUrl: string = "/api/shipping-prices"
) {
  const query = useHttpGet<PagableResourceWrapper<ShippingPrice[]>>(
    `${baseUrl}`
  );

  if (query.error) {
    toast.error(query.error.message || "Failed to load");
    console.error(query.error);
  }

  return {
    prices: query.data?.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
