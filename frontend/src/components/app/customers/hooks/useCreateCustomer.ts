import useHttpPost from "@/api/useHttpPost";

export default function useCreateCustomer() {
  const createMutation = useHttpPost("/api/customers");

  const createCustomer = async (values: Customer) => {
    return await createMutation.mutateAsync(values);
  };

  return {
    createCustomer,
    isLoading: createMutation.isPending,
    error: createMutation.error,
  };
}
