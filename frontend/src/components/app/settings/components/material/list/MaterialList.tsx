import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useGetMaterialsPaginated from "../hooks/useGetMaterialsPaginated";
import useDeleteMaterial from "../hooks/useDeleteMaterial";
import { MaterialTable } from "./MaterialTable";

export default function MaterialList({
  title = "Materials",
  defaultRows = 5,
  baseUrl = "/api/materials",
  queryParams = "",
}: Readonly<WrapperProps>) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(defaultRows);
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();

  const { data, meta, isLoading, isFetching, refetch } =
    useGetMaterialsPaginated(rows, page, queryParams, queryString, baseUrl);

  const { deleteMaterial } = useDeleteMaterial(baseUrl, { refetch });

  const handleView = (data: Material) => {
    navigate(`/app/settings/materials/${data.id}`);
  };

  const handleCreate = () => {
    navigate("/app/settings/materials/new");
  };

  const handleDelete = async (data: Material) => {
    await deleteMaterial(data.id || 0);
    await refetch();
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
        <MaterialTable
          value={data}
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
