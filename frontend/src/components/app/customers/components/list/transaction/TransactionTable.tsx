import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeleteActionButton } from "../../../../../tables/actions/DeleteActionButton";
import { ViewActionButton } from "../../../../../tables/actions/ViewActionButton";
import {
  CustomPaginationProps,
  PaginationControls,
} from "../../../../../tables/PaginationControls";
import { TableSkeleton } from "../../../../../tables/TableSkeleton";
import { Transaction } from "@/types/Transaction";
import TransactionFilters from "./TransactionFilters";

interface TableProps {
  value: Transaction[];
  loading: boolean;
  title: string;
  onView: (data: Transaction) => void;
  onDelete?: (data: Transaction) => void;
  paginationProps?: CustomPaginationProps;
}

const pageSizeOptions = [
  { value: 5, label: "5 per page" },
  { value: 10, label: "10 per page" },
  { value: 25, label: "25 per page" },
  { value: 50, label: "50 per page" },
];

const getValueColor = (value: number) => {
  if (value < 0) return "text-w300";
  if (value > 0) return "text-green-600";
  return "";
};

export const TransactionTable = ({
  value,
  loading,
  title,
  onView,
  onDelete,
  paginationProps,
}: TableProps) => {
  if (loading) {
    return (
      <TableSkeleton
        rowCount={paginationProps?.rows ?? 5}
        columnCount={8}
        actionCount={onDelete ? 2 : 1}
      />
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 justify-items-end gap-4">
          <TransactionFilters />
          {paginationProps && (
            <Select
              value={paginationProps.rows.toString()}
              onValueChange={(value) => paginationProps.setRows(Number(value))}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col min-h-84">
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {value?.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id.substring(0, 8)}</TableCell>
                  <TableCell>{transaction.note}</TableCell>
                  <TableCell
                    className={`text-center ${getValueColor(
                      transaction.amount
                    )}`}
                  >
                    {transaction.amount} Ft
                  </TableCell>
                  <TableCell
                    className={`text-center ${getValueColor(
                      transaction.balance
                    )}`}
                  >
                    {transaction.balance} Ft
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <ViewActionButton item={transaction} onClick={onView} />
                      {onDelete && (
                        <DeleteActionButton
                          item={transaction}
                          itemName="transaction"
                          itemLabel={`Transaction #${transaction.id.substring(
                            0,
                            8
                          )}`}
                          onDelete={onDelete}
                        />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {paginationProps && (
          <PaginationControls
            totalRecords={paginationProps?.totalRecords}
            rows={paginationProps?.rows}
            page={paginationProps?.page}
            setRows={paginationProps?.setRows}
            setPage={paginationProps?.setPage}
          />
        )}
      </CardContent>
    </Card>
  );
};
