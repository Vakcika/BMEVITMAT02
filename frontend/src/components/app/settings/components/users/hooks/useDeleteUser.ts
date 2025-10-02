import { toast } from "sonner";
import useHttpDelete from "@/api/useHttpDelete";

export default function useDeleteUser(
  baseUrl: string = "/api/users",
  queryToInvalidate?: any
) {
  const deleteMutation = useHttpDelete(baseUrl, queryToInvalidate);

  const deleteUser = async (id: number) => {
    try {
      const result = await deleteMutation.mutateAsync(id);
      toast.success("User deleted successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete user"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    deleteUser,
    isDeleting: deleteMutation.isPending,
    error: deleteMutation.error,
  };
}
