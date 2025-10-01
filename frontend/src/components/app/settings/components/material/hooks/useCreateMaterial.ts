import { toast } from "sonner";
import useHttpPost from "@/api/useHttpPost";

export default function useCreateMaterial() {
  const createMutation = useHttpPost("/api/materials");

  const createMaterial = async (values: Material) => {
    try {
      const result = await createMutation.mutateAsync(values);
      toast.success("Material created successfully");
      return result;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to create material"
      );
      console.error(error);
      throw error;
    }
  };

  return {
    createMaterial,
    isLoading: createMutation.isPending,
    error: createMutation.error,
  };
}
