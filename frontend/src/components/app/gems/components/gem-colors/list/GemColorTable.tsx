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
  value: GemColor[];
  loading: boolean;
  title: string;
  onView: (data: GemColor) => void;
  onDelete?: (data: GemColor) => void;
  paginationProps?: CustomPaginationProps;
}

const pageSizeOptions = [
  { value: 5, label: "5 per page" },
  { value: 10, label: "10 per page" },
  { value: 25, label: "25 per page" },
  { value: 50, label: "50 per page" },
];

export const GemColorTable = ({
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
        columnCount={3}
        actionCount={onDelete ? 2 : 1}
      />
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <div className="grid grid-cols-1 gap-4">
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
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {value?.map((color) => (
              <TableRow key={color.id}>
                <TableCell>{color.id}</TableCell>
                <TableCell className="font-medium">{color.name}</TableCell>
                <TableCell>
                  {new Date(color.updated_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <ViewActionButton item={color} onClick={onView} />
                    {onDelete && (
                      <DeleteActionButton
                        item={color}
                        itemName="gem color"
                        itemLabel={color.name}
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
