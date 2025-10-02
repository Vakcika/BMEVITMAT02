import { toast } from "sonner";
import useHttpPost from "@/api/useHttpPost";

export default function useCreateUser() {
  const createMutation = useHttpPost("/api/users");

  const createUser = async (values: User) => {
    try {
      const result = await createMutation.mutateAsync(values);
      toast.success("User created successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to create user"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    createUser,
    isLoading: createMutation.isPending,
    error: createMutation.error,
  };
}
