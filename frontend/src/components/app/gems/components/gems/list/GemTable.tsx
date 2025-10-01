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
import { DeleteActionButton } from "@/components/tables/actions/DeleteActionButton";
import { ViewActionButton } from "@/components/tables/actions/ViewActionButton";
import {
  CustomPaginationProps,
  PaginationControls,
} from "@/components/tables/PaginationControls";
import { TableSkeleton } from "@/components/tables/TableSkeleton";

interface TableProps {
  value: Gem[];
  loading: boolean;
  title: string;
  onView: (data: Gem) => void;
  onDelete?: (data: Gem) => void;
  paginationProps?: CustomPaginationProps;
}

const pageSizeOptions = [
  { value: 5, label: "5 per page" },
  { value: 10, label: "10 per page" },
  { value: 25, label: "25 per page" },
  { value: 50, label: "50 per page" },
];

export const GemTable = ({
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
        columnCount={6}
        actionCount={onDelete ? 2 : 1}
      />
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
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
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Shape</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Booking Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {value?.map((gem) => (
              <TableRow key={gem.id}>
                <TableCell>{gem.id}</TableCell>
                <TableCell>{gem.size}</TableCell>
                <TableCell>{gem.color.name}</TableCell>
                <TableCell>{gem.shape.name}</TableCell>
                <TableCell>{gem.price}</TableCell>
                <TableCell>{gem.booking_price}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <ViewActionButton item={gem} onClick={onView} />
                    {onDelete && (
                      <DeleteActionButton
                        item={gem}
                        itemName="gem"
                        itemLabel={`Gem ${gem.id}`}
                        onDelete={onDelete}
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
