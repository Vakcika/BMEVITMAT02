import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useDeleteGem from "../hooks/useDeleteGem";
import useGetGemsPaginated from "../hooks/useGetGemsPaginated";
import { GemTable } from "./GemTable";
export default function GemListWrapper({
  title = "Gems",
  defaultRows = 25,
  baseUrl = "/api/gems",
  queryParams = "",
}: Readonly<WrapperProps>) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(defaultRows);

  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const { gems, meta, isLoading, isFetching, refetch } = useGetGemsPaginated(
    rows,
    page,
    queryParams,
    queryString,
    baseUrl
  );

  const { deleteGem } = useDeleteGem(baseUrl, { refetch });

  const handleView = (gem: Gem) => {
    navigate(`/app/gems/${gem.id}`);
  };

  const handleCreate = () => {
    navigate("/app/gems/new");
  };

  const handleDelete = async (gem: Gem) => {
    try {
      await deleteGem(gem.id);
      toast.success("Gem deleted successfully");
      await refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete gem"
      );
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-6 mb-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <Button className="bg-p300 text-n0" onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add new
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <GemTable
          value={gems}
          loading={isLoading || isFetching}
          title={title}
          onView={handleView}
          onDelete={handleDelete}
          paginationProps={{
            totalRecords: meta?.total ?? 0,
            rows,
            page,
            setRows,
            setPage,
          }}
        />
      </div>
    </div>
  );
}
