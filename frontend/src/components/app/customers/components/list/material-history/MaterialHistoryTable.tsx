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
import { MaterialHistory } from "@/types/Material";
import MaterialHistoryBalanceBadge from "@/components/common/badges/MaterialHistoryBalanceBadge";
import DateFilter from "../DateFilter";

interface TableProps {
  value: MaterialHistory[];
  loading: boolean;
  title: string;
  onView: (data: MaterialHistory) => void;
  onDelete?: (data: MaterialHistory) => void;
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

export const MaterialHistoryTable = ({
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
        <div className="flex flex-col items-end sm:flex-row gap-4 sm:items-center sm:justify-between">
          <DateFilter />
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
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {value?.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.id.substring(0, 8)}</TableCell>
                  <TableCell>{data.notes}</TableCell>
                  <TableCell>{data.material.type}</TableCell>
                  <TableCell
                    className={`text-center ${getValueColor(data.amount)}`}
                  >
                    {data.amount} g
                  </TableCell>
                  <TableCell className="text-center space-y-1">
                    <MaterialHistoryBalanceBadge balances={data.balances} />
                  </TableCell>

                  <TableCell>
                    {new Date(data.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <ViewActionButton item={data} onClick={onView} />
                      {onDelete && (
                        <DeleteActionButton
                          item={data}
                          itemName="data"
                          itemLabel={`Material #${data.id.substring(0, 8)} ${
                            data.notes
                          } (${data.amount} g)`}
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
