import useHttpPut from "@/api/useHttpPut";
import useHttpPost from "@/api/useHttpPost";

export function useCustomerMutations() {
  const updateMutation = useHttpPut("/api/customers");
  const createMutation = useHttpPost("/api/customers");

  const createCustomer = async (values: Customer) => {
    return await createMutation.mutateAsync(values);
  };

  const updateCustomer = async (values: Customer) => {
    return await updateMutation.mutateAsync(values);
  };

  return {
    createCustomer,
    updateCustomer,
  };
}
