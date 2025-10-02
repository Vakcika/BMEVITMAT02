import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useGetUsersPaginated from "../hooks/useGetUsersPaginated";
import useDeleteUser from "../hooks/useDeleteUser";
import { UserTable } from "./UserTable";

export default function UserList({
  title = "Users",
  defaultRows = 5,
  baseUrl = "/api/users",
  queryParams = "",
}: Readonly<WrapperProps>) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(defaultRows);
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();

  const { data, meta, isLoading, isFetching, refetch } = useGetUsersPaginated(
    rows,
    page,
    queryParams,
    queryString,
    baseUrl
  );

  const { deleteUser } = useDeleteUser(baseUrl, { refetch });

  const handleView = (data: User) => {
    navigate(`/app/settings/users/${data.id}`);
  };

  const handleCreate = () => {
    navigate("/app/settings/users/new");
  };

  const handleDelete = async (data: User) => {
    await deleteUser(data.id);
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
        <UserTable
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
