import useHttpPut from "@/api/useHttpPut";

export default function useUpdateCustomer() {
  const updateMutation = useHttpPut("/api/customers");

  const updateCustomer = async (values: Customer) => {
    return await updateMutation.mutateAsync(values);
  };

  return {
    updateCustomer,
    isLoading: updateMutation.isPending,
    error: updateMutation.error,
  };
}
