import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Transaction } from "@/types/Transaction";
import { TransactionTable } from "./TransactionTable";
import useDeleteTransaction from "../../../hooks/transaction/useDeleteTransaction";
import useGetTransactionsPaginated from "../../../hooks/transaction/useGetTransactionPaginated";

export default function TransactionListWrapper({
  title = "Transactions",
  baseUrl = "/api/transactions",
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
    useGetTransactionsPaginated(rows, page, queryParams, queryString, baseUrl);

  const deleteMutation = useDeleteTransaction(baseUrl);

  const handleView = (transaction: Transaction) => {
    navigate(`/app/transaction/${transaction.id}`);
  };

  const handleCreate = () => {
    navigate(`/app/transaction/new?${createQueryParams}`);
  };

  const handleDelete = async (transaction: Transaction) => {
    try {
      await deleteMutation.deleteTransaction(transaction.id);
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
        <TransactionTable
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
