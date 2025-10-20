import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MaterialHistoryTable } from "./MaterialHistoryTable";
import { MaterialHistory } from "@/types/Material";
import useDeleteMaterialHistory from "../../../hooks/material-history/useDeleteMaterialHistory";
import useGetMaterialHistorysPaginated from "../../../hooks/material-history/useGetMaterialHistoryPaginated";

export default function MaterialHistoryListWrapper({
  title = "Material history",
  baseUrl = "/api/material-history",
  defaultRows = 25,
  queryParams = "",
  createQueryParams = "",
}: Readonly<WrapperProps>) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(defaultRows);
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();

  const { data, meta, isLoading, isFetching, refetch } =
    useGetMaterialHistorysPaginated(
      rows,
      page,
      queryParams,
      queryString,
      baseUrl
    );

  const deleteMutation = useDeleteMaterialHistory(baseUrl);

  const handleView = (transaction: MaterialHistory) => {
    navigate(`/app/material-history/${transaction.id}`);
  };

  const handleCreate = () => {
    navigate(`/app/material-history/new?${createQueryParams}`);
  };

  const handleDelete = async (transaction: MaterialHistory) => {
    try {
      await deleteMutation.deleteMaterialHistory(transaction.id);
      await refetch();
    } catch (error) {
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
      <div>
        <MaterialHistoryTable
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
