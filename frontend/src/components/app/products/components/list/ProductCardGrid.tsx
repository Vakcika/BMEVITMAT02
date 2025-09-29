import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CustomPaginationProps,
  PaginationControls,
} from "@/components/tables/PaginationControls";
import { Package } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductCardGridSkeleton } from "./skeletons/ProductCardGridSkeleton";

interface ProductCardGridProps {
  value: Product[];
  loading: boolean;
  title: string;
  onView: (data: Product) => void;
  onDelete?: (data: Product) => void;
  paginationProps?: CustomPaginationProps;
}

const pageSizeOptions = [
  { value: 12, label: "12 per page" },
  { value: 24, label: "24 per page" },
  { value: 36, label: "36 per page" },
  { value: 48, label: "48 per page" },
];

export const ProductCardGrid = ({
  value,
  loading,
  title,
  onView,
  onDelete,
  paginationProps,
}: ProductCardGridProps) => {
  if (loading) {
    return (
      <ProductCardGridSkeleton
        title={title}
        paginationProps={paginationProps}
      />
    );
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle>{title}</CardTitle>
        <div className="grid grid-cols-1 gap-4">
          {paginationProps && (
            <Select
              value={paginationProps.rows.toString()}
              onValueChange={(value) => paginationProps.setRows(Number(value))}
            >
              <SelectTrigger className="w-[140px] border-gray-200">
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
        {value?.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-sm mb-4">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {value?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={onView}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
        {paginationProps && (
          <div className="mt-8">
            <PaginationControls
              totalRecords={paginationProps?.totalRecords}
              rows={paginationProps?.rows}
              page={paginationProps?.page}
              setRows={paginationProps?.setRows}
              setPage={paginationProps?.setPage}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
