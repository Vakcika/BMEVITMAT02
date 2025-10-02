import { toast } from "sonner";
import useHttpPut from "@/api/useHttpPut";

export default function useUpdateUser() {
  const updateMutation = useHttpPut("/api/users");

  const updateUser = async (values: User) => {
    try {
      const result = await updateMutation.mutateAsync(values);
      toast.success("User updated successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to update user"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    updateUser,
    isLoading: updateMutation.isPending,
    error: updateMutation.error,
  };
}
