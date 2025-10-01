import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useGetGemShapesPaginated from "../hooks/useGetGemShapesPaginated";
import { GemShapeTable } from "./GemShapeTable";
import useDeleteGemShape from "../hooks/useDeleteGemShape";

export default function GemShapeList({
  title = "Gem Shapes",
  defaultRows = 25,
  baseUrl = "/api/gem-shapes",
  queryParams = "",
}: Readonly<WrapperProps>) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(defaultRows);

  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();

  const { gemShapes, meta, isLoading, isFetching, refetch } =
    useGetGemShapesPaginated(rows, page, queryParams, queryString, baseUrl);

  const { deleteGemShape } = useDeleteGemShape(baseUrl, { refetch });

  const handleView = (shape: GemShape) => {
    navigate(`/app/gems/gem-shape/${shape.id}`);
  };

  const handleCreate = () => {
    navigate("/app/gems/gem-shape/new");
  };

  const handleDelete = async (shape: GemShape) => {
    try {
      await deleteGemShape(shape.id);
      toast.success("Gem shape deleted successfully");
      await refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete gem shape"
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
        <GemShapeTable
          value={gemShapes}
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
