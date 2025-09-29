import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomerTable } from "./CustomerTable";
import useGetCustomersPaginated from "../../hooks/useGetCustomerPaginated";
import useDeleteCustomer from "../../hooks/useDeleteCustomer";

export default function CustomerListWrapper({
  title = "Customers",
  defaultRows = 25,
  baseUrl = "/api/customers",
  queryParams = "",
}: Readonly<WrapperProps>) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(defaultRows);

  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const { customers, meta, isLoading, isFetching, refetch } =
    useGetCustomersPaginated(rows, page, queryParams, queryString, baseUrl);

  const { deleteCustomer } = useDeleteCustomer(baseUrl, { refetch });

  const handleView = (customer: Customer) => {
    navigate(`/app/customer/${customer.id}`);
  };

  const handleCreate = () => {
    navigate("/app/customer/new");
  };

  const handleDelete = async (customer: Customer) => {
    try {
      await deleteCustomer(customer.id);
      toast.success("Customer deleted successfully");
      await refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete customer"
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
          Add new customer
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <CustomerTable
          value={customers}
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
