import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useGetGemColorsPaginated from "../hooks/useGetGemColorsPaginated";
import { GemColorTable } from "./GemColorTable";
import useDeleteGemColor from "../hooks/useDeleteGemColor";

export default function GemColorList({
  title = "Gem Colors",
  defaultRows = 25,
  baseUrl = "/api/gem-colors",
  queryParams = "",
}: Readonly<WrapperProps>) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(defaultRows);
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();

  const { gemColors, meta, isLoading, isFetching, refetch } =
    useGetGemColorsPaginated(rows, page, queryParams, queryString, baseUrl);

  const { deleteGemColor } = useDeleteGemColor(baseUrl, { refetch });

  const handleView = (gemColor: GemColor) => {
    navigate(`/app/gems/gem-color/${gemColor.id}`);
  };

  const handleCreate = () => {
    navigate("/app/gems/gem-color/new");
  };

  const handleDelete = async (gemColor: GemColor) => {
    try {
      await deleteGemColor(gemColor.id);
      toast.success("Gem color deleted successfully");
      await refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete gem color"
      );
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-6 mb-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <Button className="bg-p300 text-n0" onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" /> Add new
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <GemColorTable
          value={gemColors}
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
